import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardHeaderProps {
  searchQuery: string;
  dateRange: string;
  onSearchChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
}

export function DashboardHeader({
  searchQuery,
  dateRange,
  onSearchChange,
  onDateRangeChange,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Insights Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Track and analyze your Amazon advertising performance</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
        <form className="flex gap-2">
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="max-w-[300px] border-gray-300"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <Select
          value={dateRange}
          onValueChange={onDateRangeChange}
        >
          <SelectTrigger className="w-[180px] border-gray-300">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}