import React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface TableFilterProps {
  headers: string[];
  data: Array<Record<string, string | number>>;
  onFilter: (filteredData: Array<Record<string, string | number>>) => void;
}

export function TableFilter({ headers, data, onFilter }: TableFilterProps) {
  const [filters, setFilters] = React.useState<Record<string, string>>({});

  const handleFilterChange = (header: string, value: string) => {
    const newFilters = { ...filters, [header]: value };
    setFilters(newFilters);

    const filteredData = data.filter(row => {
      return Object.entries(newFilters).every(([key, filterValue]) => {
        const cellValue = String(row[key]).toLowerCase();
        return filterValue === '' || cellValue.includes(filterValue.toLowerCase());
      });
    });

    onFilter(filteredData);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'exported-data.xlsx');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {headers.map((header) => (
            <div key={header} className="flex-1 min-w-[200px]">
              <Input
                placeholder={`Filter ${header}...`}
                value={filters[header] || ''}
                onChange={(e) => handleFilterChange(header, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}