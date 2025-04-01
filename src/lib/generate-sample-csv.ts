
import { AmazonMetric } from './amazon-types';

/**
 * Generates a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random date within the specified range
 * @param startDate Start date for range
 * @param endDate End date for range
 * @returns Random date within range
 */
function randomDate(startDate: Date, endDate: Date): Date {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

/**
 * Format date as YYYY-MM-DD
 * @param date Date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Generates sample Amazon advertising metrics
 * @param count Number of records to generate
 * @param startDate Start date for data (default: 90 days ago)
 * @param endDate End date for data (default: today)
 * @returns Array of sample metrics
 */
export function generateSampleMetrics(
  count: number = 100,
  startDate: Date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  endDate: Date = new Date()
): AmazonMetric[] {
  const campaigns = ['Summer Sale', 'Product Launch', 'Keyword Campaign', 'Brand Awareness', 'Holiday Promotion'];
  const adGroups = ['Main Products', 'Accessories', 'New Items', 'Best Sellers', 'Clearance'];
  const marketplaces = ['US', 'UK', 'DE', 'FR', 'IT', 'ES', 'CA', 'JP'];
  const categories = ['Electronics', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys'];
  const searchTerms = [
    'best product', 'affordable', 'high quality', 'top rated', 'newest model',
    'for kids', 'professional', 'easy to use', 'long lasting', 'portable'
  ];
  
  const metrics: AmazonMetric[] = [];
  
  for (let i = 0; i < count; i++) {
    const impressions = randomInt(100, 10000);
    const clicks = randomInt(1, Math.max(1, Math.floor(impressions * 0.1)));
    const spend = parseFloat((randomInt(1, 500) / 10).toFixed(2));
    const orders = randomInt(0, Math.max(1, Math.floor(clicks * 0.2)));
    const sales = parseFloat((orders * randomInt(15, 100)).toFixed(2));
    const acos = sales > 0 ? parseFloat(((spend / sales) * 100).toFixed(2)) : 0;
    
    const date = formatDate(randomDate(startDate, endDate));
    const campaignName = campaigns[randomInt(0, campaigns.length - 1)];
    const adGroupName = adGroups[randomInt(0, adGroups.length - 1)];
    const marketplace = marketplaces[randomInt(0, marketplaces.length - 1)];
    const category = categories[randomInt(0, categories.length - 1)];
    const searchTerm = searchTerms[randomInt(0, searchTerms.length - 1)];
    
    // Generate consistent ASIN and SKU based on index for data correlation
    const asinBase = Math.floor(i / 10);
    const advertised_asin = `B0${String(asinBase).padStart(7, '0')}`;
    const advertised_sku = `SKU-${String(asinBase).padStart(4, '0')}`;
    
    metrics.push({
      id: `metric-${i}`,
      date,
      impressions,
      clicks,
      spend,
      sales,
      orders,
      acos,
      campaign_name: campaignName,
      ad_group_name: adGroupName,
      advertised_asin,
      advertised_sku,
      keyword: `keyword-${randomInt(1, 20)}`,
      search_term: searchTerm,
      advertised_product_category: category,
      marketplace
    });
  }
  
  return metrics;
}

/**
 * Converts sample metrics to CSV format
 * @param metrics Array of metrics to convert
 * @returns CSV string
 */
export function metricsToCSV(metrics: AmazonMetric[]): string {
  if (!metrics || metrics.length === 0) {
    return '';
  }
  
  // Get headers from first metric object
  const headers = Object.keys(metrics[0]);
  const csvRows = [
    headers.join(','),
    ...metrics.map(metric => 
      headers.map(header => {
        const value = metric[header as keyof AmazonMetric];
        // Handle string values that might contain commas
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
}

/**
 * Downloads generated sample metrics as a CSV file
 * @param count Number of records to generate
 */
export function downloadSampleMetricsCSV(count: number = 100): void {
  const metrics = generateSampleMetrics(count);
  const csv = metricsToCSV(metrics);
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `amazon_metrics_sample_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
