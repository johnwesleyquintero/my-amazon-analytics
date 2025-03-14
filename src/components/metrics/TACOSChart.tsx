
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TacosDataPoint {
  date: string;
  acos: number;
  tacos: number;
}

interface TACOSChartProps {
  data: TacosDataPoint[];
}

export function TACOSChart({ data }: TACOSChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">ACoS & TACoS Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-700">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">ACoS & TACoS Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="acos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tacos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BE123C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#BE123C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis 
                stroke="#64748B"
                tickFormatter={(value) => `${value}%`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderColor: '#E2E8F0', color: '#334155' }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="acos" 
                stroke="#1E40AF" 
                fillOpacity={1} 
                fill="url(#acos)" 
                name="ACoS"
              />
              <Area 
                type="monotone" 
                dataKey="tacos" 
                stroke="#BE123C" 
                fillOpacity={1} 
                fill="url(#tacos)" 
                name="TACoS"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-800"></div>
            <span className="text-sm text-gray-700">ACoS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-700"></div>
            <span className="text-sm text-gray-700">TACoS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
