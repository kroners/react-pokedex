import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"
});

// Attach token from localStorage before each request
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("pokemon-app-auth");
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore parsing errors
      }
    }
  }
  return config;
});

export default axiosClient;
