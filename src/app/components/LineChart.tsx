import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import createPlotlyComponent from "react-plotly.js/factory";
import { Plots } from "plotly.js";

interface LineChartProps {
  stockString: string;
  setStockSymbol: (symbol: string) => void;
}

function LineChart({ stockString, setStockSymbol }: LineChartProps) {
  const [stock, setStock] = useState<any>();
  const [timeperiod, setTimePeriod] = useState("DAILY");
  // const [closingPrices, setClosingPrices] = useState();
  // const [volumes, setVolumes] = useState();
  // const [dates, setDates] = useState<any>();

  useEffect(() => {
    Plots.resize("plotlyChart");
  }, []);

  useEffect(() => {
    setStockSymbol(stockString);

    const fetchStockData = async () => {
      try {
        const API_KEY = "demo";
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_${timeperiod}&symbol=${stockString}&apikey=${API_KEY}`
        );
        if (timeperiod == "DAILY") {
          setStock(response.data[`Time Series (Daily)`]);
        } else if (timeperiod == "MONTHLY") {
          setStock(response.data[`Monthly Time Series`]);
        } else if (timeperiod == "WEEKLY") {
          setStock(response.data[`Weekly Time Series`]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    if (stockString) {
      fetchStockData();
    }
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

  const dates = stock ? Object.keys(stock) : [];
  const closingPrices: any = dates.map((date) =>
    parseFloat(stock[date]["4. close"] || 0)
  );
  const volumes: any = dates.map((date) =>
    parseInt(stock[date]["5. volume"] || 0)
  );

  return (
    <Box>
      <Box sx={{ display: "flex", paddingTop: "40px", paddingBottom:"20px" }}>
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
        <Typography variant="h5">CandleStick Chart</Typography>
        <Plot
          divId="plotlyChart"
          data={[
            {
              x: dates,
              open: dates.map((date) =>
                parseFloat(stock[date]["1. open"] || 0)
              ),
              close: dates.map((date) =>
                parseFloat(stock[date]["4. close"] || 0)
              ),
              high: dates.map((date) =>
                parseFloat(stock[date]["2. high"] || 0)
              ),
              low: dates.map((date) => parseFloat(stock[date]["3. low"] || 0)),
              type: "candlestick",
              increasing: { line: { color: "green" } },
              decreasing: { line: { color: "red" } },
            },
          ]}
          layout={{
            // width: 800,
            // height: 500,
            title: `${stockString}`,
          }}
          useResizeHandler={true}
          style={{ width: "80%", height: "50%" }}
        />
        <Typography variant="h5">Line Chart</Typography>
        <Plot
          divId="plotlyChart"
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
            // width: 800,
            // height: 500,
            title: `${stockString}`,
          }}
          useResizeHandler={true}
          style={{ width: "80%", height: "50%" }}
        />
        <Typography variant="h5">Volume Chart</Typography>
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
            // width: 800,
            // height: 500,
            title: "Stock Volume",
            xaxis: {
              title: "Date",
            },
            yaxis: {
              title: "Volume",
            },
          }}
          useResizeHandler={true}
          style={{ width: "80%", height: "auto" }}
        />
      </center>
    </Box>
  );
}

export default LineChart;
