import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;

  const [, payload] = token.split(".");
  const { exp } = JSON.parse(atob(payload));
  const currentTime = Math.floor(Date.now() / 1000);

  return exp <= currentTime;
};

api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return config;
  }

  if (isTokenExpired(accessToken)) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (isTokenExpired(refreshToken)) {
      alert("Session expired. Please login again");
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(new Error("Refresh token expired"));
    }

    const { data } = await api.put("/authentications", { refreshToken });
    accessToken = data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default api;
