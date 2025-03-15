
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
              <CSVImport />
            </TabsContent>
            
            <TabsContent value="sheets">
              <GoogleSheetsImport />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {metrics && (
        <AmazonMetricsDisplay metrics={metrics} />
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
