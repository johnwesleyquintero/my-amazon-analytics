
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface ASINData {
  asin: string;
  title: string;
  category: string;
  spend: number;
  sales: number;
  conversionRate: number;
  orders: number;
}

interface ASINAnalysisProps {
  asinMetrics: Array<ASINData>;
}

export function ASINAnalysis({ asinMetrics }: ASINAnalysisProps) {
  if (!asinMetrics || asinMetrics.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>ASIN Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No ASIN data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>ASIN Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["ASIN", "Title", "Category", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={asinMetrics.map(asin => ({
            asin: asin.asin || 'N/A',
            title: asin.title || 'N/A',
            category: asin.category || 'N/A',
            spend: `$${asin.spend ? asin.spend.toLocaleString() : '0'}`,
            sales: `$${asin.sales ? asin.sales.toLocaleString() : '0'}`,
            convRate: `${asin.conversionRate ? asin.conversionRate.toFixed(2) : '0'}%`,
            orders: asin.orders ? asin.orders.toString() : '0'
          }))}
          metrics={[]} // Pass an empty array instead of empty object
        />
      </CardContent>
    </Card>
  );
}
