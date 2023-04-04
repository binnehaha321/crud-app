import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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

export const getRole = () => {
  let user_info = JSON.parse(localStorage.getItem("user_info"));
  return user_info?.roles?.includes("ROLE_ADMIN");
};

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  if (response.status === 200) return response.data;
};

export const post = async (path, data, options = {}) => {
  const response = await request.post(path, data, options);
  if (response.status === 200) return response.data;
};

export default request;
