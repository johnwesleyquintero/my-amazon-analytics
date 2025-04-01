
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our metrics
export type MetricCalculation = {
  impressions?: number;
  clicks?: number;
  spend?: number;
  totalSales?: number;
  totalOrders?: number;
  ctr?: number;
  conversionRate?: number;
  roas?: number;
};

// Define a type for import context
interface ImportContextType {
  importedData: any[];
  setImportedData: React.Dispatch<React.SetStateAction<any[]>>;
  metrics: MetricCalculation | null;
  setMetrics: React.Dispatch<React.SetStateAction<MetricCalculation | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUploading: boolean;
  processAndUploadData: (data: any[]) => void;
  handleCsvData: (data: any[]) => void;
  handleGoogleSheetsData: (data: any[]) => void;
  calculateMetrics: (data: any[]) => void;
}

// Create the context with a default value
const ImportContext = createContext<ImportContextType | undefined>(undefined);

// Provider component
export const ImportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [importedData, setImportedData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<MetricCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Process and upload data (common function for both CSV and Google Sheets)
  const processAndUploadData = (data: any[]) => {
    setIsUploading(true);
    try {
      // Process data - remove empty rows, etc.
      const processedData = data.filter(row => 
        row && Object.values(row).some(val => val !== null && val !== '')
      );
      
      setImportedData(processedData);
      calculateMetrics(processedData);
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle CSV data import
  const handleCsvData = (data: any[]) => {
    setIsLoading(true);
    processAndUploadData(data);
    setIsLoading(false);
  };

  // Function to handle Google Sheets data import
  const handleGoogleSheetsData = (data: any[]) => {
    setIsLoading(true);
    processAndUploadData(data);
    setIsLoading(false);
  };

  // Calculate metrics from the imported data
  const calculateMetrics = (data: any[]) => {
    if (!data || data.length === 0) {
      setMetrics(null);
      return;
    }

    // Extract metrics from the data
    // This is a simplified example - adjust based on your actual data structure
    const totalImpressions = data.reduce((sum, row) => sum + (Number(row.impressions) || 0), 0);
    const totalClicks = data.reduce((sum, row) => sum + (Number(row.clicks) || 0), 0);
    const totalSpend = data.reduce((sum, row) => sum + (Number(row.spend) || 0), 0);
    const totalSales = data.reduce((sum, row) => sum + (Number(row.sales) || 0), 0);
    const totalOrders = data.reduce((sum, row) => sum + (Number(row.orders) || 0), 0);

    // Calculate derived metrics
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalOrders / totalClicks) * 100 : 0;
    const roas = totalSpend > 0 ? totalSales / totalSpend : 0;

    // Update metrics state
    setMetrics({
      impressions: totalImpressions,
      clicks: totalClicks,
      spend: totalSpend,
      totalSales: totalSales,
      totalOrders: totalOrders,
      ctr: ctr,
      conversionRate: conversionRate,
      roas: roas,
    });
  };

  return (
    <ImportContext.Provider
      value={{
        importedData,
        setImportedData,
        metrics,
        setMetrics,
        isLoading,
        setIsLoading,
        isUploading,
        processAndUploadData,
        handleCsvData,
        handleGoogleSheetsData,
        calculateMetrics,
      }}
    >
      {children}
    </ImportContext.Provider>
  );
};

// Custom hook to use the import context
export const useImport = () => {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error('useImport must be used within an ImportProvider');
  }
  return context;
};
