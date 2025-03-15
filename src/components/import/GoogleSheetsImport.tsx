
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "lucide-react";
import Papa from "papaparse";
import { useImport } from "@/contexts/ImportContext";

export function GoogleSheetsImport() {
  const [sheetUrl, setSheetUrl] = useState("");
  const { isUploading, processAndUploadData } = useImport();

  const handleGoogleSheetImport = () => {
    if (!sheetUrl) return;
    
    const sheetId = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!sheetId) {
      throw new Error("Invalid Google Sheets URL");
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    fetch(csvUrl)
      .then(response => response.text())
      .then(data => {
        const results = Papa.parse(data, { header: true });
        processAndUploadData(results.data);
      })
      .catch(error => {
        console.error("Import error:", error);
        throw error;
      });
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
