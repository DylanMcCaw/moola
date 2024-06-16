import { ApiClient } from './ApiClient';

const SavingsApi = {

  // GET /api/Savings/{id}
  getSavingsPotById: async (id) => {
    try {
      const response = await ApiClient.get(`/Savings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching savings pot by ID:', error);
      throw error;
    }
  },

  // DELETE /api/Savings/{id}
  deleteSavingsPotById: async (id) => {
    try {
      const response = await ApiClient.delete(`/Savings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting savings pot by ID:', error);
      throw error;
    }
  },

  // GET /api/Savings/User/{id}
  getSavingsPotsByUserId: async (userId) => {
    try {
      const response = await ApiClient.get(`/Savings/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching savings pots by user ID:', error);
      throw error;
    }
  },

  // POST /api/Savings
  createSavingsPot: async (savingsData) => {
    try {
      const response = await ApiClient.post('/Savings', savingsData);
      return response.data;
    } catch (error) {
      console.error('Error creating savings pot:', error);
      throw error;
    }
  },

  // PUT /api/Savings/{id}
  updateSavingsPot: async (id, updatedSavingsData) => {
    try {
      const response = await ApiClient.put(`/Savings/${id}`, updatedSavingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating savings pot:', error);
      throw error;
    }
  },
};

export default SavingsApi;
