import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface WeeklyAnalysisProps {
  weeklyMetrics: Array<{
    period: string;
    spend: number;
    sales: number;
    roas: number;
    acos: number;
    ctr: number;
    orders: number;
  }>;
}

export function WeeklyAnalysis({ weeklyMetrics }: WeeklyAnalysisProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["Week", "Spend", "Sales", "ROAS", "ACoS", "CTR", "Orders"]}
          rows={weeklyMetrics.map(week => ({
            period: week.period,
            spend: `$${week.spend.toLocaleString()}`,
            sales: `$${week.sales.toLocaleString()}`,
            roas: `${week.roas.toFixed(2)}x`,
            acos: `${week.acos.toFixed(2)}%`,
            ctr: `${week.ctr.toFixed(2)}%`,
            orders: week.orders
          }))}
        />
      </CardContent>
    </Card>
  );
}