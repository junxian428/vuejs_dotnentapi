import axios from 'axios';

const API_URL = 'https://localhost:7259/pizza'; // Change to your API URL

// Configure Axios defaults if needed
axios.defaults.withCredentials = false; // Include credentials with requests if needed

export const PizzaService = {
  getAll: () => axios.get(API_URL),
  get: (id) => axios.get(`${API_URL}/${id}`),
  create: (pizza) => axios.post(API_URL, pizza),
  update: (id, pizza) => axios.put(`${API_URL}/${id}`, pizza),
  delete: (id) => axios.delete(`${API_URL}/${id}`),
};

// You can also add interceptors if you want to handle errors globally or log requests/responses
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally (optional)
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);
