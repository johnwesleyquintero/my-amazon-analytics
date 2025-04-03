
/**
 * Generate Sample CSV Data
 * Utility for creating sample Amazon Advertising data for testing
 */

import { AmazonMetric } from './amazon-types';

// Campaign name options for sample data
const CAMPAIGN_NAMES = [
  'SP_Auto_Campaign', 
  'SD_Product_Targeting', 
  'SB_Brand_Defense', 
  'SP_Manual_Broad',
  'SP_Manual_Exact',
  'SD_Audience_Targeting'
];

// Ad group name options for sample data
const AD_GROUP_NAMES = [
  'Main Products',
  'Bestsellers',
  'New Releases',
  'Competitor Targeting',
  'Category Targeting',
  'High Margin Products'
];

// Product categories for sample data
const PRODUCT_CATEGORIES = [
  'Kitchen',
  'Home Decor',
  'Electronics',
  'Office Supplies',
  'Clothing',
  'Beauty',
  'Sports',
  'Toys',
  'Pet Supplies',
  'Garden'
];

// Search term examples
const SEARCH_TERMS = [
  'best kitchen gadgets',
  'affordable home decor',
  'wireless earbuds',
  'office desk organization',
  'comfortable workout clothes',
  'natural skincare products',
  'fitness equipment for home',
  'educational toys for toddlers',
  'durable dog toys',
  'indoor plants easy care'
];

/**
 * Generate a random date within a range
 * @param start Start date
 * @param end End date
 * @returns Date string in YYYY-MM-DD format
 */
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

/**
 * Generate a random number within a range
 * @param min Minimum value
 * @param max Maximum value
 * @param decimals Number of decimal places
 * @returns Random number
 */
function randomNumber(min: number, max: number, decimals = 0): number {
  const random = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(random * factor) / factor;
}

/**
 * Generate random Amazon ASIN
 * @returns ASIN string
 */
function generateASIN(): string {
  return 'B' + Math.random().toString(36).substring(2, 11).toUpperCase();
}

/**
 * Generate random Amazon SKU
 * @returns SKU string
 */
function generateSKU(): string {
  const prefix = ['MAG', 'PRD', 'SKU', 'ITM'].random();
  const number = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${number}`;
}

/**
 * Generate a realistic set of Amazon advertising metrics
 * @param campaignName Campaign name
 * @param adGroupName Ad group name
 * @param date Date for the metrics
 * @returns Metrics object
 */
function generateMetrics(campaignName: string, adGroupName: string, date: string): Partial<AmazonMetric> {
  // Generate base metrics with realistic values
  const impressions = randomNumber(500, 10000);
  const clicks = randomNumber(0, impressions * 0.08); // Realistic CTR between 0-8%
  const amount_spent = randomNumber(0, clicks * 1.5, 2); // CPC between $0-$1.50
  
  // Conversion rate between 5-15%
  const total_ad_orders = randomNumber(0, clicks * 0.15);
  
  // Average order value between $20-$60
  const orderValue = randomNumber(20, 60, 2);
  const total_ad_sales = total_ad_orders * orderValue;
  
  // Generate ASIN and SKU
  const advertised_asin = generateASIN();
  const advertised_sku = generateSKU();
  
  // Generate keyword and search term for some campaign types
  let keyword = '';
  let search_term = '';
  
  if (campaignName.includes('Manual')) {
    const searchTermIndex = Math.floor(Math.random() * SEARCH_TERMS.length);
    keyword = SEARCH_TERMS[searchTermIndex];
    
    // For some metrics, search term matches keyword, for others it's a variation
    if (Math.random() > 0.7) {
      search_term = SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
    } else {
      search_term = keyword;
    }
  }
  
  return {
    date,
    impressions,
    clicks,
    amount_spent,
    total_ad_sales,
    total_ad_orders,
    campaign_name: campaignName,
    ad_group_name: adGroupName,
    advertised_asin,
    advertised_sku,
    keyword,
    search_term,
    account_id: 'sample-account-id'
  };
}

/**
 * Generate a sample dataset of Amazon advertising metrics
 * @param numRows Number of data rows to generate
 * @param startDate Start date for data range
 * @param endDate End date for data range
 * @returns Array of metrics objects
 */
export function generateSampleMetrics(
  numRows = 100, 
  startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
  endDate = new Date()
): AmazonMetric[] {
  const metrics: AmazonMetric[] = [];
  
  for (let i = 0; i < numRows; i++) {
    // For realistic data, distribute campaign types unevenly
    const campaignIndex = Math.floor(Math.random() * CAMPAIGN_NAMES.length);
    const adGroupIndex = Math.floor(Math.random() * AD_GROUP_NAMES.length);
    
    const campaignName = CAMPAIGN_NAMES[campaignIndex];
    const adGroupName = AD_GROUP_NAMES[adGroupIndex];
    const date = randomDate(startDate, endDate);
    
    const metric = generateMetrics(campaignName, adGroupName, date) as AmazonMetric;
    metrics.push(metric);
  }
  
  return metrics;
}

/**
 * Convert metrics array to CSV string
 * @param metrics Array of metrics objects
 * @returns CSV string with headers
 */
export function convertMetricsToCSV(metrics: AmazonMetric[]): string {
  if (!metrics || metrics.length === 0) {
    return '';
  }
  
  // Define CSV header row
  const headers = [
    'Date',
    'Campaign Name',
    'Ad Group Name',
    'Impressions',
    'Clicks',
    'Spend',
    'Total Sales',
    'Orders',
    'Advertised ASIN',
    'Advertised SKU',
    'Keyword',
    'Search Term'
  ];
  
  // Create CSV content
  const rows = metrics.map(metric => [
    metric.date,
    metric.campaign_name,
    metric.ad_group_name,
    metric.impressions,
    metric.clicks,
    metric.amount_spent.toFixed(2),
    metric.total_ad_sales.toFixed(2),
    metric.total_ad_orders,
    metric.advertised_asin,
    metric.advertised_sku,
    metric.keyword,
    metric.search_term
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}

/**
 * Generate a sample CSV file and return as a Blob
 * @param numRows Number of data rows
 * @param startDate Start date for data
 * @param endDate End date for data
 * @returns Blob containing CSV data
 */
export function generateSampleCSVBlob(
  numRows = 100,
  startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  endDate = new Date()
): Blob {
  const metrics = generateSampleMetrics(numRows, startDate, endDate);
  const csvContent = convertMetricsToCSV(metrics);
  
  return new Blob([csvContent], { type: 'text/csv' });
}

/**
 * Download a sample CSV file
 * @param filename Filename for the downloaded file
 * @param numRows Number of data rows
 */
export function downloadSampleCSV(filename = 'amazon-advertising-sample.csv', numRows = 100): void {
  const blob = generateSampleCSVBlob(numRows);
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
