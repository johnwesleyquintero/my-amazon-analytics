import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SearchTermAnalysisProps {
  data: Array<{
    searchTerm: string;
    impressions: number;
    clicks: number;
    spend: number;
    sales: number;
    conversionRate: number;
  }>;
}

export function SearchTermAnalysis({ data }: SearchTermAnalysisProps) {
  // Sort by impressions to show most impactful terms first
  const sortedData = [...data].sort((a, b) => b.impressions - a.impressions);

  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Search Terms Analysis</CardTitle>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Search Term</TableHead>
                <TableHead className="text-gray-400">Impressions</TableHead>
                <TableHead className="text-gray-400">Clicks</TableHead>
                <TableHead className="text-gray-400">Spend</TableHead>
                <TableHead className="text-gray-400">Sales</TableHead>
                <TableHead className="text-gray-400">Conv. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.slice(0, 10).map((term, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{term.searchTerm}</TableCell>
                  <TableCell>{term.impressions.toLocaleString()}</TableCell>
                  <TableCell>{term.clicks.toLocaleString()}</TableCell>
                  <TableCell>${term.spend.toLocaleString()}</TableCell>
                  <TableCell>${term.sales.toLocaleString()}</TableCell>
                  <TableCell>{term.conversionRate.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}