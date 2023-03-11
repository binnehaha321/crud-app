import axios from "axios";
// import { cookies } from "./cookies";

const request = axios.create({
  baseURL: "https://webapp-backend-379318.as.r.appspot.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});

export const getToken = () => {
  let user_info = JSON.parse(localStorage.getItem("user_info"));
  return user_info?.token;
};

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  console.log("GET: Khi het han token", response.status);
  if (response.status === 200) return response.data;
};

export const post = async (path, data, options = {}) => {
  const response = await request.post(path, data, options);
  console.log("POST: Khi het han token", response);
  if (response.status === 200) return response.data;
};

export default request;
