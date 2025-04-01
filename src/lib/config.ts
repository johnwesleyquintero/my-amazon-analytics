
/**
 * Application configuration constants and environment variables
 */

// API endpoints and configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000,
  retryAttempts: 3
};

// Amazon API specific configuration
export const AMAZON_API_CONFIG = {
  baseUrl: 'https://advertising-api.amazon.com',
  authUrl: 'https://api.amazon.com/auth/o2/token',
  maxBatchSize: 100,
  version: 'v2',
  rateLimit: {
    tokenBucket: 10,
    refillRate: 10 // Tokens per second
  }
};

// Application feature flags
export const FEATURES = {
  enableExportToCsv: true,
  enableDataImport: true,
  enableAdvancedFilters: true,
  enableAiInsights: false,  // Disabled until fully implemented
  enableRealTimeUpdates: false,
  debugMode: import.meta.env.DEV
};

// Default application settings
export const DEFAULT_SETTINGS = {
  currency: 'USD',
  locale: 'en-US',
  dateFormat: 'yyyy-MM-dd',
  theme: 'light',
  metricsRefreshInterval: 0,  // 0 means manual refresh only
  defaultDateRange: 30, // Last 30 days
  defaultMetricsSorting: 'spend',
  defaultMetricsSortingDirection: 'desc',
  showZeroMetrics: false
};

// Amazon metrics thresholds for UI color coding
export const METRICS_THRESHOLDS = {
  acos: {
    excellent: 15,  // Below 15% is excellent
    good: 25,       // Below 25% is good
    fair: 35,       // Below 35% is fair
    poor: Infinity  // Above 35% is poor
  },
  roas: {
    excellent: 7,   // Above 7 is excellent
    good: 5,        // Above 5 is good
    fair: 3,        // Above 3 is fair
    poor: 0         // Below 3 is poor
  },
  ctr: {
    excellent: 1,   // Above 1% is excellent
    good: 0.5,      // Above 0.5% is good
    fair: 0.3,      // Above 0.3% is fair
    poor: 0         // Below 0.3% is poor
  },
  conversionRate: {
    excellent: 15,  // Above 15% is excellent
    good: 10,       // Above 10% is good
    fair: 5,        // Above 5% is fair
    poor: 0         // Below 5% is poor
  }
};
