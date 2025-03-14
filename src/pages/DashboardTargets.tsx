
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { MetricsTable } from "@/components/metrics/MetricsTable";
import { SearchTermAnalysis } from "@/components/metrics/SearchTermAnalysis";

const DashboardTargets = () => {
  const [activeTab, setActiveTab] = useState("search-terms");

  const { data: searchTerms, isLoading } = useQuery({
    queryKey: ['search-terms'],
    queryFn: async () => {
      // Fetch search terms data
      const { data, error } = await supabase
        .from('amazon_ads_metrics')
        .select('*')
        .not('search_term', 'is', null)
        .order('impressions', { ascending: false });
      
      if (error) throw error;

      // Transform data for the SearchTermAnalysis component
      return data.map(term => ({
        searchTerm: term.search_term || 'Unknown',
        impressions: term.impressions || 0,
        clicks: term.clicks || 0,
        spend: term.amount_spent || 0,
        sales: term.total_ad_sales || 0,
        conversionRate: term.clicks > 0 ? ((term.total_ad_orders || 0) / term.clicks) * 100 : 0
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight" id="page-title">Targets & Search Terms</h1>
          <p className="text-muted-foreground">Manage your advertising targets and analyze search term performance.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="search-terms">Search Terms</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="search-terms" className="space-y-6">
            {isLoading ? (
              <Card className="p-6">
                <Skeleton className="h-4 w-[250px] mb-4" />
                <Skeleton className="h-8 w-[200px]" />
              </Card>
            ) : searchTerms && searchTerms.length > 0 ? (
              <>
                <SearchTermAnalysis data={searchTerms} />
                <MetricsTable 
                  headers={["Search Term", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate"]}
                  rows={searchTerms.map(term => ({
                    searchTerm: term.searchTerm,
                    impressions: term.impressions.toLocaleString(),
                    clicks: term.clicks.toLocaleString(),
                    spend: `$${term.spend.toLocaleString()}`,
                    sales: `$${term.sales.toLocaleString()}`,
                    convRate: `${term.conversionRate.toFixed(2)}%`
                  }))}
                  metrics={{}} // Add empty metrics object to satisfy the type
                />
              </>
            ) : (
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-4">No search term data available yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Product targeting data will be available soon.</p>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <AIRecommendations 
              searchTermData={searchTerms} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTargets;
