
import Papa from 'papaparse';

/**
 * Processes CSV data from various sources
 * @param file - CSV file to process
 * @param callback - Callback function to handle processed data
 */
export const processCsvFile = (file: File, callback: (data: any[]) => void): void => {
  Papa.parse(file, {
    complete: (results) => {
      callback(results.data);
    },
    header: true,
    skipEmptyLines: true,
  });
};

/**
 * Fetches and processes Google Sheet data
 * @param sheetUrl - URL of the Google Sheet
 * @returns Promise with processed data
 */
export const fetchGoogleSheetData = async (sheetUrl: string): Promise<any[]> => {
  const sheetId = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!sheetId) {
    throw new Error("Invalid Google Sheets URL");
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
  try {
    const response = await fetch(csvUrl);
    const text = await response.text();
    const results = Papa.parse(text, { header: true });
    return results.data;
  } catch (error) {
    console.error("Google Sheets import error:", error);
    throw error;
  }
};

/**
 * Validates imported data to ensure it has the required fields
 * @param data - Data to validate
 * @returns Validated data or throws error
 */
export const validateImportData = (data: any[]): any[] => {
  // Remove empty rows
  const filteredData = data.filter(row => 
    row && Object.values(row).some(val => val !== null && val !== '')
  );
  
  if (filteredData.length === 0) {
    throw new Error("No valid data found in the import");
  }
  
  return filteredData;
};
