
import { KPISection } from "./metrics/KPISection";
import { MetricsTabs } from "./metrics/MetricsTabs";
import { MetricsDisplayData } from "../types/metrics";

/**
 * Interface for the props used in the AmazonMetricsDisplay component
 */
interface MetricsDisplayProps {
  metrics: MetricsDisplayData;
}

/**
 * AmazonMetricsDisplay Component
 * 
 * A comprehensive display component for Amazon advertising and sales metrics.
 * Renders a dashboard layout with KPI summary and detailed metric tabs.
 */
export function AmazonMetricsDisplay({ metrics }: MetricsDisplayProps) {
  const totalSales = metrics?.sales?.totalSales ?? 0;
  const totalOrders = metrics?.sales?.totalOrders ?? 0;
  const roas = metrics?.performance?.roas ?? 0;
  const conversionRate = metrics?.performance?.conversionRate ?? 0;

  return (
    <div className="space-y-6 text-gray-900">
      <KPISection
        totalSales={totalSales}
        totalOrders={totalOrders}
        roas={roas}
        conversionRate={conversionRate}
      />
      <MetricsTabs
        weeklyMetrics={metrics.weeklyMetrics}
        monthlyMetrics={metrics.monthlyMetrics}
        detailedMetrics={metrics.detailedMetrics}
      />
    </div>
  );
}
