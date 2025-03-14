
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
  metrics: Array<{ [key: string]: number | string }>;
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  if (!metrics || metrics.length === 0) {
    return <p className="text-gray-800">No data available.</p>;
  }

  const headers = Object.keys(metrics[0]);

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
        {metrics.map((metric, index) => (
          <TableRow key={index} className="border-b border-gray-200">
            {headers.map((header) => (
              <TableCell key={header} className="text-gray-800">{metric[header]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
