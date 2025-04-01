
/**
 * Core data types for the Amazon metrics functionality
 */

export interface AmazonMetric {
  id: string;
  date: string;
  impressions: number;
  clicks: number;
  spend: number; // amount_spent
  sales: number; // total_ad_sales
  orders: number; // total_ad_orders
  acos?: number;
  campaign_name?: string;
  ad_group_name?: string;
  advertised_asin?: string;
  advertised_sku?: string;
  keyword?: string;
  search_term?: string;
  advertised_product_category?: string;
  marketplace?: string;
}

export interface KPIData {
  impressions: number;
  clicks: number;
  spend: number;
  totalSales: number;
  totalOrders: number;
  ctr: number;
  conversionRate: number;
  roas: number;
  acos: number;
}

export interface PeriodMetrics extends KPIData {
  period: string;
}

export interface DimensionMetrics extends KPIData {
  [dimension: string]: any; // For dynamic dimension properties like 'asin', 'sku', etc.
  title?: string;
  category?: string;
}

export interface MetricsState {
  rawData: AmazonMetric[];
  kpis: KPIData | null;
  weeklyMetrics: PeriodMetrics[];
  monthlyMetrics: PeriodMetrics[];
  asinMetrics: DimensionMetrics[];
  searchTermMetrics: DimensionMetrics[];
  skuMetrics: DimensionMetrics[];
  isLoading: boolean;
  error: string | null;
}

export interface MetricsDisplayData {
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
    asinMetrics: DimensionMetrics[];
    searchTermMetrics: DimensionMetrics[];
    skuMetrics: DimensionMetrics[];
  };
}
