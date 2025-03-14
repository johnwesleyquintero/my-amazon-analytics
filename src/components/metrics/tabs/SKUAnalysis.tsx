
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
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>SKU Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["SKU", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={skuMetrics.map(sku => ({
            sku: sku.sku,
            impressions: sku.impressions.toLocaleString(),
            clicks: sku.clicks.toLocaleString(),
            spend: `$${sku.spend.toLocaleString()}`,
            sales: `$${sku.sales.toLocaleString()}`,
            convRate: `${sku.conversionRate.toFixed(2)}%`,
            orders: sku.orders.toString()
          }))}
          metrics={[]} // Pass an empty array instead of empty object
        />
      </CardContent>
    </Card>
  );
}
