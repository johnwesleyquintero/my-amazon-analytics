
export const extractSpreadsheetId = (url: string): string | undefined => {
  try {
    return url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  } catch (error) {
    console.error('Error parsing sheet URL:', error);
    return undefined;
  }
};

export const testSpreadsheetConnection = async (spreadsheetId: string): Promise<boolean> => {
  try {
    // First check if the sheet is publicly accessible
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);
    if (!response.ok) {
      throw new Error('Unable to access the spreadsheet. Please make sure it\'s publicly accessible (View access) and try again.');
    }

    // Try to fetch the CSV
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
    const csvResponse = await fetch(csvUrl);
    
    if (!csvResponse.ok) {
      throw new Error('Failed to access spreadsheet data. Please ensure the sheet is publicly accessible.');
    }

    return true;
  } catch (error) {
    throw error;
  }
};
