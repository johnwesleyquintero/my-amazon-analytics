
import { groupBy, sumBy } from 'lodash';
import { AmazonMetric, KPIData } from '../types/metrics';

/**
 * Calculates common KPIs from Amazon metrics data
 * @param data Raw metrics data
 * @returns Calculated KPIs
 */
export const calculateKPIs = (data: AmazonMetric[] | any[]): KPIData | null => {
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
export const groupMetricsByTimePeriod = (data: AmazonMetric[] | any[], period: 'day' | 'week' | 'month') => {
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
    // Ensure items is treated as an array
    const itemsArray = Array.isArray(items) ? items : [];
    const metrics = calculateKPIs(itemsArray);
    return {
      period: periodKey,
      ...(metrics || {impressions: 0, clicks: 0, spend: 0, totalSales: 0, totalOrders: 0, ctr: 0, conversionRate: 0, roas: 0, acos: 0})
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
  data: AmazonMetric[] | any[], 
  dimension: string, 
  dimensionLabel: string
) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  const grouped = groupBy(data, dimension);
  
  return Object.entries(grouped).map(([key, items]) => {
    // Ensure items is treated as an array
    const itemsArray = Array.isArray(items) ? items : [];
    const metrics = calculateKPIs(itemsArray);
    
    return {
      [dimensionLabel]: key,
      ...(metrics || {impressions: 0, clicks: 0, spend: 0, totalSales: 0, totalOrders: 0, ctr: 0, conversionRate: 0, roas: 0, acos: 0}),
      // Include any additional properties from the first item that might be relevant
      ...(itemsArray.length > 0 && itemsArray[0]?.title ? { title: itemsArray[0].title } : {}),
      ...(itemsArray.length > 0 && itemsArray[0]?.category ? { category: itemsArray[0].category } : {})
    };
  });
};
