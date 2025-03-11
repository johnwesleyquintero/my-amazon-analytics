import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface ASINAnalysisProps {
  asinMetrics: Array<{
    asin: string;
    title: string;
    category: string;
    spend: number;
    sales: number;
    conversionRate: number;
    orders: number;
  }>;
}

export function ASINAnalysis({ asinMetrics }: ASINAnalysisProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>ASIN Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["ASIN", "Title", "Category", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={asinMetrics.map(asin => ({
            asin: asin.asin,
            title: asin.title,
            category: asin.category,
            spend: `$${asin.spend.toLocaleString()}`,
            sales: `$${asin.sales.toLocaleString()}`,
            convRate: `${asin.conversionRate.toFixed(2)}%`,
            orders: asin.orders
          }))}
        />
      </CardContent>
    </Card>
  );
}