
import { createContext, useContext, useState, ReactNode } from "react";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/errorHandling";

interface AmazonMetricRow {
  date: string;
  impressions: number;
  clicks: number;
  amount_spent: number;
  total_ad_sales: number;
  total_ad_orders: number;
  campaign_name: string;
  ad_group_name: string;
  advertised_asin: string;
  advertised_sku: string;
  keyword: string;
  search_term: string;
  account_id: string;
}

interface ImportedData {
  Date?: string;
  Impressions?: string;
  Clicks?: string;
  Spend?: string;
  "Total Sales"?: string;
  Orders?: string;
  "Campaign Name"?: string;
  "Ad Group Name"?: string;
  "Advertised ASIN"?: string;
  "Advertised SKU"?: string;
  Keyword?: string;
  "Search Term"?: string;
  [key: string]: string | undefined;
}

interface MetricCalculation {
  totalImpressions: number;
  totalClicks: number;
  totalSpend: number;
  totalSales: number;
  totalOrders: number;
  ctr: number;
  cpc: number;
  acos: number;
  roas: number;
  conversionRate: number;
}

interface ImportContextType {
  importedData: AmazonMetricRow[];
  metrics: MetricCalculation | null;
  isUploading: boolean;
  processAndUploadData: (data: ImportedData[]) => Promise<void>;
}

const ImportContext = createContext<ImportContextType | undefined>(undefined);

export function ImportProvider({ children }: { children: ReactNode }) {
  const [importedData, setImportedData] = useState<AmazonMetricRow[]>([]);
  const [metrics, setMetrics] = useState<MetricCalculation | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const processAndUploadData = async (data: ImportedData[]) => {
    try {
      setIsUploading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) {
        throw new Error("You must be logged in to upload data");
      }
      
      // Transform data to match database schema
      const transformedData: AmazonMetricRow[] = data.map(row => ({
        date: row.Date || new Date().toISOString().split('T')[0],
        impressions: parseInt(row.Impressions || '0'),
        clicks: parseInt(row.Clicks || '0'),
        amount_spent: parseFloat(row.Spend?.replace('$', '').replace(',', '') || '0'),
        total_ad_sales: parseFloat(row["Total Sales"]?.replace('$', '').replace(',', '') || '0'),
        total_ad_orders: parseInt(row.Orders || '0'),
        campaign_name: row["Campaign Name"] || 'Unknown Campaign',
        ad_group_name: row["Ad Group Name"] || 'Unknown Ad Group',
        advertised_asin: row["Advertised ASIN"] || '',
        advertised_sku: row["Advertised SKU"] || '',
        keyword: row.Keyword || '',
        search_term: row["Search Term"] || '',
        account_id: user.id
      }));

      // Validate data before upload
      if (transformedData.length === 0) {
        throw new Error("No valid data to upload");
      }

      // Upload to Supabase
      const { error: insertError } = await supabase
        .from('amazon_ads_metrics')
        .insert(transformedData);

      if (insertError) throw insertError;

      // Update local state
      setImportedData(transformedData);
      
      // Calculate metrics
      const calculatedMetrics = calculateMetrics(transformedData);
      setMetrics(calculatedMetrics);
      
      toast({
        title: "Data imported successfully",
        description: `${transformedData.length} rows processed and uploaded`,
      });
    } catch (error) {
      handleError(error, "Import error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ImportContext.Provider value={{ importedData, metrics, isUploading, processAndUploadData }}>
      {children}
    </ImportContext.Provider>
  );
}

export function useImport() {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error("useImport must be used within an ImportProvider");
  }
  return context;
}
