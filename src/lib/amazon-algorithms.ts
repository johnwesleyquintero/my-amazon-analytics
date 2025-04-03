
/**
 * Amazon Metrics Calculation Algorithms
 * Core algorithms for Amazon Advertising analytics
 */

import { 
  AmazonMetric, 
  MetricCalculation, 
  CampaignData, 
  KeywordData,
  ASINMetrics,
  SearchTermMetrics,
  SKUMetrics,
  TimeSeriesMetric
} from './amazon-types';

/**
 * Calculate core advertising metrics from raw data
 */
export function calculateMetrics(data: AmazonMetric[]): MetricCalculation {
  // Handle empty data
  if (!data || data.length === 0) {
    return {
      totalImpressions: 0,
      totalClicks: 0,
      totalSpend: 0,
      totalSales: 0,
      totalOrders: 0,
      ctr: 0,
      cpc: 0,
      acos: 0,
      roas: 0,
      conversionRate: 0
    };
  }

  // Calculate totals
  const totalImpressions = data.reduce((sum, item) => sum + item.impressions, 0);
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalSpend = data.reduce((sum, item) => sum + item.amount_spent, 0);
  const totalSales = data.reduce((sum, item) => sum + item.total_ad_sales, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.total_ad_orders, 0);

  // Calculate rates
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const acos = totalSales > 0 ? (totalSpend / totalSales) * 100 : 0;
  const roas = totalSpend > 0 ? totalSales / totalSpend : 0;
  const conversionRate = totalClicks > 0 ? (totalOrders / totalClicks) * 100 : 0;

  return {
    totalImpressions,
    totalClicks,
    totalSpend,
    totalSales,
    totalOrders,
    ctr,
    cpc,
    acos,
    roas,
    conversionRate
  };
}

/**
 * Group metrics by campaign and calculate performance
 */
