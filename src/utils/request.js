import axios from "axios";
import { cookies } from "./cookies";

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

const getToken = () => {
  let user_info = cookies.get("user_info");
  return user_info?.data?.token;
};

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path, data, options = {}) => {
  const response = await request.post(path, data, options);
  return response.data;
};

export default request;
