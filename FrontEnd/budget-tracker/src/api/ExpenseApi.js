import { ApiClient } from './ApiClient';

const ExpenseApi = {

  // GET /api/Expense/{id}
  getExpenseById: async (id) => {
    try {
      const response = await ApiClient.get(`/Expense/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense by ID:', error);
      throw error;
    }
  },

  // DELETE /api/Expense/{id}
  deleteExpenseById: async (id) => {
    try {
      const response = await ApiClient.delete(`/Expense/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting expense by ID:', error);
      throw error;
    }
  },

  // GET /api/Expense/User/{id}
  getExpensesByUserId: async (userId) => {
    try {
      const response = await ApiClient.get(`/Expense/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses by user ID:', error);
      throw error;
    }
  },

  // POST /api/Expense
  createExpense: async (expenseData) => {
    try {
      const response = await ApiClient.post('/Expense', expenseData);
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  // PUT /api/Expense/{id}
  updateExpense: async (id, updatedExpenseData) => {
    try {
      const response = await ApiClient.put(`/Expense/${id}`, updatedExpenseData);
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },
};

export default ExpenseApi;
