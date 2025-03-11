import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "./MetricsTable";
import { KeywordHeatmap } from "./KeywordHeatmap";

interface KeywordAnalysisProps {
  data: Array<{
    keyword: string;
    impressions: number;
    clicks: number;
    spend: number;
    sales: number;
    orders: number;
    conversion_rate: number;
  }>;
}

export function KeywordAnalysis({ data }: KeywordAnalysisProps) {
  // Group and aggregate data by keyword
  const keywordMetrics = data.reduce((acc: any[], curr) => {
    const existingKeyword = acc.find(k => k.keyword === curr.keyword);
    
    if (existingKeyword) {
      existingKeyword.impressions += curr.impressions;
      existingKeyword.clicks += curr.clicks;
      existingKeyword.spend += curr.spend;
      existingKeyword.sales += curr.sales;
      existingKeyword.orders += curr.orders;
    } else {
      acc.push({
        keyword: curr.keyword,
        impressions: curr.impressions,
        clicks: curr.clicks,
        spend: curr.spend,
        sales: curr.sales,
        orders: curr.orders,
        conversion_rate: (curr.orders / curr.clicks) * 100
      });
    }
    
    return acc;
  }, []);

  // Sort keywords by spend
  const sortedKeywords = keywordMetrics.sort((a, b) => b.spend - a.spend);

  return (
    <div className="space-y-6">
      <KeywordHeatmap />
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
              keyword: keyword.keyword,
              impressions: keyword.impressions.toLocaleString(),
              clicks: keyword.clicks.toLocaleString(),
              spend: `$${keyword.spend.toLocaleString()}`,
              sales: `$${keyword.sales.toLocaleString()}`,
              orders: keyword.orders.toLocaleString(),
              convRate: `${keyword.conversion_rate.toFixed(2)}%`
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}