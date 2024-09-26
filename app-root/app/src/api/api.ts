import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createOrder = async (order: any) => {
  try {
    const response = await axios.post(`${API_URL}/order`, order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/order/latest`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw error;
  }
};
