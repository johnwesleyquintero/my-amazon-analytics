
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatPercent } from "@/lib/core-utils";

interface MetricsTableProps {
  metrics?: Array<{ [key: string]: number | string }> | null;
  headers?: string[];
  rows?: Array<{ [key: string]: number | string }>;
  caption?: string;
}

export function MetricsTable({ metrics, headers, rows, caption = "Metrics Data" }: MetricsTableProps) {
  // If we're using the new rows/headers API
  if (rows && headers) {
    if (!rows.length) {
      return <p className="text-center py-4">No data available.</p>;
    }
    
    return (
      <Table className="bg-white">
        <TableCaption className="text-gray-800">{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="text-gray-900 font-semibold">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex} className="text-gray-800">
                  {formatCellValue(value)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // Ensure metrics is an array and not empty
  const metricsArray = Array.isArray(metrics) ? metrics : [];
  if (metricsArray.length === 0) {
    return <p className="text-gray-800">No data available.</p>;
  }

  const tableHeaders = Object.keys(metricsArray[0]);

  return (
    <Table className="bg-white">
      <TableCaption className="text-gray-800">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header} className="text-gray-900 font-semibold">
              {formatHeaderText(header)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {metricsArray.map((metric, index) => (
          <TableRow key={index} className="border-b border-gray-200">
            {tableHeaders.map((header) => (
              <TableCell key={header} className="text-gray-800">
                {formatCellValue(metric[header])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Helper function to format cell values
function formatCellValue(value: any): string | number | React.ReactNode {
  if (value === undefined || value === null) {
    return '-';
  }
  
  // Format currency values (if the value seems like a currency and is a number)
  if (typeof value === 'number') {
    if (String(value).includes('.') || (String(value).length > 3 && !String(value).includes('%'))) {
      return formatCurrency(value);
    }
    
    // Format percentages (if the value seems like a percentage)
    if (String(value).includes('%') || (value >= 0 && value <= 100 && String(value).length <= 5)) {
      return formatPercent(value);
    }
  }
  
  return value;
}

// Helper function to format header text
function formatHeaderText(header: string): string {
  return header
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
