
import React from 'react';
import { AmazonMetricsDisplay } from './AmazonMetricsDisplay';
import { useMetrics } from '../hooks/useMetrics';
import { DimensionMetrics } from '../lib/amazon-types';

/**
 * Main dashboard content component that displays Amazon metrics data
 */
export const DashboardContent: React.FC = () => {
  const { 
    kpis, 
    weeklyMetrics, 
    monthlyMetrics, 
    asinMetrics, 
    searchTermMetrics, 
    skuMetrics,
    isLoading, 
    error 
  } = useMetrics();

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading metrics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-600">Error loading metrics</h3>
        <p className="mt-2 text-red-500">{error}</p>
        <p className="mt-4 text-sm text-gray-600">
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700">No data available</h3>
        <p className="mt-2 text-gray-600">
          There are no metrics data available to display.
        </p>
      </div>
    );
  }

  // Safely ensure we have arrays with default values
  const safeWeeklyMetrics = Array.isArray(weeklyMetrics) ? weeklyMetrics : [];
  const safeMonthlyMetrics = Array.isArray(monthlyMetrics) ? monthlyMetrics : [];
  const safeAsinMetrics = Array.isArray(asinMetrics) ? asinMetrics : [];
  const safeSearchTermMetrics = Array.isArray(searchTermMetrics) ? searchTermMetrics : [];
  const safeSkuMetrics = Array.isArray(skuMetrics) ? skuMetrics : [];

  // Transform PeriodMetrics to include required sales and orders properties with safe defaults
  const transformedWeeklyMetrics = safeWeeklyMetrics.map(metric => ({
    period: metric.period || '',
    impressions: metric.impressions || 0,
    clicks: metric.clicks || 0,
    spend: metric.spend || 0,
    sales: metric.totalSales || 0,
    orders: metric.totalOrders || 0,
    acos: metric.acos || 0,
    roas: metric.roas || 0,
    ctr: metric.ctr || 0
  }));

  const transformedMonthlyMetrics = safeMonthlyMetrics.map(metric => ({
    period: metric.period || '',
    impressions: metric.impressions || 0,
    clicks: metric.clicks || 0,
    spend: metric.spend || 0,
    sales: metric.totalSales || 0,
    orders: metric.totalOrders || 0,
    acos: metric.acos || 0,
    roas: metric.roas || 0,
    ctr: metric.ctr || 0
  }));

  const metricsData = {
    performance: {
      impressions: kpis.impressions || 0,
      clicks: kpis.clicks || 0,
      spend: kpis.spend || 0,
      ctr: kpis.ctr || 0,
      conversionRate: kpis.conversionRate || 0,
      roas: kpis.roas || 0
    },
    sales: {
      totalSales: kpis.totalSales || 0,
      totalOrders: kpis.totalOrders || 0
    },
    weeklyMetrics: transformedWeeklyMetrics,
    monthlyMetrics: transformedMonthlyMetrics,
    detailedMetrics: {
      asinMetrics: safeAsinMetrics as DimensionMetrics[],
      searchTermMetrics: safeSearchTermMetrics as DimensionMetrics[],
      skuMetrics: safeSkuMetrics as DimensionMetrics[]
    }
  };

  return <AmazonMetricsDisplay metrics={metricsData} />;
};
