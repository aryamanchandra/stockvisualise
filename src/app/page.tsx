"use client"
import React, { useState } from 'react';
import { fetchStockData } from './utils/api';
import LineChart from './components/LineChart';
import styles from './page.module.css';

const Home = () => {
  const [stockSymbol, setStockSymbol] = useState('AMZN');
  const [stockData, setStockData] = useState("");

  const handleSearch = async () => {
    // const data = await fetchStockData(stockSymbol);
    setStockData(stockSymbol);
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search for your stock</h1>
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
          <LineChart stockString={stockSymbol} setStockSymbol={setStockSymbol} />
        </div>
      )}
    </div>
  );
};

export default Home;