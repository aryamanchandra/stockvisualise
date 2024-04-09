import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

interface LineChartProps {
  stockString: string;
  setStockSymbol: (symbol: string) => void;
}

function LineChart({ stockString, setStockSymbol }: LineChartProps) {
  const [stock, setStock] = useState<any>();

  useEffect(() => {
    setStockSymbol(stockString);

    const fetchStockData = async () => {
      try {
        const API_KEY = '2Y1GEJVM1KB8PPG0';
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockString}&apikey=${API_KEY}`
        );
        setStock(response.data['Time Series (Daily)']);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    if (stockString){
    fetchStockData();}
  }, [stockString, setStockSymbol]);

  const dates = stock ? Object.keys(stock) : [];
  const closingPrices: any = dates.map((date) => parseFloat(stock[date]['4. close'] || 0));

  return (
    <center>
      <h2>Stock Chart</h2>
      <Plot
        data={[
          {
            x: dates,
            y: closingPrices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: 'blue',
            },
          },
        ]}
        layout={{
          width: 800,
          height: 500,
          title:  `${stockString}`,
        }}
      />
    </center>
  );
}

export default LineChart;