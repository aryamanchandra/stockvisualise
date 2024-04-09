import axios from 'axios';

const API_BASE_URL = 'https://api.twelvedata.com';

export const fetchStockData = async (symbol:any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?symbols=${symbol}&range=1y&interval=1d`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};