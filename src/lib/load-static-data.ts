
import { AmazonMetric } from './amazon-types';
import sampleMetricsData from '../data/sampleMetrics.json';

/**
 * Loads sample metrics data from the static JSON file
 * @returns Array of sample metrics
 */
export function loadSampleMetricsData(): AmazonMetric[] {
  try {
    return sampleMetricsData as AmazonMetric[];
  } catch (error) {
    console.error('Error loading sample metrics data:', error);
    return [];
  }
}

/**
 * Loads data from a CSV string
 * @param csvString CSV data as string
 * @returns Parsed data as array of objects
 */
export function parseCSVData(csvString: string): any[] {
  if (!csvString) return [];

  const lines = csvString.split('\n');
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      let value = values[index] ? values[index].trim() : '';
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      
      // Convert numeric values
      if (!isNaN(Number(value)) && value !== '') {
        obj[header] = Number(value);
      } else {
        obj[header] = value;
      }
    });
    
    return obj;
  }).filter(obj => Object.keys(obj).length > 0); // Filter out empty rows
}

/**
 * Converts parsed CSV data to AmazonMetric format
 * @param parsedData Parsed CSV data
 * @returns Data converted to AmazonMetric format
 */
export function normalizeCSVData(parsedData: any[]): AmazonMetric[] {
  // Create a mapping of common field names to our expected format
  const fieldMappings: Record<string, string> = {
    'Impressions': 'impressions',
    'impressions': 'impressions',
    'Clicks': 'clicks', 
    'clicks': 'clicks',
    'Spend': 'spend',
    'spend': 'spend',
    'Amount Spent': 'spend',
    'amount_spent': 'spend',
    'Sales': 'sales',
    'sales': 'sales',
    'Ad Sales': 'sales',
    'Total Sales': 'sales',
    'total_ad_sales': 'sales',
    'Orders': 'orders',
    'orders': 'orders',
    'Ad Orders': 'orders',
    'Total Orders': 'orders',
    'total_ad_orders': 'orders',
    'ACOS': 'acos',
    'acos': 'acos',
    'ACoS': 'acos',
    'Date': 'date',
    'date': 'date',
    'Campaign': 'campaign_name',
    'Campaign Name': 'campaign_name',
    'campaign_name': 'campaign_name',
    'Ad Group': 'ad_group_name',
    'Ad Group Name': 'ad_group_name',
    'ad_group_name': 'ad_group_name',
    'ASIN': 'advertised_asin',
    'Advertised ASIN': 'advertised_asin',
    'advertised_asin': 'advertised_asin',
    'SKU': 'advertised_sku',
    'Advertised SKU': 'advertised_sku',
    'advertised_sku': 'advertised_sku',
    'Keyword': 'keyword',
    'keyword': 'keyword',
    'Search Term': 'search_term',
    'search_term': 'search_term',
    'Category': 'advertised_product_category',
    'Product Category': 'advertised_product_category',
    'advertised_product_category': 'advertised_product_category',
    'Marketplace': 'marketplace',
    'marketplace': 'marketplace'
  };

  return parsedData.map((item, index) => {
    const metric: Partial<AmazonMetric> = {
      id: `imported-${index}`
    };

    // Map fields using our mapping table
    Object.entries(item).forEach(([key, value]) => {
      const normalizedField = fieldMappings[key];
      if (normalizedField) {
        (metric as any)[normalizedField] = value;
      }
    });

    // Ensure required fields are present
    const result: AmazonMetric = {
      id: metric.id || `imported-${index}`,
      date: metric.date || new Date().toISOString().split('T')[0],
      impressions: Number(metric.impressions || 0),
      clicks: Number(metric.clicks || 0),
      spend: Number(metric.spend || 0),
      sales: Number(metric.sales || 0),
      orders: Number(metric.orders || 0),
      acos: metric.acos !== undefined ? Number(metric.acos) : undefined,
      campaign_name: metric.campaign_name,
      ad_group_name: metric.ad_group_name,
      advertised_asin: metric.advertised_asin,
      advertised_sku: metric.advertised_sku,
      keyword: metric.keyword,
      search_term: metric.search_term,
      advertised_product_category: metric.advertised_product_category,
      marketplace: metric.marketplace
    };

    return result;
  });
}
