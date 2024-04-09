import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }:any) => {
  const chartData = {
    labels: data.timestamp.map((timestamp:any) => new Date(timestamp * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Stock Price',
        data: data.close,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;