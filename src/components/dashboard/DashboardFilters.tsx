import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DashboardFiltersProps {
  onFilterChange: (filters: {
    dateRange: string;
    marketplace: string;
    category: string;
  }) => void;
}

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [date, setDate] = useState<Date>();
  const [marketplace, setMarketplace] = useState("all");
  const [category, setCategory] = useState("all");

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      dateRange: date ? format(date, "yyyy-MM-dd") : "all",
      marketplace,
      category,
      [key]: value,
    };
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate) {
                handleFilterChange("dateRange", format(newDate, "yyyy-MM-dd"));
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={marketplace}
        onValueChange={(value) => {
          setMarketplace(value);
          handleFilterChange("marketplace", value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select marketplace" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Marketplaces</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={category}
        onValueChange={(value) => {
          setCategory(value);
          handleFilterChange("category", value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="home">Home & Kitchen</SelectItem>
          <SelectItem value="fashion">Fashion</SelectItem>
          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}