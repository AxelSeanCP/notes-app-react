import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { iat } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > iat + 1500; //TODO: Fix this in backend
  } catch (error) {
    console.error("Error decoding token: ", error);
    return true;
  }
};

api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return config;
  }

  if (isTokenExpired(accessToken)) {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const { data } = await api.put("/authentications", { refreshToken });
      accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", "expiredTOkenhahahah");
    } catch (error) {
      console.error("Failed to refresh token: ", error);
      alert("Session expired. Please login again");
      window.location.href = "/logout";
      return Promise.reject(new Error("Refresh token expired"));
    }
  }

  return config;
});

export default api;
