
import { useState, useEffect } from 'react';
import { getProcessedMetrics, filterMetricsData } from '../services/metricsService';
import { MetricsState, AmazonMetric } from '../types/metrics';

// Default state for metrics
const defaultMetricsState: MetricsState = {
  rawData: [],
  kpis: null,
  weeklyMetrics: [],
  monthlyMetrics: [],
  asinMetrics: [],
  searchTermMetrics: [],
  skuMetrics: [],
  isLoading: false,
  error: null
};

/**
 * Custom hook for fetching and managing metrics data
 * @returns Metrics data and operations
 */
export const useMetrics = () => {
  const [state, setState] = useState<MetricsState>(defaultMetricsState);
  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
    marketplace?: string;
    campaignName?: string;
    asin?: string;
    sku?: string;
  }>({});

  // Fetch metrics data
  const fetchMetrics = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const metricsData = await getProcessedMetrics();
      setState({
        ...metricsData,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching metrics'
      }));
    }
  };

  // Apply filters to metrics data
  const applyFilters = () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Filter raw data
      const filteredData = filterMetricsData(state.rawData, filters);
      
      // Recalculate all metrics based on filtered data
      const metricsData = getProcessedMetricsSync(filteredData);
      
      setState(prev => ({
        ...prev,
        ...metricsData,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred while applying filters'
      }));
    }
  };

  // Calculate metrics synchronously (for filtering)
  const getProcessedMetricsSync = (data: AmazonMetric[]) => {
    const { calculateKPIs, groupMetricsByTimePeriod, groupMetricsByDimension } = require('../utils/metricsCalculationUtils');
    
    return {
      rawData: data,
      kpis: calculateKPIs(data),
      weeklyMetrics: groupMetricsByTimePeriod(data, 'week'),
      monthlyMetrics: groupMetricsByTimePeriod(data, 'month'),
      asinMetrics: groupMetricsByDimension(data, 'advertised_asin', 'asin'),
      searchTermMetrics: groupMetricsByDimension(data, 'search_term', 'searchTerm'),
      skuMetrics: groupMetricsByDimension(data, 'advertised_sku', 'sku')
    };
  };

  // Initial data fetch
  useEffect(() => {
    fetchMetrics();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (state.rawData.length > 0) {
      applyFilters();
    }
  }, [filters]);

  return {
    ...state,
    setFilters,
    refreshMetrics: fetchMetrics
  };
};
