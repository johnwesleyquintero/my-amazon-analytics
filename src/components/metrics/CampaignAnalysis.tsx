
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsTable } from "./MetricsTable";

interface CampaignData {
  campaign_name: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  orders: number;
  roas: number;
  acos: number;
}

interface CampaignAnalysisProps {
  data: Array<CampaignData>;
}

export function CampaignAnalysis({ data }: CampaignAnalysisProps) {
  // Ensure we have an array
  const safeData = Array.isArray(data) ? data : [];
  
  if (safeData.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No campaign data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Group and aggregate data by campaign with safety checks
  const campaignMetrics = safeData.reduce((acc: any[], curr) => {
    if (!curr.campaign_name) {
      // Try to get campaign name from ASIN if available
      const campaignName = curr.asin || curr.advertised_asin || 'Unknown Campaign';
      
      const existingCampaign = acc.find(c => c.campaign_name === campaignName);
      
      if (existingCampaign) {
        existingCampaign.impressions += curr.impressions || 0;
        existingCampaign.clicks += curr.clicks || 0;
        existingCampaign.spend += curr.spend || 0;
        existingCampaign.sales += curr.sales || 0;
        existingCampaign.orders += curr.orders || 0;
      } else {
        const sales = curr.sales || 0;
        const spend = curr.spend || 0;
        acc.push({
          campaign_name: campaignName,
          impressions: curr.impressions || 0,
          clicks: curr.clicks || 0,
          spend: spend,
          sales: sales,
          orders: curr.orders || 0,
          roas: spend > 0 ? sales / spend : 0,
          acos: sales > 0 ? (spend / sales) * 100 : 0
        });
      }
    } else {
      const existingCampaign = acc.find(c => c.campaign_name === curr.campaign_name);
      
      if (existingCampaign) {
        existingCampaign.impressions += curr.impressions || 0;
        existingCampaign.clicks += curr.clicks || 0;
        existingCampaign.spend += curr.spend || 0;
        existingCampaign.sales += curr.sales || 0;
        existingCampaign.orders += curr.orders || 0;
      } else {
        const sales = curr.sales || 0;
        const spend = curr.spend || 0;
        acc.push({
          campaign_name: curr.campaign_name,
          impressions: curr.impressions || 0,
          clicks: curr.clicks || 0,
          spend: spend,
          sales: sales,
          orders: curr.orders || 0,
          roas: spend > 0 ? sales / spend : 0,
          acos: sales > 0 ? (spend / sales) * 100 : 0
        });
      }
    }
    
    return acc;
  }, []);

  // Sort campaigns by spend
  const sortedCampaigns = campaignMetrics.sort((a, b) => (b.spend || 0) - (a.spend || 0));

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
              campaign: campaign.campaign_name || 'Unknown',
              impressions: (campaign.impressions || 0).toLocaleString(),
              clicks: (campaign.clicks || 0).toLocaleString(),
              spend: `$${(campaign.spend || 0).toLocaleString()}`,
              sales: `$${(campaign.sales || 0).toLocaleString()}`,
              orders: (campaign.orders || 0).toLocaleString(),
              roas: `${(campaign.roas || 0).toFixed(2)}x`,
              acos: `${(campaign.acos || 0).toFixed(2)}%`
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
