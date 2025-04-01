
import { localDataService } from './localDataService';
import { AmazonMetric, KPIData, PeriodMetrics, DimensionMetrics, MetricsFilter } from '../lib/amazon-types';
import { calculateKPIs, groupMetricsByTimePeriod, groupMetricsByDimension, processMetricsForDisplay } from '../lib/amazon-algorithms';

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
 * @param filters An object containing filter criteria
 * @returns Filtered metrics data
 */
export const filterMetricsData = async (
  filters: MetricsFilter
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

/**
 * Gets metrics data in a display-ready format
 * @returns Metrics data formatted for display components
 */
export const getDisplayMetrics = async () => {
  const data = await fetchMetricsData();
  return processMetricsForDisplay(data);
};
