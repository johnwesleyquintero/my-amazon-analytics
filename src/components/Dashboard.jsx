import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const theme = useTheme();

  const [kpiData, setKpiData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        const campaigns = response.data;

        // Transform API data into KPI format
        const transformedKpis = [
          { name: 'Total Sales', value: campaigns.totalSales },
          { name: 'Conversion Rate', value: campaigns.avgConversionRate },
          { name: 'Top Campaign', value: campaigns.topPerformingCampaign },
        ];

        // Transform API data into chart format
        const transformedChart = campaigns.weeklyPerformance.map(week => ({
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
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
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