
/**
 * Amazon Metrics Data Types
 * Defines the structure of data used throughout the application
 */

export interface AmazonMetric {
  date: string;
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  campaign_name: string;
  ad_group_name: string;
  advertised_asin: string;
  advertised_sku: string;
  keyword: string;
  search_term: string;
  account_id: string;
}

export interface ImportedData {
  Date?: string;
  Impressions?: string;
  Clicks?: string;
  Spend?: string;
  "Total Sales"?: string;
  Orders?: string;
  "Campaign Name"?: string;
  "Ad Group Name"?: string;
  "Advertised ASIN"?: string;
  "Advertised SKU"?: string;
  Keyword?: string;
  "Search Term"?: string;
  [key: string]: string | undefined;
}

export interface MetricCalculation {
  totalImpressions: number;
  totalClicks: number;
  totalSpend: number;
  totalSales: number;
  totalOrders: number;
  ctr: number;
  cpc: number;
  acos: number;
  roas: number;
  conversionRate: number;
}

export interface CampaignData {
  campaign_name: string;
  ad_group_name: string;
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  advertised_asin: string;
  advertised_sku: string;
  ctr?: number;
  acos?: number;
  roas?: number;
  conversionRate?: number;
  title?: string;
  category?: string;
}

export interface KeywordData {
  keyword: string;
  search_term: string;
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  ctr?: number;
  acos?: number;
  roas?: number;
  conversionRate?: number;
}

export interface DimensionMetrics {
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  totalSales: number;
  totalOrders: number;
  ctr: number;
  cpc: number;
  acos: number;
  roas: number;
  conversionRate: number;
}

export interface ASINMetrics extends DimensionMetrics {
  advertised_asin: string;
  title?: string;
  category?: string;
}

export interface SearchTermMetrics extends DimensionMetrics {
  search_term: string;
  relevance?: number;
}

export interface SKUMetrics extends DimensionMetrics {
  advertised_sku: string;
  product_name?: string;
}

export interface TimeSeriesMetric {
  period: string;
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  ctr: number;
  cpc: number;
  acos: number;
  roas: number;
  conversionRate: number;
}

export interface PerformanceMetric {
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  conversionRate: number;
  roas: number;
}

export interface SalesMetric {
  totalSales: number;
  totalOrders: number;
}

export interface MetricsDisplayData {
  performance: PerformanceMetric;
  sales: SalesMetric;
  weeklyMetrics: TimeSeriesMetric[];
  monthlyMetrics: TimeSeriesMetric[];
  detailedMetrics: {
    asinMetrics: DimensionMetrics[];
    searchTermMetrics: DimensionMetrics[];
    skuMetrics: DimensionMetrics[];
  };
}
