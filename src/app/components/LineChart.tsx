import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { Box, Button, Stack } from "@mui/material";

interface LineChartProps {
  stockString: string;
  setStockSymbol: (symbol: string) => void;
}

function LineChart({ stockString, setStockSymbol }: LineChartProps) {
  const [stock, setStock] = useState<any>();
  const [timeperiod, setTimePeriod] = useState("DAILY");
  const [closingPrices, setClosingPrices] = useState();
  const [volumes, setVolumes] = useState();
  const [dates, setDates] = useState<any>();

  useEffect(() => {
    setStockSymbol(stockString);

    const fetchStockData = async () => {
      try {
        const API_KEY = "demo";
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_${timeperiod}&symbol=${stockString}&apikey=${API_KEY}`
        );
        console.log(response);
        if (timeperiod == "DAILY") {
          setStock(response.data[`Time Series (${timeperiod})`]);
        } else {
          setStock(response.data[`${timeperiod} Time Series`]);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    if (stockString) {
      fetchStockData();
    }
    const time = stock ? Object.keys(stock) : [];
    setDates(time)
    const closing: any = time.map((date) =>
      parseFloat(stock[date]["4. close"] || 0)
    );
    setClosingPrices(closing);

    const volume: any = time.map((date) =>
      parseInt(stock[date]["5. volume"] || 0)
    );

    setVolumes(volume);
  }, [stockString, setStockSymbol, timeperiod]);

  const handleTime = (timeperiod: string) => {
    if (timeperiod === "DAILY") {
      setTimePeriod("DAILY");
    } else if (timeperiod === "WEEKLY") {
      setTimePeriod("WEEKLY");
    } else if (timeperiod === "MONTHLY") {
      setTimePeriod("MONTHLY");
    } else {
      console.log("error");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", paddingTop: "40px" }}>
        <Stack direction="row" spacing={2} sx={{ marginX: "auto" }}>
          <Button variant="outlined" onClick={() => handleTime("DAILY")}>
            Daily
          </Button>
          <Button variant="outlined" onClick={() => handleTime("WEEKLY")}>
            Weekly
          </Button>
          <Button variant="outlined" onClick={() => handleTime("MONTHLY")}>
            Monthly
          </Button>
        </Stack>
      </Box>
      <center>
        <h2>Stock Chart</h2>
        <Plot
          data={[
            {
              x: dates,
              y: closingPrices,
              type: "scatter",
              mode: "lines+markers",
              marker: {
                color: "blue",
              },
            },
          ]}
          layout={{
            width: 800,
            height: 500,
            title: `${stockString}`,
          }}
        />
      </center>
      <center>
        <h2>Stock Volume Chart</h2>
        <Plot
          data={[
            {
              x: dates,
              y: volumes,
              type: "bar",
              marker: {
                color: "blue",
              },
            },
          ]}
          layout={{
            width: 800,
            height: 500,
            title: "Stock Volume",
            xaxis: {
              title: "Date",
            },
            yaxis: {
              title: "Volume",
            },
          }}
        />
      </center>
    </Box>
  );
}

export default LineChart;
