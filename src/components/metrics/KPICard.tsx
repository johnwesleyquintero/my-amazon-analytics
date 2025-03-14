
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
      "bg-white text-gray-800 hover:bg-gray-50 transition-all p-4 border border-gray-200 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      </div>
      <div className="text-2xl font-bold mb-2 text-gray-900">{value}</div>
      {trend !== undefined && (
        <div className={cn(
          "text-sm font-medium",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? "+" : ""}{trend}%
        </div>
      )}
    </Card>
  );
}
