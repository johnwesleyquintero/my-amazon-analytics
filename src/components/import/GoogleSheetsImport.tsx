
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "lucide-react";
import { useImport } from "@/contexts/ImportContext";
import { fetchGoogleSheetData } from "@/utils/dataImportUtils";

export function GoogleSheetsImport() {
  const [sheetUrl, setSheetUrl] = useState("");
  const { isUploading, processAndUploadData } = useImport();

  const handleGoogleSheetImport = async () => {
    if (!sheetUrl) return;
    
    try {
      const data = await fetchGoogleSheetData(sheetUrl);
      processAndUploadData(data);
    } catch (error) {
      console.error("Import error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Paste Google Sheets URL"
          className="flex-1 bg-spotify-darker border-gray-700"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          disabled={isUploading}
        />
        <Button 
          variant="secondary" 
          disabled={isUploading}
          onClick={handleGoogleSheetImport}
        >
          <Table className="w-4 h-4 mr-2" />
          Import
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Make sure your Google Sheet is publicly accessible (View access)
      </p>
    </div>
  );
}
