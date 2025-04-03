
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

export function MetricsTabs({ 
  weeklyMetrics = [], 
  monthlyMetrics = [], 
  detailedMetrics = {
    asinMetrics: [],
    searchTermMetrics: [],
    skuMetrics: []
  } 
}: MetricsTabsProps) {
  // Ensure all metrics arrays exist and are arrays
  const safeWeeklyMetrics = Array.isArray(weeklyMetrics) ? weeklyMetrics : [];
  const safeMonthlyMetrics = Array.isArray(monthlyMetrics) ? monthlyMetrics : [];
  const safeDetailedMetrics = {
    asinMetrics: Array.isArray(detailedMetrics?.asinMetrics) ? detailedMetrics.asinMetrics : [],
    searchTermMetrics: Array.isArray(detailedMetrics?.searchTermMetrics) ? detailedMetrics.searchTermMetrics : [],
    skuMetrics: Array.isArray(detailedMetrics?.skuMetrics) ? detailedMetrics.skuMetrics : []
  };

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
        <MetricsTable 
          metrics={safeWeeklyMetrics} 
          caption="Weekly Metrics Analysis"
        />
      </TabsContent>

      <TabsContent value="monthly">
        <MetricsTable 
          metrics={safeMonthlyMetrics} 
          caption="Monthly Metrics Analysis"
        />
      </TabsContent>

      <TabsContent value="campaigns">
        <CampaignAnalysis data={safeDetailedMetrics.asinMetrics} />
      </TabsContent>

      <TabsContent value="keywords">
        <KeywordAnalysis data={safeDetailedMetrics.searchTermMetrics} />
      </TabsContent>

      <TabsContent value="asin">
        <ASINAnalysis asinMetrics={safeDetailedMetrics.asinMetrics} />
      </TabsContent>

      <TabsContent value="search">
        <SearchTermAnalysis searchTermMetrics={safeDetailedMetrics.searchTermMetrics} />
      </TabsContent>

      <TabsContent value="sku">
        <SKUAnalysis skuMetrics={safeDetailedMetrics.skuMetrics} />
      </TabsContent>
    </Tabs>
  );
}
