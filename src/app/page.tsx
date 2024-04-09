"use client";
import React, { useState } from "react";
import { fetchStockData } from "./utils/api";
import LineChart from "./components/LineChart";
import styles from "./page.module.css";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Home = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState("");

  const handleSearch = async () => {
    // const data = await fetchStockData(stockSymbol);
    setStockData(stockSymbol);
  };

  return (
    <Box sx={{padding: 5}}>
      <Typography variant="h3" className={styles.heading}>
        Search for your stock
      </Typography>
      <Box sx={{ display: "flex", paddingTop:"20px"}}>
        <Stack direction="row" sx={{marginX: "auto" }} gap={2}>
          <TextField
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            placeholder="Enter stock symbol"
            variant="outlined"
            label="Stock Symbol"
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </Box>

      {stockData && (
        <div className={styles.chartContainer}>
          <LineChart
            stockString={stockSymbol}
            setStockSymbol={setStockSymbol}
          />
        </div>
      )}
    </Box>
  );
};

export default Home;
