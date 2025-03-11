import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CampaignPerformanceProps {
  data: Array<{
    period: string;
    spend: number;
    sales: number;
    roas: number;
  }>;
}

export function CampaignPerformanceChart({ data }: CampaignPerformanceProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Campaign Performance</CardTitle>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="period" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              labelStyle={{ color: '#888' }}
            />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Spend" />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales" />
            <Line type="monotone" dataKey="roas" stroke="#ffc658" name="ROAS" />
          </LineChart>
        </div>
      </CardContent>
    </Card>
  );
}