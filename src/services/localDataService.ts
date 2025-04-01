
import sampleData from '../data/sampleMetrics.json';
import { AmazonMetric } from '../types/metrics';

/**
 * A local data service that uses JSON data for development
 * This can be replaced with Supabase integration later
 */
export class LocalDataService {
  private static instance: LocalDataService;
  private data: AmazonMetric[];

  private constructor() {
    // Initialize with sample data
    this.data = sampleData as unknown as AmazonMetric[];
    console.log('LocalDataService initialized with sample data');
  }

  public static getInstance(): LocalDataService {
    if (!LocalDataService.instance) {
      LocalDataService.instance = new LocalDataService();
    }
    return LocalDataService.instance;
  }

  /**
   * Get all metrics data
   */
  public async getMetrics(): Promise<AmazonMetric[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 300);
    });
  }

  /**
   * Filter metrics by date range and other criteria
   */
  public async filterMetrics(filters: {
    startDate?: string;
    endDate?: string;
    marketplace?: string;
    campaignName?: string;
    asin?: string;
    sku?: string;
  }): Promise<AmazonMetric[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredData = [...this.data];
        
        // Apply date filters
        if (filters.startDate) {
          filteredData = filteredData.filter(
            item => new Date(item.date) >= new Date(filters.startDate!)
          );
        }
        
        if (filters.endDate) {
          filteredData = filteredData.filter(
            item => new Date(item.date) <= new Date(filters.endDate!)
          );
        }
        
        // Apply other filters
        if (filters.marketplace) {
          filteredData = filteredData.filter(
            item => item.marketplace === filters.marketplace
          );
        }
        
        if (filters.campaignName) {
          filteredData = filteredData.filter(
            item => item.campaign_name === filters.campaignName
          );
        }
        
        if (filters.asin) {
          filteredData = filteredData.filter(
            item => item.advertised_asin === filters.asin
          );
        }
        
        if (filters.sku) {
          filteredData = filteredData.filter(
            item => item.advertised_sku === filters.sku
          );
        }
        
        resolve(filteredData);
      }, 300);
    });
  }

  /**
   * Import new data (merges with existing data)
   */
  public async importData(newData: AmazonMetric[]): Promise<void> {
    // For development, just merge with existing data
    this.data = [...this.data, ...newData];
    console.log(`Imported ${newData.length} new records`);
    return Promise.resolve();
  }
}

// Export a singleton instance
export const localDataService = LocalDataService.getInstance();
