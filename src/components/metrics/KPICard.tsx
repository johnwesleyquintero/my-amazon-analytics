import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: LucideIcon;
  className?: string;
}

export function KPICard({ title, value, trend, icon: Icon, className }: KPICardProps) {
  const isPositive = trend && trend > 0;
  
  return (
    <Card className={cn(
      "bg-spotify-light text-white hover:bg-opacity-80 transition-all p-4",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      {trend !== undefined && (
        <div className={cn(
          "text-sm",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? "+" : ""}{trend}%
        </div>
      )}
    </Card>
  );
}