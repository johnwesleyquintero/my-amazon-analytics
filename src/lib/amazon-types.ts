
/**
 * Core Amazon Advertising and Seller data types
 */

// Base Amazon advertising metric interface
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

// Key Performance Indicators data structure
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

// Metrics aggregated by time period
export interface PeriodMetrics extends KPIData {
  period: string;
}

// Metrics aggregated by dimension (ASIN, SKU, search term, etc.)
export interface DimensionMetrics extends KPIData {
  [dimension: string]: any; // For dynamic dimension properties like 'asin', 'sku', etc.
  title?: string;
  category?: string;
}

// Complete metrics state for application
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

// Data structure for metrics display components
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

// Data filter criteria
export interface MetricsFilter {
  startDate?: string;
  endDate?: string;
  marketplace?: string;
  campaignName?: string;
  asin?: string;
  sku?: string;
}
