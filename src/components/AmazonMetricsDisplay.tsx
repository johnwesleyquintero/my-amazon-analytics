import { KPISection } from "./metrics/KPISection";
import { MetricsTabs } from "./metrics/MetricsTabs";

/**
 * Interface for the metrics data structure used in the AmazonMetricsDisplay component
 */
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

/**
 * AmazonMetricsDisplay Component
 * 
 * A comprehensive display component for Amazon advertising and sales metrics.
 * Renders a dashboard layout with KPI summary and detailed metric tabs.
 * 
 * Features:
 * - KPI section showing key performance indicators
 * - Tabbed interface for weekly, monthly, and detailed metrics
 * - Detailed breakdowns by ASIN, search terms, and SKU
 * - Null-safe data handling with fallback values
 * 
 * @component
 * @param {MetricsDisplayProps} props - The metrics data to display
 * @param {Object} props.metrics - Complete metrics object containing performance, sales, and detailed data
 * 
 * @example
 * const metrics = {
 *   performance: { impressions: 1000, clicks: 100, ... },
 *   sales: { totalSales: 5000, totalOrders: 50 },
 *   weeklyMetrics: [...],
 *   monthlyMetrics: [...],
 *   detailedMetrics: { ... }
 * };
 * 
 * return (
 *   <AmazonMetricsDisplay metrics={metrics} />
 * )
 */
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