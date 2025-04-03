
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
  if (!searchTermMetrics || searchTermMetrics.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Search Term Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No search term data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Search Term Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MetricsTable 
          headers={["Search Term", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
          rows={searchTermMetrics.map(term => ({
            term: term.searchTerm || 'N/A',
            impressions: term.impressions ? term.impressions.toLocaleString() : '0',
            clicks: term.clicks ? term.clicks.toLocaleString() : '0',
            spend: `$${term.spend ? term.spend.toLocaleString() : '0'}`,
            sales: `$${term.sales ? term.sales.toLocaleString() : '0'}`,
            convRate: `${term.conversionRate ? term.conversionRate.toFixed(2) : '0'}%`,
            orders: term.orders ? term.orders.toString() : "0"
          }))}
          metrics={[]} // Pass an empty array instead of empty object
        />
      </CardContent>
    </Card>
  );
}
