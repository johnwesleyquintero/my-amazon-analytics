
import { DollarSign, TrendingUp, ShoppingCart, BarChart } from "lucide-react";
import { KPICard } from "./KPICard";

interface KPISectionProps {
  totalSales: number;
  totalOrders: number;
  roas: number;
  conversionRate: number;
}

export function KPISection({ totalSales, totalOrders, roas, conversionRate }: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Sales"
        value={`$${totalSales.toLocaleString()}`}
        trend={10}
        icon={DollarSign}
      />
      <KPICard
        title="ROAS"
        value={`${roas.toFixed(2)}x`}
        trend={5}
        icon={TrendingUp}
      />
      <KPICard
        title="Total Orders"
        value={totalOrders.toString()}
        trend={15}
        icon={ShoppingCart}
      />
      <KPICard
        title="Conversion Rate"
        value={`${conversionRate.toFixed(2)}%`}
        trend={8}
        icon={BarChart}
      />
    </div>
  );
}
