
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImportProvider, useImport } from "@/contexts/ImportContext";
import { CSVImport } from "./import/CSVImport";
import { GoogleSheetsImport } from "./import/GoogleSheetsImport";
import { DataPreview } from "./import/DataPreview";
import { AmazonMetricsDisplay } from "./AmazonMetricsDisplay";

function DataImportContent() {
  const { metrics, importedData } = useImport();

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Import Amazon Ads Data</CardTitle>
          <CardDescription>
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
              <CSVImport />
            </TabsContent>
            
            <TabsContent value="sheets">
              <GoogleSheetsImport />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium">Impressions</h3>
                <p className="text-2xl font-bold">{metrics.impressions?.toLocaleString() || 0}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Clicks</h3>
                <p className="text-2xl font-bold">{metrics.clicks?.toLocaleString() || 0}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Spend</h3>
                <p className="text-2xl font-bold">${metrics.spend?.toFixed(2) || 0}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">CTR</h3>
                <p className="text-2xl font-bold">{metrics.ctr?.toFixed(2) || 0}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Orders</h3>
                <p className="text-2xl font-bold">{metrics.totalOrders?.toLocaleString() || 0}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Sales</h3>
                <p className="text-2xl font-bold">${metrics.totalSales?.toFixed(2) || 0}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Conversion Rate</h3>
                <p className="text-2xl font-bold">{metrics.conversionRate?.toFixed(2) || 0}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">ROAS</h3>
                <p className="text-2xl font-bold">{metrics.roas?.toFixed(2) || 0}x</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {importedData.length > 0 && (
        <DataPreview />
      )}
    </div>
  );
}

export function DataImport() {
  return (
    <ImportProvider>
      <DataImportContent />
    </ImportProvider>
  );
}
