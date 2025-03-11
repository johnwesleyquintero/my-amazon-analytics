import { KPISection } from "./metrics/KPISection";
import { MetricsTabs } from "./metrics/MetricsTabs";

interface MetricsDisplayProps {
  metrics: {
    performance: {
      impressions: number;
      clicks: number;
      spend: number;
      ctr: number;
      conversionRate: number;
      roas: number;
    };
    sales: {
      totalSales: number;
      totalOrders: number;
    };
    weeklyMetrics: Array<{
      period: string;
      impressions: number;
      clicks: number;
      spend: number;
      sales: number;
      orders: number;
      acos: number;
      roas: number;
      ctr: number;
    }>;
    monthlyMetrics: Array<{
      period: string;
      impressions: number;
      clicks: number;
      spend: number;
      sales: number;
      orders: number;
      acos: number;
      roas: number;
      ctr: number;
    }>;
    detailedMetrics: {
      asinMetrics: Array<{
        asin: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
        title: string;
        category: string;
      }>;
      searchTermMetrics: Array<{
        searchTerm: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
      }>;
      skuMetrics: Array<{
        sku: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
      }>;
    };
  };
}

export function AmazonMetricsDisplay({ metrics }: MetricsDisplayProps) {
  const totalSales = metrics?.sales?.totalSales ?? 0;
  const totalOrders = metrics?.sales?.totalOrders ?? 0;
  const roas = metrics?.performance?.roas ?? 0;
  const conversionRate = metrics?.performance?.conversionRate ?? 0;

  return (
    <div className="space-y-6">
      <KPISection
        totalSales={totalSales}
        totalOrders={totalOrders}
        roas={roas}
        conversionRate={conversionRate}
      />
      <MetricsTabs
        weeklyMetrics={metrics.weeklyMetrics}
        monthlyMetrics={metrics.monthlyMetrics}
        detailedMetrics={metrics.detailedMetrics}
      />
    </div>
  );
}