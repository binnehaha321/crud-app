import axios from "axios";
import { cookies } from "./cookies";

const request = axios.create({
<<<<<<< HEAD
  baseURL: "https://webapp-backend-379318.as.r.appspot.com/",
=======
  baseURL: "http://webapp-backend-379318.as.r.appspot.com/",
>>>>>>> 8a9a4bb66364ac4e1bd30f3a1a3c2f8d898c05e9
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
