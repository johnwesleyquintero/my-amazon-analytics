
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, icon, className }: MetricCardProps) {
  const isPositive = trend > 0;
  
  return (
    <div className={cn(
      "rounded-lg bg-spotify-light p-4 text-white hover:bg-opacity-80 transition-all",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={cn(
        "text-sm",
        isPositive ? "text-green-500" : "text-red-500"
      )}>
        {isPositive ? "+" : ""}{trend}%
      </div>
    </div>
  );
}
