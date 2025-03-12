import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TACOSChartProps {
  data: Array<{
    date: string;
    acos: number;
    tacos: number;
  }>;
}

export function TACOSChart({ data }: TACOSChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>TACOS Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="acos" stroke="#2563eb" name="ACoS" />
              <Line type="monotone" dataKey="tacos" stroke="#64748b" name="TACoS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}