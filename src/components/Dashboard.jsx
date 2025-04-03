
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [kpiData, setKpiData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        // For now, use mock data instead of actual API call
        const mockCampaigns = {
          totalSales: 124500,
          avgConversionRate: 10.5,
          topPerformingCampaign: "Summer Sale 2025",
          weeklyPerformance: [
            { week: "Week 1", totalSales: 25000 },
            { week: "Week 2", totalSales: 28000 },
            { week: "Week 3", totalSales: 35500 },
            { week: "Week 4", totalSales: 36000 }
          ]
        };

        // Transform API data into KPI format
        const transformedKpis = [
          { name: 'Total Sales', value: mockCampaigns.totalSales },
          { name: 'Conversion Rate', value: mockCampaigns.avgConversionRate },
          { name: 'Top Campaign', value: mockCampaigns.topPerformingCampaign },
        ];

        // Transform API data into chart format
        const transformedChart = mockCampaigns.weeklyPerformance.map(week => ({
          name: week.week,
          sales: week.totalSales
        }));

        setKpiData(transformedKpis);
        setChartData(transformedChart);
        setLoading(false);
      } catch (err) {
        setError('Failed to load campaign data');
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#F5F5F5' }}>
        <Typography variant="h5">Loading data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#F5F5F5' }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#F5F5F5' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#333333' }}>
        Campaign Analytics Dashboard
      </Typography>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {kpiData.map((kpi) => (
          <Card key={kpi.name} style={{ backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="h6" style={{ color: '#0073E6' }}>{kpi.name}</Typography>
              <Typography variant="h4" style={{ color: '#FFD400', marginTop: '8px' }}>
                {typeof kpi.value === 'number' ? `$${kpi.value.toLocaleString()}` : kpi.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: '24px', backgroundColor: '#FFFFFF' }}>
        <CardContent>
          <Typography variant="h6" style={{ color: '#333333', marginBottom: '16px' }}>
            Sales Performance
          </Typography>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="sales"
                  fill="#FFD400"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
