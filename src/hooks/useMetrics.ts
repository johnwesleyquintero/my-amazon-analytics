
import { useState, useEffect } from 'react';
import { getProcessedMetrics, filterMetricsData } from '../services/metricsService';
import { MetricsState, MetricsFilter, AmazonMetric } from '../lib/amazon-types';
import { calculateKPIs, groupMetricsByTimePeriod, groupMetricsByDimension } from '../lib/amazon-algorithms';

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
  const [filters, setFilters] = useState<MetricsFilter>({});

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
  const applyFilters = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Filter raw data
      const filteredData = await filterMetricsData(filters);
      
      // Calculate KPIs based on filtered data
      const kpis = calculateKPIs(filteredData);
      
      // Group metrics by time periods
      const weeklyMetrics = groupMetricsByTimePeriod(filteredData, 'week');
      const monthlyMetrics = groupMetricsByTimePeriod(filteredData, 'month');
      
      // Group metrics by dimensions
      const asinMetrics = groupMetricsByDimension(filteredData, 'advertised_asin', 'asin');
      const searchTermMetrics = groupMetricsByDimension(filteredData, 'search_term', 'searchTerm');
      const skuMetrics = groupMetricsByDimension(filteredData, 'advertised_sku', 'sku');
      
      setState({
        rawData: filteredData,
        kpis,
        weeklyMetrics,
        monthlyMetrics,
        asinMetrics,
        searchTermMetrics,
        skuMetrics,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred while applying filters'
      }));
    }
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
