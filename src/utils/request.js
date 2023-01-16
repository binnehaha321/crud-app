import axios from "axios";
import { cookies } from "./cookies";

const request = axios.create({
  baseURL: "http://localhost:8080/",
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

export default request;
