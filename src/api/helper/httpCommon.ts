import axios from "axios";

export const formDataSender = axios.create({ baseURL: "/api", headers: { "Content-Type": "multipart/form-data"}});

export default axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json"
  }
});
