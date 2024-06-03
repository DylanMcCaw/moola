import axios from 'axios';

// Create an instance of axios with a custom configuration
export const ApiClient = axios.create({
  baseURL: 'https://localhost:7118/api',
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here if needed
  },
});

// Request interceptor to handle request configurations and logging
ApiClient.interceptors.request.use(
  config => {
    // You can add custom headers or modify the request configuration here
    console.log('Starting Request', config);
    return config;
  },
  error => {
    // Handle request errors here
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
ApiClient.interceptors.response.use(
  response => {
    // Handle the response data here
    console.log('Response:', response);
    return response;
  },
  error => {
    // Handle response errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response);
      // You can handle specific status codes here if needed
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
      } else if (error.response.status === 500) {
        // Handle server error
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
