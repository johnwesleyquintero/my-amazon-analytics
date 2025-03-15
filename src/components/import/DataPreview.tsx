
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useImport } from "@/contexts/ImportContext";

export function DataPreview() {
  const { importedData } = useImport();

  if (importedData.length === 0) {
    return null;
  }

  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Raw Data Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {Object.keys(importedData[0]).map((header) => (
                  <th key={header} className="px-4 py-2 text-left border-b border-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {importedData.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell: any, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border-b border-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {importedData.length > 5 && (
          <p className="text-sm text-gray-400 mt-2">
            Showing first 5 rows of {importedData.length} total rows
          </p>
        )}
      </CardContent>
    </Card>
  );
}
