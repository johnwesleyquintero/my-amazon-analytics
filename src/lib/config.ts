
/**
 * Application Configuration
 * Environment variables and constants
 */

// API endpoints
export const API_ENDPOINTS = {
  supabase: import.meta.env.VITE_SUPABASE_URL || '',
  amazonAPI: import.meta.env.VITE_AMAZON_API_URL || '',
};

// Authentication
export const AUTH_CONFIG = {
  supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};

// Feature flags
export const FEATURES = {
  enableAIRecommendations: import.meta.env.VITE_ENABLE_AI_RECOMMENDATIONS === 'true',
  enableAPIIntegration: import.meta.env.VITE_ENABLE_API_INTEGRATION === 'true',
  enableGoogleIntegration: import.meta.env.VITE_ENABLE_GOOGLE_INTEGRATION === 'true',
  debugMode: import.meta.env.DEV || false,
};

// Dashboard configuration
export const DASHBOARD_CONFIG = {
  defaultDateRange: {
    startDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    })(),
    endDate: new Date(),
  },
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  paginationPageSize: 10,
};

// Amazon metrics configuration
export const AMAZON_METRICS_CONFIG = {
  targetAcos: 25, // target ACOS percentage
  minRoas: 4, // minimum acceptable ROAS
  targetCtr: 0.5, // target CTR percentage
  targetConversionRate: 10, // target conversion rate percentage
  currencySymbol: '$',
  defaultLocale: 'en-US',
};

// File import configuration
export const IMPORT_CONFIG = {
  allowedFileTypes: ['.csv', '.xlsx', '.xls'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  csvDelimiter: ',',
};

// Chart and visualization configuration
export const CHART_CONFIG = {
  colors: [
    '#4F46E5', // indigo-600
    '#0891B2', // cyan-600
    '#059669', // emerald-600
    '#D97706', // amber-600
    '#DC2626', // red-600
    '#7C3AED', // violet-600
    '#2563EB', // blue-600
    '#EA580C', // orange-600
    '#DB2777', // pink-600
    '#4338CA', // indigo-700
  ],
  defaultChartHeight: 400,
};

// Application metadata
export const APP_METADATA = {
  name: 'My Amazon Analytics',
  version: '1.0.0',
  description: 'Amazon Advertising Analytics Platform',
  author: 'My Amazon Analytics Team',
  githubRepo: 'https://github.com/example/my-amazon-analytics',
};
