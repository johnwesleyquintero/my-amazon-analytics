
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MetricsTableProps {
  metrics?: Array<{ [key: string]: number | string }> | {};
  headers?: string[];
  rows?: Array<{ [key: string]: number | string }>;
}

export function MetricsTable({ metrics, headers, rows }: MetricsTableProps) {
  // If we're using the new rows/headers API
  if (rows && headers) {
    return (
      <Table className="bg-white">
        <TableCaption className="text-gray-800">A list of your metrics.</TableCaption>
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
                <TableCell key={cellIndex} className="text-gray-800">{value}</TableCell>
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
      <TableCaption className="text-gray-800">A list of your metrics.</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header} className="text-gray-900 font-semibold">{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {metricsArray.map((metric, index) => (
          <TableRow key={index} className="border-b border-gray-200">
            {tableHeaders.map((header) => (
              <TableCell key={header} className="text-gray-800">{metric[header]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
