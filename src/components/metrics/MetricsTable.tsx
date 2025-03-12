import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TableFilter } from "@/components/ui/table-filter";
import { useState } from "react";

interface MetricsTableProps {
  headers: string[];
  rows: Array<Record<string, string | number>>;
  className?: string;
}

export function MetricsTable({ headers, rows, className }: MetricsTableProps) {
  const [filteredRows, setFilteredRows] = useState(rows);

  return (
    <div className={cn("overflow-x-auto space-y-4", className)}>
      <TableFilter
        headers={headers}
        data={rows}
        onFilter={setFilteredRows}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-gray-400">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex} className="font-medium">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}