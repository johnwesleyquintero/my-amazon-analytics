import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileSpreadsheet, Table } from "lucide-react";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { AmazonMetricsDisplay } from "./AmazonMetricsDisplay";
import { supabase } from "@/integrations/supabase/client";

export function DataImport() {
  const [importedData, setImportedData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const processAndUploadData = async (data: any[]) => {
    try {
      setIsUploading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to upload data");
      }
      
      // Transform data to match database schema
      const transformedData = data.map(row => ({
        date: row.Date,
        impressions: parseInt(row.Impressions) || 0,
        clicks: parseInt(row.Clicks) || 0,
        amount_spent: parseFloat(row.Spend?.replace('$', '').replace(',', '')) || 0,
        total_ad_sales: parseFloat(row["Total Sales"]?.replace('$', '').replace(',', '')) || 0,
        total_ad_orders: parseInt(row.Orders) || 0,
        campaign_name: row["Campaign Name"],
        ad_group_name: row["Ad Group Name"],
        advertised_asin: row["Advertised ASIN"],
        advertised_sku: row["Advertised SKU"],
        keyword: row.Keyword,
        search_term: row["Search Term"],
        account_id: user.id
      }));

      // Upload to Supabase
      const { error } = await supabase
        .from('amazon_ads_metrics')
        .insert(transformedData);

      if (error) throw error;

      // Update local state
      setImportedData(transformedData);
      const calculatedMetrics = calculateMetrics(transformedData);
      setMetrics(calculatedMetrics);
      
      toast({
        title: "Data imported successfully",
        description: `${transformedData.length} rows processed and uploaded`,
      });
    } catch (error: any) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          processAndUploadData(results.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleGoogleSheetImport = (url: string) => {
    const sheetId = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!sheetId) {
      toast({
        title: "Invalid Google Sheets URL",
        description: "Please enter a valid Google Sheets URL",
        variant: "destructive",
      });
      return;
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    fetch(csvUrl)
      .then(response => response.text())
      .then(data => {
        const results = Papa.parse(data, { header: true });
        processAndUploadData(results.data);
      })
      .catch(error => {
        toast({
          title: "Import failed",
          description: "Make sure the Google Sheet is publicly accessible",
          variant: "destructive",
        });
        console.error("Import error:", error);
      });
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Import Amazon Ads Data</CardTitle>
          <CardDescription className="text-gray-400">
            Import your advertising data from various sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="csv">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="csv-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-spotify-darker/50 relative"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <FileSpreadsheet className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">CSV files only</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCSVUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sheets">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Paste Google Sheets URL"
                    className="flex-1 bg-spotify-darker border-gray-700"
                    onChange={(e) => {
                      const url = e.target.value;
                      if (url) handleGoogleSheetImport(url);
                    }}
                    disabled={isUploading}
                  />
                  <Button variant="secondary" disabled={isUploading}>
                    <Table className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Make sure your Google Sheet is publicly accessible (View access)
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {metrics && (
        <AmazonMetricsDisplay metrics={metrics} />
      )}

      {importedData.length > 0 && (
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>Raw Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {Object.keys(importedData[0]).map((header) => (
                      <th key={header} className="px-4 py-2 text-left border-b border-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importedData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((cell: any, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 border-b border-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {importedData.length > 5 && (
              <p className="text-sm text-gray-400 mt-2">
                Showing first 5 rows of {importedData.length} total rows
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}