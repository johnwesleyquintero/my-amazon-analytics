import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignAnalysis } from "./CampaignAnalysis";
import { KeywordAnalysis } from "./KeywordAnalysis";
import { ASINAnalysis } from "./tabs/ASINAnalysis";
import { SearchTermAnalysis } from "./tabs/SearchTermAnalysis";
import { SKUAnalysis } from "./tabs/SKUAnalysis";
import { MetricsTable } from "./MetricsTable";

interface MetricsTabsProps {
  weeklyMetrics: Array<any>;
  monthlyMetrics: Array<any>;
  detailedMetrics: {
    asinMetrics: Array<any>;
    searchTermMetrics: Array<any>;
    skuMetrics: Array<any>;
  };
}

export function MetricsTabs({ weeklyMetrics, monthlyMetrics, detailedMetrics }: MetricsTabsProps) {
  return (
    <Tabs defaultValue="weekly" className="w-full">
      <TabsList>
        <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
        <TabsTrigger value="campaigns">Campaign Analysis</TabsTrigger>
        <TabsTrigger value="keywords">Keyword Analysis</TabsTrigger>
        <TabsTrigger value="asin">ASIN Analysis</TabsTrigger>
        <TabsTrigger value="search">Search Terms</TabsTrigger>
        <TabsTrigger value="sku">SKU Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly">
        <MetricsTable metrics={weeklyMetrics} />
      </TabsContent>

      <TabsContent value="monthly">
        <MetricsTable metrics={monthlyMetrics} />
      </TabsContent>

      <TabsContent value="campaigns">
        <CampaignAnalysis data={detailedMetrics.asinMetrics} />
      </TabsContent>

      <TabsContent value="keywords">
        <KeywordAnalysis data={detailedMetrics.searchTermMetrics} />
      </TabsContent>

      <TabsContent value="asin">
        <ASINAnalysis asinMetrics={detailedMetrics.asinMetrics} />
      </TabsContent>

      <TabsContent value="search">
        <SearchTermAnalysis searchTermMetrics={detailedMetrics.searchTermMetrics} />
      </TabsContent>

      <TabsContent value="sku">
        <SKUAnalysis skuMetrics={detailedMetrics.skuMetrics} />
      </TabsContent>
    </Tabs>
  );
}