import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface KeywordMetrics {
  keyword: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  conversion_rate: number;
}

export function KeywordHeatmap() {
  const { data: keywordData, isLoading } = useQuery({
    queryKey: ['keyword-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('amazon_ads_metrics')
        .select('keyword, impressions, clicks, amount_spent, total_ad_sales')
        .not('keyword', 'is', null)
        .order('impressions', { ascending: false })
        .limit(20);

      if (error) throw error;

      return data.map(item => ({
        keyword: item.keyword || '',
        impressions: item.impressions || 0,
        clicks: item.clicks || 0,
        spend: item.amount_spent || 0,
        sales: item.total_ad_sales || 0,
        conversion_rate: item.clicks > 0 ? (item.total_ad_sales / item.clicks) * 100 : 0
      }));
    }
  });

  const getHeatmapColor = (value: number, metric: keyof KeywordMetrics) => {
    const metrics = {
      impressions: { min: 0, max: 10000 },
      clicks: { min: 0, max: 1000 },
      spend: { min: 0, max: 5000 },
      sales: { min: 0, max: 10000 },
      conversion_rate: { min: 0, max: 20 }
    };

    const range = metrics[metric as keyof typeof metrics];
    const normalized = Math.min(Math.max((value - range.min) / (range.max - range.min), 0), 1);
    const hue = 120 * normalized; // Green (120) to Red (0)
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (isLoading) {
    return (
      <Card className="bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Keyword Performance Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Keyword Performance Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Keyword</th>
                <th className="p-2">Impressions</th>
                <th className="p-2">Clicks</th>
                <th className="p-2">Spend</th>
                <th className="p-2">Sales</th>
                <th className="p-2">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {keywordData?.map((row, index) => (
                <tr key={index}>
                  <td className="p-2">{row.keyword}</td>
                  <td className="p-2">
                    <div
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: getHeatmapColor(row.impressions, 'impressions') }}
                    >
                      {row.impressions.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: getHeatmapColor(row.clicks, 'clicks') }}
                    >
                      {row.clicks.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: getHeatmapColor(row.spend, 'spend') }}
                    >
                      ${row.spend.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: getHeatmapColor(row.sales, 'sales') }}
                    >
                      ${row.sales.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: getHeatmapColor(row.conversion_rate, 'conversion_rate') }}
                    >
                      {row.conversion_rate.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
