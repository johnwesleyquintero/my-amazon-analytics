
import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CampaignData } from '@/lib/amazon-types';

interface CampaignAnalysisProps {
  data: CampaignData[];
}

export function CampaignAnalysis({ data }: CampaignAnalysisProps) {
  const sortedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    // Sort campaigns by sales amount (descending)
    return [...data].sort((a, b) => {
      return (b.total_ad_sales || 0) - (a.total_ad_sales || 0);
    });
  }, [data]);

  if (!sortedData || sortedData.length === 0) {
    return <p className="text-center py-4">No campaign data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Campaign Performance Analysis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Ad Group</TableHead>
            <TableHead>ASIN</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">ACOS</TableHead>
            <TableHead className="text-right">ROAS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((campaign, index) => (
            <TableRow key={`${campaign.campaign_name}-${campaign.ad_group_name}-${index}`}>
              <TableCell className="font-medium">{campaign.campaign_name}</TableCell>
              <TableCell>{campaign.ad_group_name}</TableCell>
              <TableCell>{campaign.advertised_asin}</TableCell>
              <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{(campaign.ctr || 0).toFixed(2)}%</TableCell>
              <TableCell className="text-right">${(campaign.amount_spent || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
              <TableCell className="text-right">${(campaign.total_ad_sales || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
              <TableCell className="text-right">{(campaign.acos || 0).toFixed(2)}%</TableCell>
              <TableCell className="text-right">{(campaign.roas || 0).toFixed(2)}x</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
