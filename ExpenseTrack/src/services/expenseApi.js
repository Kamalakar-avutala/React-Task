import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const expenseApi = {
  // Get all expenses
  getAllExpenses: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new expense
  addExpense: async (expenseData) => {
    try {
      const response = await axios.post(`${BASE_URL}/expenses`, expenseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    try {
      const response = await axios.put(`${BASE_URL}/expenses/${id}`, expenseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
};
