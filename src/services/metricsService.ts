
import sampleData from '../data/sampleMetrics.json';
import { AmazonMetric, KPIData, PeriodMetrics, DimensionMetrics } from '../types/metrics';
import { calculateKPIs, groupMetricsByTimePeriod, groupMetricsByDimension } from '../utils/metricsCalculationUtils';

// Type assertion for our sample data to ensure TypeScript recognizes it properly
const metricsData = sampleData as unknown as AmazonMetric[];

/**
 * Simulates fetching metrics data from an API
 * @returns Promise that resolves to Amazon metrics data
 */
export const fetchMetricsData = async (): Promise<AmazonMetric[]> => {
  // Simulate API latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(metricsData);
    }, 500);
  });
};

/**
 * Processes raw metrics data and returns calculated KPIs
 * @returns Processed metrics data with all calculated values
 */
export const getProcessedMetrics = async () => {
  const data = await fetchMetricsData();
  
  // Calculate overall KPIs
  const kpis = calculateKPIs(data) as KPIData;
  
  // Group metrics by time periods
  const weeklyMetrics = groupMetricsByTimePeriod(data, 'week') as PeriodMetrics[];
  const monthlyMetrics = groupMetricsByTimePeriod(data, 'month') as PeriodMetrics[];
  
  // Group metrics by dimensions
  const asinMetrics = groupMetricsByDimension(data, 'advertised_asin', 'asin') as DimensionMetrics[];
  const searchTermMetrics = groupMetricsByDimension(data, 'search_term', 'searchTerm') as DimensionMetrics[];
  const skuMetrics = groupMetricsByDimension(data, 'advertised_sku', 'sku') as DimensionMetrics[];
  
  return {
    rawData: data,
    kpis,
    weeklyMetrics,
    monthlyMetrics,
    asinMetrics,
    searchTermMetrics,
    skuMetrics
  };
};

/**
 * Filters metrics data based on specified criteria
 * @param data The raw metrics data to filter
 * @param filters An object containing filter criteria
 * @returns Filtered metrics data
 */
export const filterMetricsData = (
  data: AmazonMetric[],
  filters: {
    startDate?: string;
    endDate?: string;
    marketplace?: string;
    campaignName?: string;
    asin?: string;
    sku?: string;
  }
): AmazonMetric[] => {
  return data.filter(item => {
    // Apply date range filter
    if (filters.startDate && new Date(item.date) < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && new Date(item.date) > new Date(filters.endDate)) {
      return false;
    }
    
    // Apply other filters
    if (filters.marketplace && item.marketplace !== filters.marketplace) {
      return false;
    }
    if (filters.campaignName && item.campaign_name !== filters.campaignName) {
      return false;
    }
    if (filters.asin && item.advertised_asin !== filters.asin) {
      return false;
    }
    if (filters.sku && item.advertised_sku !== filters.sku) {
      return false;
    }
    
    return true;
  });
};
