
import { localDataService } from './localDataService';
import { AmazonMetric, KPIData, PeriodMetrics, DimensionMetrics } from '../types/metrics';
import { calculateKPIs, groupMetricsByTimePeriod, groupMetricsByDimension } from '../utils/metricsCalculationUtils';

/**
 * Simulates fetching metrics data from an API
 * @returns Promise that resolves to Amazon metrics data
 */
export const fetchMetricsData = async (): Promise<AmazonMetric[]> => {
  return localDataService.getMetrics();
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
export const filterMetricsData = async (
  filters: {
    startDate?: string;
    endDate?: string;
    marketplace?: string;
    campaignName?: string;
    asin?: string;
    sku?: string;
  }
): Promise<AmazonMetric[]> => {
  return localDataService.filterMetrics(filters);
};

/**
 * Imports new metrics data
 * @param data The new metrics data to import
 */
export const importMetricsData = async (
  data: AmazonMetric[]
): Promise<void> => {
  return localDataService.importData(data);
};
