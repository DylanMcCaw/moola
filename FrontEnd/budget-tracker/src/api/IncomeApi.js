import { ApiClient } from './ApiClient';

const IncomeApi = {

  // GET /api/Income/{id}
  getIncomeById: async (id) => {
    try {
      const response = await ApiClient.get(`/Income/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Income by ID:', error);
      throw error;
    }
  },

  // DELETE /api/Income/{id}
  deleteIncomeById: async (id) => {
    try {
      const response = await ApiClient.delete(`/Income/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Income by ID:', error);
      throw error;
    }
  },

  // GET /api/Income/User/{id}
  getIncomesByUserId: async (userId) => {
    try {
      const response = await ApiClient.get(`/Income/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Incomes by user ID:', error);
      throw error;
    }
  },

  // POST /api/Income
  createIncome: async (IncomeData) => {
    try {
      const response = await ApiClient.post('/Income', IncomeData);
      return response.data;
    } catch (error) {
      console.error('Error creating Income:', error);
      throw error;
    }
  },

    // PUT /api/Income/{id}
    updateIncome: async (id, updatedIncomeData) => {
      try {
        const response = await ApiClient.put(`/Income/${id}`, updatedIncomeData);
        return response.data;
      } catch (error) {
        console.error('Error updating income:', error);
        throw error;
      }
    },
};




export default IncomeApi;
