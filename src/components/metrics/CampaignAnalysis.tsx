import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "./MetricsTable";
import { LineChart } from "recharts";

interface CampaignAnalysisProps {
  data: Array<{
    campaign_name: string;
    impressions: number;
    clicks: number;
    spend: number;
    sales: number;
    orders: number;
    roas: number;
    acos: number;
  }>;
}

export function CampaignAnalysis({ data }: CampaignAnalysisProps) {
  // Group and aggregate data by campaign
  const campaignMetrics = data.reduce((acc: any[], curr) => {
    const existingCampaign = acc.find(c => c.campaign_name === curr.campaign_name);
    
    if (existingCampaign) {
      existingCampaign.impressions += curr.impressions;
      existingCampaign.clicks += curr.clicks;
      existingCampaign.spend += curr.spend;
      existingCampaign.sales += curr.sales;
      existingCampaign.orders += curr.orders;
    } else {
      acc.push({
        campaign_name: curr.campaign_name,
        impressions: curr.impressions,
        clicks: curr.clicks,
        spend: curr.spend,
        sales: curr.sales,
        orders: curr.orders,
        roas: curr.sales / curr.spend,
        acos: (curr.spend / curr.sales) * 100
      });
    }
    
    return acc;
  }, []);

  // Sort campaigns by spend
  const sortedCampaigns = campaignMetrics.sort((a, b) => b.spend - a.spend);

  return (
    <div className="space-y-6">
      <Card className="bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsTable 
            headers={[
              "Campaign",
              "Impressions",
              "Clicks",
              "Spend",
              "Sales",
              "Orders",
              "ROAS",
              "ACoS"
            ]}
            rows={sortedCampaigns.map(campaign => ({
              campaign: campaign.campaign_name,
              impressions: campaign.impressions.toLocaleString(),
              clicks: campaign.clicks.toLocaleString(),
              spend: `$${campaign.spend.toLocaleString()}`,
              sales: `$${campaign.sales.toLocaleString()}`,
              orders: campaign.orders.toLocaleString(),
              roas: `${campaign.roas.toFixed(2)}x`,
              acos: `${campaign.acos.toFixed(2)}%`
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}