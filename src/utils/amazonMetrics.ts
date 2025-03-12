
import { groupBy, sumBy } from 'lodash';

const ESSENTIAL_METRICS = [
  'Impressions',
  'Clicks',
  'Spend',
  'Sales',
  'Orders',
  'ACOS',
  'ROAS',
  'CTR',
  'Conversion Rate',
  'ASIN',
  'SKU',
  'Search Term',
  'Campaign Name',
  'Ad Group Name',
  'Date'
];

const aggregateMetricsByPeriod = (data: any[], period: 'week' | 'month') => {
  const groupedData = groupBy(data, (item) => {
    const date = new Date(item.date);
    if (!isNaN(date.getTime())) {  // Check if date is valid
      if (period === 'week') {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        return startOfWeek.toISOString().split('T')[0];
      }
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    return 'Invalid Date';  // Fallback for invalid dates
  });

  return Object.entries(groupedData).map(([periodKey, items]) => ({
    period: periodKey,
    impressions: sumBy(items, 'impressions'),
    clicks: sumBy(items, 'clicks'),
    spend: sumBy(items, 'amount_spent'),
    sales: sumBy(items, 'total_ad_sales'),
    orders: sumBy(items, 'total_ad_orders'),
    acos: (sumBy(items, 'amount_spent') / sumBy(items, 'total_ad_sales')) * 100 || 0,
    roas: sumBy(items, 'total_ad_sales') / sumBy(items, 'amount_spent') || 0,
    ctr: (sumBy(items, 'clicks') / sumBy(items, 'impressions')) * 100 || 0,
  }));
};

const processDetailedMetrics = (data: any[]) => {
  return {
    asinMetrics: processAsinMetrics(data),
    searchTermMetrics: processSearchTermMetrics(data),
    skuMetrics: processSkuMetrics(data)
  };
};

const processAsinMetrics = (data: any[]) => {
  const groupedByAsin = groupBy(data, 'advertised_asin');
  return Object.entries(groupedByAsin).map(([asin, items]) => ({
    asin,
    impressions: sumBy(items, 'impressions'),
    clicks: sumBy(items, 'clicks'),
    spend: sumBy(items, 'amount_spent'),
    sales: sumBy(items, 'total_ad_sales'),
    orders: sumBy(items, 'total_ad_orders'),
    conversionRate: (sumBy(items, 'total_ad_orders') / sumBy(items, 'clicks')) * 100 || 0,
    title: items[0]['advertised_product_title'] || 'N/A',
    category: items[0]['advertised_product_category'] || 'N/A'
  }));
};

const processSearchTermMetrics = (data: any[]) => {
  const groupedBySearchTerm = groupBy(data, 'search_term');
  return Object.entries(groupedBySearchTerm).map(([searchTerm, items]) => ({
    searchTerm,
    impressions: sumBy(items, 'impressions'),
    clicks: sumBy(items, 'clicks'),
    spend: sumBy(items, 'amount_spent'),
    sales: sumBy(items, 'total_ad_sales'),
    orders: sumBy(items, 'total_ad_orders'),
    conversionRate: (sumBy(items, 'total_ad_orders') / sumBy(items, 'clicks')) * 100 || 0
  }));
};

const processSkuMetrics = (data: any[]) => {
  const groupedBySku = groupBy(data, 'advertised_sku');
  return Object.entries(groupedBySku).map(([sku, items]) => ({
    sku,
    impressions: sumBy(items, 'impressions'),
    clicks: sumBy(items, 'clicks'),
    spend: sumBy(items, 'amount_spent'),
    sales: sumBy(items, 'total_ad_sales'),
    orders: sumBy(items, 'total_ad_orders'),
    conversionRate: (sumBy(items, 'total_ad_orders') / sumBy(items, 'clicks')) * 100 || 0
  }));
};

export const calculateMetrics = (data: any[]) => {
  // Calculate aggregated metrics
  const weeklyMetrics = aggregateMetricsByPeriod(data, 'week');
  const monthlyMetrics = aggregateMetricsByPeriod(data, 'month');
  const detailedMetrics = processDetailedMetrics(data);

  // Calculate overall performance metrics
  const performance = {
    impressions: sumBy(data, 'impressions'),
    clicks: sumBy(data, 'clicks'),
    spend: sumBy(data, 'amount_spent'),
    ctr: (sumBy(data, 'clicks') / sumBy(data, 'impressions')) * 100 || 0,
    conversionRate: (sumBy(data, 'total_ad_orders') / sumBy(data, 'clicks')) * 100 || 0,
    roas: sumBy(data, 'total_ad_sales') / sumBy(data, 'amount_spent') || 0
  };

  const sales = {
    totalSales: sumBy(data, 'total_ad_sales'),
    totalOrders: sumBy(data, 'total_ad_orders')
  };

  return {
    performance,
    sales,
    weeklyMetrics,
    monthlyMetrics,
    detailedMetrics
  };
};
