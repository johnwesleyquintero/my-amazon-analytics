
/**
 * Static Data Loading Utilities
 * Functions for loading and processing static data files
 */

import Papa from 'papaparse';
import { AmazonMetric } from './amazon-types';

/**
 * Parse CSV data to array of objects
 * @param csvText CSV text content
 * @param options Parse options
 * @returns Parsed data as array of objects
 */
export function parseCSV<T = Record<string, any>>(
  csvText: string,
  options: {
    header?: boolean;
    skipEmptyLines?: boolean;
    transformHeader?: (header: string) => string;
  } = {}
): T[] {
  const defaultOptions = {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header
  };
  
  const parseOptions = { ...defaultOptions, ...options };
  
  const result = Papa.parse(csvText, parseOptions);
  return result.data as T[];
}

/**
 * Transform imported data to match AmazonMetric schema
 * @param data Imported data from CSV
 * @returns Transformed data in AmazonMetric format
 */
export function transformAmazonData(data: Record<string, any>[]): AmazonMetric[] {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(row => {
    // Map fields based on common header variations
    const dateField = row.Date || row.date || row.DATE;
    const impressionsField = row.Impressions || row.impressions || row.IMPRESSIONS;
    const clicksField = row.Clicks || row.clicks || row.CLICKS;
    const spendField = row.Spend || row.spend || row.SPEND || row['Spend (USD)'] || row['Amount Spent'];
    const salesField = row['Total Sales'] || row.Sales || row.sales || row['TOTAL SALES'] || row.Revenue;
    const ordersField = row.Orders || row.orders || row.ORDERS || row['Order Numbers'] || row['Total Orders'];
    const campaignField = row['Campaign Name'] || row.Campaign || row.campaign || row.CAMPAIGN;
    const adGroupField = row['Ad Group'] || row['Ad Group Name'] || row.adgroup || row.AD_GROUP;
    const asinField = row['Advertised ASIN'] || row.ASIN || row.asin;
    const skuField = row['Advertised SKU'] || row.SKU || row.sku;
    const keywordField = row.Keyword || row.keyword || row.KEYWORD;
    const searchTermField = row['Search Term'] || row.search_term || row.SEARCH_TERM;
    
    // Handle currency formatting and conversion
    const cleanSpend = typeof spendField === 'string' ? 
      parseFloat(spendField.replace(/[^0-9.-]+/g, '')) : 
      (spendField || 0);
      
    const cleanSales = typeof salesField === 'string' ? 
      parseFloat(salesField.replace(/[^0-9.-]+/g, '')) : 
      (salesField || 0);
    
    return {
      date: dateField || new Date().toISOString().split('T')[0],
      impressions: parseInt(String(impressionsField || '0')),
      clicks: parseInt(String(clicksField || '0')),
      amount_spent: cleanSpend,
      total_ad_sales: cleanSales,
      total_ad_orders: parseInt(String(ordersField || '0')),
      campaign_name: campaignField || 'Unknown Campaign',
      ad_group_name: adGroupField || 'Unknown Ad Group',
      advertised_asin: asinField || '',
      advertised_sku: skuField || '',
      keyword: keywordField || '',
      search_term: searchTermField || '',
      account_id: 'current-user' // This would be replaced with the actual user ID
    };
  });
}

/**
 * Load and parse a CSV file from a URL
 * @param url URL of the CSV file
 * @returns Promise resolving to parsed data
 */
export async function loadCSVFromURL<T = Record<string, any>>(url: string): Promise<T[]> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSV<T>(csvText);
  } catch (error) {
    console.error('Error loading CSV from URL:', error);
    throw error;
  }
}

/**
 * Load and parse a JSON file from a URL
 * @param url URL of the JSON file
 * @returns Promise resolving to parsed data
 */
export async function loadJSONFromURL<T = Record<string, any>>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('Error loading JSON from URL:', error);
    throw error;
  }
}

/**
 * Convert a File object to text
 * @param file File object
 * @returns Promise resolving to file content as text
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsText(file);
  });
}

/**
 * Process a file upload and transform to AmazonMetric format
 * @param file Uploaded file
 * @returns Promise resolving to processed data
 */
export async function processAmazonDataFile(file: File): Promise<AmazonMetric[]> {
  try {
    // Check file type
    if (!file.name.endsWith('.csv')) {
      throw new Error('Only CSV files are supported at this time');
    }
    
    // Read file content
    const fileContent = await readFileAsText(file);
    
    // Parse CSV
    const parsedData = parseCSV(fileContent);
    
    // Transform to AmazonMetric format
    return transformAmazonData(parsedData);
  } catch (error) {
    console.error('Error processing data file:', error);
    throw error;
  }
}