export function groupByCampaign(data: AmazonMetric[]): CampaignData[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Group by campaign_name and ad_group_name
  const campaignMap = new Map<string, CampaignData>();

  data.forEach(item => {
    const key = `${item.campaign_name}|${item.ad_group_name}`;
    
    if (!campaignMap.has(key)) {
      campaignMap.set(key, {
        campaign_name: item.campaign_name,
        ad_group_name: item.ad_group_name,
        impressions: 0,
        clicks: 0, 
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0,
        advertised_asin: item.advertised_asin,
        advertised_sku: item.advertised_sku
      });
    }
    
    const campaign = campaignMap.get(key)!;
    campaign.impressions += item.impressions;
    campaign.clicks += item.clicks;
    campaign.amount_spent += item.amount_spent;
    campaign.total_ad_sales += item.total_ad_sales;
    campaign.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(campaignMap.values()).map(campaign => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = campaign;
    
    return {
      ...campaign,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

/**
 * Group metrics by keyword and calculate performance
 */
export function groupByKeyword(data: AmazonMetric[]): KeywordData[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Group by keyword and search_term
  const keywordMap = new Map<string, KeywordData>();

  data.forEach(item => {
    const keywordKey = item.keyword || 'Unknown';
    const searchTermKey = item.search_term || 'Unknown';
    const key = `${keywordKey}|${searchTermKey}`;
    
    if (!keywordMap.has(key)) {
      keywordMap.set(key, {
        keyword: keywordKey,
        search_term: searchTermKey,
        impressions: 0,
        clicks: 0,
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0
      });
    }
    
    const keywordData = keywordMap.get(key)!;
    keywordData.impressions += item.impressions;
    keywordData.clicks += item.clicks;
    keywordData.amount_spent += item.amount_spent;
    keywordData.total_ad_sales += item.total_ad_sales;
    keywordData.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(keywordMap.values()).map(keyword => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = keyword;
    
    return {
      ...keyword,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

/**
 * Group metrics by ASIN and calculate performance
 */
export function groupByASIN(data: AmazonMetric[]): ASINMetrics[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Group by ASIN
  const asinMap = new Map<string, ASINMetrics>();

  data.forEach(item => {
    const key = item.advertised_asin || 'Unknown';
    
    if (!asinMap.has(key)) {
      asinMap.set(key, {
        advertised_asin: key,
        impressions: 0,
        clicks: 0,
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0,
        totalSales: 0,
        totalOrders: 0,
        ctr: 0,
        cpc: 0,
        acos: 0,
        roas: 0,
        conversionRate: 0
      });
    }
    
    const asinData = asinMap.get(key)!;
    asinData.impressions += item.impressions;
    asinData.clicks += item.clicks;
    asinData.amount_spent += item.amount_spent;
    asinData.total_ad_sales += item.total_ad_sales;
    asinData.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(asinMap.values()).map(asin => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = asin;
    
    return {
      ...asin,
      totalSales: total_ad_sales,
      totalOrders: total_ad_orders,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? amount_spent / clicks : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

/**
 * Group metrics by search term and calculate performance
 */
export function groupBySearchTerm(data: AmazonMetric[]): SearchTermMetrics[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Group by search term
  const searchTermMap = new Map<string, SearchTermMetrics>();

  data.forEach(item => {
    const key = item.search_term || 'Unknown';
    
    if (!searchTermMap.has(key)) {
      searchTermMap.set(key, {
        search_term: key,
        impressions: 0,
        clicks: 0,
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0,
        totalSales: 0,
        totalOrders: 0,
        ctr: 0,
        cpc: 0,
        acos: 0,
        roas: 0,
        conversionRate: 0
      });
    }
    
    const searchTermData = searchTermMap.get(key)!;
    searchTermData.impressions += item.impressions;
    searchTermData.clicks += item.clicks;
    searchTermData.amount_spent += item.amount_spent;
    searchTermData.total_ad_sales += item.total_ad_sales;
    searchTermData.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(searchTermMap.values()).map(searchTerm => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = searchTerm;
    
    return {
      ...searchTerm,
      totalSales: total_ad_sales,
      totalOrders: total_ad_orders,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? amount_spent / clicks : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

/**
 * Group metrics by SKU and calculate performance
 */
export function groupBySKU(data: AmazonMetric[]): SKUMetrics[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Group by SKU
  const skuMap = new Map<string, SKUMetrics>();

  data.forEach(item => {
    const key = item.advertised_sku || 'Unknown';
    
    if (!skuMap.has(key)) {
      skuMap.set(key, {
        advertised_sku: key,
        impressions: 0,
        clicks: 0,
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0,
        totalSales: 0,
        totalOrders: 0,
        ctr: 0,
        cpc: 0,
        acos: 0,
        roas: 0,
        conversionRate: 0
      });
    }
    
    const skuData = skuMap.get(key)!;
    skuData.impressions += item.impressions;
    skuData.clicks += item.clicks;
    skuData.amount_spent += item.amount_spent;
    skuData.total_ad_sales += item.total_ad_sales;
    skuData.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(skuMap.values()).map(sku => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = sku;
    
    return {
      ...sku,
      totalSales: total_ad_sales,
      totalOrders: total_ad_orders,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? amount_spent / clicks : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

/**
 * Group metrics by time period (day, week, month)
 */
export function groupByTimePeriod(data: AmazonMetric[], period: 'day' | 'week' | 'month'): TimeSeriesMetric[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Map to store aggregated data by period
  const timeMap = new Map<string, {
    impressions: number;
    clicks: number;
    amount_spent: number;
    total_ad_sales: number;
    total_ad_orders: number;
  }>();

  // Process each data point
  data.forEach(item => {
    const date = new Date(item.date);
    let periodKey: string;
    
    // Generate period key based on specified period
    switch (period) {
      case 'day':
        periodKey = item.date;
        break;
      case 'week':
        // Get week number and year
        const weekNum = getWeekNumber(date);
        periodKey = `${date.getFullYear()}-W${weekNum}`;
        break;
      case 'month':
        // Format as YYYY-MM
        periodKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        break;
      default:
        periodKey = item.date;
    }
    
    // Initialize period data if not exists
    if (!timeMap.has(periodKey)) {
      timeMap.set(periodKey, {
        impressions: 0,
        clicks: 0,
        amount_spent: 0,
        total_ad_sales: 0,
        total_ad_orders: 0
      });
    }
    
    // Aggregate data
    const periodData = timeMap.get(periodKey)!;
    periodData.impressions += item.impressions;
    periodData.clicks += item.clicks;
    periodData.amount_spent += item.amount_spent;
    periodData.total_ad_sales += item.total_ad_sales;
    periodData.total_ad_orders += item.total_ad_orders;
  });

  // Calculate derived metrics and convert to array
  return Array.from(timeMap.entries()).map(([period, data]) => {
    const { impressions, clicks, amount_spent, total_ad_sales, total_ad_orders } = data;
    
    return {
      period,
      impressions,
      clicks,
      amount_spent,
      total_ad_sales,
      total_ad_orders,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? amount_spent / clicks : 0,
      acos: total_ad_sales > 0 ? (amount_spent / total_ad_sales) * 100 : 0,
      roas: amount_spent > 0 ? total_ad_sales / amount_spent : 0,
      conversionRate: clicks > 0 ? (total_ad_orders / clicks) * 100 : 0
    };
  });
}

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
