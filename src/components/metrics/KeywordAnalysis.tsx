
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "./MetricsTable";
import { KeywordHeatmap, KeywordData } from "./KeywordHeatmap";

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
  // Group and aggregate data by keyword
  const keywordMetrics = data.reduce((acc: KeywordAnalysisData[], curr) => {
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
  
  // Transform data for the heatmap
  const heatmapData: KeywordData[] = sortedKeywords.map(kw => ({
    keyword: kw.keyword,
    impressions: kw.impressions,
    clicks: kw.clicks,
    score: kw.spend // Using spend as the score for heatmap intensity
  }));

  return (
    <div className="space-y-6">
      <KeywordHeatmap data={heatmapData} />
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
            metrics={[]} // Pass an empty array instead of empty object
          />
        </CardContent>
      </Card>
    </div>
  );
}
