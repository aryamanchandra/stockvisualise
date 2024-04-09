"use client"
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

function LineChart() {
  const [stock, setStock] = useState<any>();
  const [stockSymbol, setStockSymbol] = useState<String>("AAPL");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const API_KEY = "2Y1GEJVM1KB8PPG0";
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`
        );
        setStock(response.data["Time Series (Daily)"]);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  const dates = stock ? Object.keys(stock) : [];
  const closingPrices = dates.map((date) =>
    parseFloat(stock[date]["4. close"] || 0)
  );

  return (
    <center>
      <h2>Stock Chart</h2>
      <Plot
        data={[
          {
            x: dates,
            y: closingPrices,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 800,
          height: 500,
          title: "Stock Market Prices",
        }}
      />
    </center>
  );
}

export default LineChart;
