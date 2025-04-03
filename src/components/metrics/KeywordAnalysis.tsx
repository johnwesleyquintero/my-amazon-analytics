
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "./MetricsTable";

interface KeywordAnalysisData {
  keyword: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  orders: number;
  conversion_rate: number;
}

interface KeywordAnalysisProps {
  data: Array<KeywordAnalysisData>;
}

export function KeywordAnalysis({ data }: KeywordAnalysisProps) {
  // Ensure we have an array
  const safeData = Array.isArray(data) ? data : [];
  
  if (safeData.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No keyword data available.</p>
        </CardContent>
      </Card>
    );
  }

  // Group and aggregate data by keyword with safety checks
  const keywordMetrics = safeData.reduce((acc: KeywordAnalysisData[], curr) => {
    if (!curr.keyword) return acc;
    
    const existingKeyword = acc.find(k => k.keyword === curr.keyword);
    
    if (existingKeyword) {
      existingKeyword.impressions += curr.impressions || 0;
      existingKeyword.clicks += curr.clicks || 0;
      existingKeyword.spend += curr.spend || 0;
      existingKeyword.sales += curr.sales || 0;
      existingKeyword.orders += curr.orders || 0;
    } else {
      acc.push({
        keyword: curr.keyword || 'Unknown',
        impressions: curr.impressions || 0,
        clicks: curr.clicks || 0,
        spend: curr.spend || 0,
        sales: curr.sales || 0,
        orders: curr.orders || 0,
        conversion_rate: curr.clicks > 0 ? ((curr.orders || 0) / curr.clicks) * 100 : 0
      });
    }
    
    return acc;
  }, []);

  // Sort keywords by spend
  const sortedKeywords = keywordMetrics.sort((a, b) => (b.spend || 0) - (a.spend || 0));

  return (
    <div className="space-y-6">
      <Card className="bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsTable 
            headers={[
              "Keyword",
              "Impressions",
              "Clicks",
              "Spend",
              "Sales",
              "Orders",
              "Conv. Rate"
            ]}
            rows={sortedKeywords.map(keyword => ({
              keyword: keyword.keyword || 'Unknown',
              impressions: (keyword.impressions || 0).toLocaleString(),
              clicks: (keyword.clicks || 0).toLocaleString(),
              spend: `$${(keyword.spend || 0).toLocaleString()}`,
              sales: `$${(keyword.sales || 0).toLocaleString()}`,
              orders: (keyword.orders || 0).toLocaleString(),
              convRate: `${(keyword.conversion_rate || 0).toFixed(2)}%`
            }))}
            metrics={[]} // Pass an empty array instead of empty object
          />
        </CardContent>
      </Card>
    </div>
  );
}
