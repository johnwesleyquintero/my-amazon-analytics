import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Sample data for the ad spend chart
 * Each data point represents monthly ad spend values
 */
const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

/**
 * AdSpendChart Component
 * 
 * A responsive area chart component that visualizes advertising spend over time.
 * Uses Recharts library to create a gradient-filled area chart with monthly data points.
 * 
 * Features:
 * - Responsive container that adapts to parent width
 * - Gradient fill effect for visual appeal
 * - Dollar value formatting for Y-axis
 * - Interactive tooltip for data point inspection
 * 
 * @component
 * @example
 * return (
 *   <div className="dashboard-widget">
 *     <AdSpendChart />
 *   </div>
 * )
 */
export function AdSpendChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ED760" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1ED760" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1ED760"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}