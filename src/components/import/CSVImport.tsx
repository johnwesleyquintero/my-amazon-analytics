
import { Input } from "@/components/ui/input";
import { FileSpreadsheet } from "lucide-react";
import { useImport } from "@/contexts/ImportContext";
import { processCsvFile } from "@/utils/dataImportUtils";

export function CSVImport() {
  const { isUploading, processAndUploadData } = useImport();

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processCsvFile(file, processAndUploadData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="csv-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-spotify-darker/50 relative"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <>
                <FileSpreadsheet className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">CSV files only</p>
              </>
            )}
          </div>
          <Input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
