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
    return <p>No data available.</p>;
  }

  const headers = Object.keys(metrics[0]);

  return (
    <Table>
      <TableCaption>A list of your expenses.</TableCaption>
      <TableHeader>
        {headers.map((header) => (
          <TableHead key={header}>{header}</TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {metrics.map((metric, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header}>{metric[header]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}