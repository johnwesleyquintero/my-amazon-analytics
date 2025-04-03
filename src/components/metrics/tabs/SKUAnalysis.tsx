
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface SKUData {
  sku: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  conversionRate: number;
  orders: number;
}

interface SKUAnalysisProps {
  skuMetrics: Array<SKUData>;
}

export function SKUAnalysis({ skuMetrics }: SKUAnalysisProps) {
  if (!skuMetrics || skuMetrics.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>SKU Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No SKU data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>SKU Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["SKU", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={skuMetrics.map(sku => ({
            sku: sku.sku || 'N/A',
            impressions: sku.impressions ? sku.impressions.toLocaleString() : '0',
            clicks: sku.clicks ? sku.clicks.toLocaleString() : '0',
            spend: `$${sku.spend ? sku.spend.toLocaleString() : '0'}`,
            sales: `$${sku.sales ? sku.sales.toLocaleString() : '0'}`,
            convRate: `${sku.conversionRate ? sku.conversionRate.toFixed(2) : '0'}%`,
            orders: sku.orders ? sku.orders.toString() : '0'
          }))}
          metrics={[]} // Pass an empty array instead of empty object
        />
      </CardContent>
    </Card>
  );
}
