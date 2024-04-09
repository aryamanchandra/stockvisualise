"use client";
import React, { useState } from "react";
import { fetchStockData } from "./utils/api";
import LineChart from "./components/LineChart";
import styles from "./page.module.css";

const Home = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState(null);

  const handleSearch = async () => {
    const data = await fetchStockData(stockSymbol);
    setStockData(data);
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Search for your stock</h1>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {stockData && (
        <div className={styles.chartContainer}>
          <h2>Line Chart</h2>
          <LineChart data={stockSymbol} />
        </div>
      )}
    </div>
  );
};

export default Home;
