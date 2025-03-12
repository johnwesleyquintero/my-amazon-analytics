import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface MonthlyAnalysisProps {
  monthlyMetrics: Array<{
    period: string;
    spend: number;
    sales: number;
    roas: number;
    acos: number;
    ctr: number;
    orders: number;
  }>;
}

export function MonthlyAnalysis({ monthlyMetrics }: MonthlyAnalysisProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Monthly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["Month", "Spend", "Sales", "ROAS", "ACoS", "CTR", "Orders"]}
          rows={monthlyMetrics.map(month => ({
            period: month.period,
            spend: `$${month.spend.toLocaleString()}`,
            sales: `$${month.sales.toLocaleString()}`,
            roas: `${month.roas.toFixed(2)}x`,
            acos: `${month.acos.toFixed(2)}%`,
            ctr: `${month.ctr.toFixed(2)}%`,
            orders: month.orders
          }))}
        />
      </CardContent>
    </Card>
  );
}