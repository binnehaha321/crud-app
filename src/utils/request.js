import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export default request;
