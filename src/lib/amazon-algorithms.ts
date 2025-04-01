
import { groupBy, sumBy } from 'lodash';
import { AmazonMetric, KPIData, PeriodMetrics, DimensionMetrics } from './amazon-types';

/**
 * Calculates common KPIs from Amazon metrics data
 * @param data Raw metrics data
 * @returns Calculated KPIs
 */
export const calculateKPIs = (data: AmazonMetric[]): KPIData | null => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const totalImpressions = sumBy(data, item => Number(item.impressions) || 0);
  const totalClicks = sumBy(data, item => Number(item.clicks) || 0);
  const totalSpend = sumBy(data, item => Number(item.spend) || Number(item.amount_spent) || 0);
  const totalSales = sumBy(data, item => Number(item.sales) || Number(item.total_ad_sales) || 0);
  const totalOrders = sumBy(data, item => Number(item.orders) || Number(item.total_ad_orders) || 0);

  // Calculate derived metrics
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const conversionRate = totalClicks > 0 ? (totalOrders / totalClicks) * 100 : 0;
  const roas = totalSpend > 0 ? totalSales / totalSpend : 0;
  const acos = totalSales > 0 ? (totalSpend / totalSales) * 100 : 0;

  return {
    impressions: totalImpressions,
    clicks: totalClicks,
    spend: totalSpend,
    totalSales,
    totalOrders,
    ctr,
    conversionRate,
    roas,
    acos
  };
};

/**
 * Groups metrics by time period
 * @param data Raw metrics data
 * @param period Time period to group by ('day', 'week', 'month')
 * @returns Metrics grouped by time period
 */
export const groupMetricsByTimePeriod = (data: AmazonMetric[], period: 'day' | 'week' | 'month'): PeriodMetrics[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  const groupedData = groupBy(data, (item) => {
    const date = new Date(item.date);
    if (!isNaN(date.getTime())) {
      if (period === 'day') {
        return date.toISOString().split('T')[0];
      }
      if (period === 'week') {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        return startOfWeek.toISOString().split('T')[0];
      }
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    return 'Invalid Date';
  });

  return Object.entries(groupedData).map(([periodKey, items]) => {
    // Calculate KPIs for this time period
    const periodKPIs = calculateKPIs(items) || {
      impressions: 0, 
      clicks: 0, 
      spend: 0, 
      totalSales: 0, 
      totalOrders: 0, 
      ctr: 0, 
      conversionRate: 0, 
      roas: 0, 
      acos: 0
    };
    
    return {
      period: periodKey,
      ...periodKPIs
    };
  });
};

/**
 * Groups metrics by a dimension (ASIN, SKU, etc.)
 * @param data Raw metrics data
 * @param dimension Dimension to group by
 * @param dimensionLabel Label for the dimension in the output
 * @returns Metrics grouped by the specified dimension
 */
export const groupMetricsByDimension = (
  data: AmazonMetric[], 
  dimension: string, 
  dimensionLabel: string
): DimensionMetrics[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  const grouped = groupBy(data, dimension);
  
  return Object.entries(grouped).map(([key, items]) => {
    // Calculate KPIs for this dimension
    const metrics = calculateKPIs(items) || {
      impressions: 0, 
      clicks: 0, 
      spend: 0, 
      totalSales: 0, 
      totalOrders: 0, 
      ctr: 0, 
      conversionRate: 0, 
      roas: 0, 
      acos: 0
    };
    
    // Create the dimension metric with the appropriate dimension key
    const dimensionMetric: DimensionMetrics = {
      ...metrics,
      [dimensionLabel]: key
    };
    
    // Add additional metadata if available
    if (items.length > 0) {
      if (items[0].title) {
        dimensionMetric.title = items[0].title;
      }
      
      if (items[0].category) {
        dimensionMetric.category = items[0].category;
      }
    }
    
    return dimensionMetric;
  });
};

/**
 * Calculates advertising cost of sales (ACOS)
 * @param spend Advertising spend
 * @param sales Total sales
 * @returns ACOS as a percentage
 */
export const calculateACOS = (spend: number, sales: number): number => {
  return sales > 0 ? (spend / sales) * 100 : 0;
};

/**
 * Calculates return on ad spend (ROAS)
 * @param sales Total sales
 * @param spend Advertising spend
 * @returns ROAS as a multiplier
 */
export const calculateROAS = (sales: number, spend: number): number => {
  return spend > 0 ? sales / spend : 0;
};

/**
 * Calculates click-through rate (CTR)
 * @param clicks Number of clicks
 * @param impressions Number of impressions
 * @returns CTR as a percentage
 */
export const calculateCTR = (clicks: number, impressions: number): number => {
  return impressions > 0 ? (clicks / impressions) * 100 : 0;
};

/**
 * Calculates conversion rate
 * @param orders Number of orders
 * @param clicks Number of clicks
 * @returns Conversion rate as a percentage
 */
export const calculateConversionRate = (orders: number, clicks: number): number => {
  return clicks > 0 ? (orders / clicks) * 100 : 0;
};

/**
 * Transforms raw metrics data into a display-ready format
 * @param data Raw metrics data
 * @returns Processed metrics data ready for display
 */
export const processMetricsForDisplay = (data: AmazonMetric[]): {
  performance: any;
  sales: any;
  weeklyMetrics: any[];
  monthlyMetrics: any[];
  detailedMetrics: {
    asinMetrics: DimensionMetrics[];
    searchTermMetrics: DimensionMetrics[];
    skuMetrics: DimensionMetrics[];
  };
} => {
  // Calculate overall KPIs
  const kpis = calculateKPIs(data) || {
    impressions: 0, 
    clicks: 0, 
    spend: 0, 
    totalSales: 0, 
    totalOrders: 0, 
    ctr: 0, 
    conversionRate: 0, 
    roas: 0, 
    acos: 0
  };
  
  // Group by time periods
  const weeklyMetrics = groupMetricsByTimePeriod(data, 'week').map(metric => ({
    period: metric.period,
    impressions: metric.impressions,
    clicks: metric.clicks,
    spend: metric.spend,
    sales: metric.totalSales,
    orders: metric.totalOrders,
    acos: metric.acos,
    roas: metric.roas,
    ctr: metric.ctr
  }));
  
  const monthlyMetrics = groupMetricsByTimePeriod(data, 'month').map(metric => ({
    period: metric.period,
    impressions: metric.impressions,
    clicks: metric.clicks,
    spend: metric.spend,
    sales: metric.totalSales,
    orders: metric.totalOrders,
    acos: metric.acos,
    roas: metric.roas,
    ctr: metric.ctr
  }));
  
  // Group by dimensions
  const asinMetrics = groupMetricsByDimension(data, 'advertised_asin', 'asin');
  const searchTermMetrics = groupMetricsByDimension(data, 'search_term', 'searchTerm');
  const skuMetrics = groupMetricsByDimension(data, 'advertised_sku', 'sku');
  
  return {
    performance: {
      impressions: kpis.impressions,
      clicks: kpis.clicks,
      spend: kpis.spend,
      ctr: kpis.ctr,
      conversionRate: kpis.conversionRate,
      roas: kpis.roas
    },
    sales: {
      totalSales: kpis.totalSales,
      totalOrders: kpis.totalOrders
    },
    weeklyMetrics,
    monthlyMetrics,
    detailedMetrics: {
      asinMetrics,
      searchTermMetrics,
      skuMetrics
    }
  };
};
