import axios from "axios";
import BASE_URL from "@/Config/Api";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.response.use(
  response => response,
  error => {

    if (error.response?.status === 401) {

      localStorage.setItem(
        "sessionExpired",
        "true"
      );

      localStorage.removeItem("sessionId");

      window.location.href = "/session-expired";
    }

    return Promise.reject(error);
  }
);

export default api;