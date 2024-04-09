import React, { useState } from 'react';
import { fetchStockData } from './utils/api';
import LineChart from './components/LineChart';


const Home = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState(null);

  const handleSearch = async () => {
    const data = await fetchStockData(stockSymbol);
    setStockData(data);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {stockData && (
        <div>
          <h2>Line Chart</h2>
          <LineChart data={stockData} />
        </div>
      )}
    </div>
  );
};

export default Home;