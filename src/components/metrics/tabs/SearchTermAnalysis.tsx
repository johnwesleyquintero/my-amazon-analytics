
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "../MetricsTable";

interface SearchTermData {
  searchTerm: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  conversionRate: number;
  orders?: number;
}

interface SearchTermAnalysisProps {
  searchTermMetrics: Array<SearchTermData>;
}

export function SearchTermAnalysis({ searchTermMetrics }: SearchTermAnalysisProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Search Term Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["Search Term", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={searchTermMetrics.map(term => ({
            term: term.searchTerm,
            impressions: term.impressions.toLocaleString(),
            clicks: term.clicks.toLocaleString(),
            spend: `$${term.spend.toLocaleString()}`,
            sales: `$${term.sales.toLocaleString()}`,
            convRate: `${term.conversionRate.toFixed(2)}%`,
            orders: term.orders?.toString() || "0"
          }))}
          metrics={[]} // Pass an empty array instead of empty object
        />
      </CardContent>
    </Card>
  );
}
