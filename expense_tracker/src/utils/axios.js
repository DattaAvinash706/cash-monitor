import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

//token is fetched from the local storage and added to the authorization header and it will be passed to the backend everytime a request is been made and backend will verify the token and give response accordingly
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
