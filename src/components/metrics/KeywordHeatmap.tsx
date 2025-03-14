
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface KeywordData {
  keyword: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  conversion_rate: number;
}

interface KeywordHeatmapProps {
  campaignId?: string;
}

// Define color range configuration
type MetricKey = "impressions" | "clicks" | "spend" | "sales" | "conversion_rate";

interface MetricRange {
  min: number;
  max: number;
}

// Define ranges separately without circular references
const metricRanges: Record<MetricKey, MetricRange> = {
  impressions: { min: 0, max: 10000 },
  clicks: { min: 0, max: 1000 },
  spend: { min: 0, max: 5000 },
  sales: { min: 0, max: 10000 },
  conversion_rate: { min: 0, max: 20 }
};

export function KeywordHeatmap({ campaignId }: KeywordHeatmapProps) {
  const { data: keywordData, isLoading, error } = useQuery({
    queryKey: ['amazon_ads_metrics', campaignId],
    queryFn: async () => {
      const query = supabase
        .from('amazon_ads_metrics')
        .select('*');
      
      if (campaignId) {
        query.eq('campaign_id', campaignId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to match KeywordData interface
      const transformedData: KeywordData[] = (data || []).map((item: any) => ({
        keyword: item.keyword || 'Unknown',
        impressions: item.impressions || 0,
        clicks: item.clicks || 0,
        spend: item.amount_spent || 0,
        sales: item.total_ad_sales || 0,
        conversion_rate: item.clicks > 0 ? ((item.total_ad_orders || 0) / item.clicks) * 100 : 0
      }));
      
      return transformedData;
    },
    enabled: !!supabase,
  });

  // Safe function to get heatmap color
  const getHeatmapColor = (value: number, metricType: string): string => {
    // Check if the metric type exists in our ranges
    if (!(metricType in metricRanges)) {
      console.warn(`Unknown metric type: ${metricType}`);
      return 'hsl(0, 0%, 80%)'; // Default gray
    }

    const range = metricRanges[metricType as MetricKey];
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

  if (error) {
    console.error("Error loading keyword data:", error);
    return (
      <Card className="bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Keyword Performance Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center">
            <p>Error loading keyword data. Please try again later.</p>
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
              {keywordData && keywordData.length > 0 ? (
                keywordData.map((row, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center">No keyword data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
