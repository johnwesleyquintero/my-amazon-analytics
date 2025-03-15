
import { createContext, useContext, useState, ReactNode } from "react";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImportContextType {
  importedData: any[];
  metrics: any;
  isUploading: boolean;
  processAndUploadData: (data: any[]) => Promise<void>;
}

const ImportContext = createContext<ImportContextType | undefined>(undefined);

export function ImportProvider({ children }: { children: ReactNode }) {
  const [importedData, setImportedData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const processAndUploadData = async (data: any[]) => {
    try {
      setIsUploading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to upload data");
      }
      
      // Transform data to match database schema
      const transformedData = data.map(row => ({
        date: row.Date,
        impressions: parseInt(row.Impressions) || 0,
        clicks: parseInt(row.Clicks) || 0,
        amount_spent: parseFloat(row.Spend?.replace('$', '').replace(',', '')) || 0,
        total_ad_sales: parseFloat(row["Total Sales"]?.replace('$', '').replace(',', '')) || 0,
        total_ad_orders: parseInt(row.Orders) || 0,
        campaign_name: row["Campaign Name"],
        ad_group_name: row["Ad Group Name"],
        advertised_asin: row["Advertised ASIN"],
        advertised_sku: row["Advertised SKU"],
        keyword: row.Keyword,
        search_term: row["Search Term"],
        account_id: user.id
      }));

      // Upload to Supabase
      const { error } = await supabase
        .from('amazon_ads_metrics')
        .insert(transformedData);

      if (error) throw error;

      // Update local state
      setImportedData(transformedData);
      const calculatedMetrics = calculateMetrics(transformedData);
      setMetrics(calculatedMetrics);
      
      toast({
        title: "Data imported successfully",
        description: `${transformedData.length} rows processed and uploaded`,
      });
    } catch (error: any) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: error.message,
        variant: "destructive",
      });
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
