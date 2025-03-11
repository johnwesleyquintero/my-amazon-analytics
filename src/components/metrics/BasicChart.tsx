// src/components/metrics/BasicChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BasicChartProps {
  labels: string[];
  data: number[];
  title?: string;
}

const BasicChart: React.FC<BasicChartProps> = ({ labels, data, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Data',
        data: data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BasicChart;