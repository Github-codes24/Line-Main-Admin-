<<<<<<< HEAD
const conf = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
};

export default conf;
=======
import axios from "axios";

// Base URL from .env
export const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  GET_WALLET_LIMIT: "/admin/limit-amount/get-limit-amount",
  UPDATE_WALLET_LIMIT: "/admin/limit-amount/update-limit-amount",
};

// Function to get token from localStorage or fallback to env
export const getAuthToken = () =>
  localStorage.getItem("authToken") || process.env.REACT_APP_API_TOKEN;

// Create an axios instance with baseURL and JSON header
export const api = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Attach Authorization header automatically if token exists
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
>>>>>>> 59afc9e787adb8a1bafaf044035cfd2ac34fc9d8
