import { ApiClient } from './ApiClient';

const AuthenticationApi = {

  // POST /api/Authentication/Register
  registerUser: async (userData) => {
    try {
      const response = await ApiClient.post('/Authentication/Register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // POST /api/Authentication/Login
  loginUser: async (credentials) => {
    try {
      const response = await ApiClient.post('/Authentication/Login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  },

// POST /api/Authentication/Logout
logoutUser: async () => {
  try {
    const response = await ApiClient.post('/Authentication/Logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
},
};
export default AuthenticationApi;
