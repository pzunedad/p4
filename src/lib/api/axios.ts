import axios from "axios";


export const api = axios.create({
  baseURL: "https://backend-p4-klvc.onrender.com",
  timeout: 5000,
  headers:{
    "x-nombre": "Pedro",
  },
});
export const authHeaders = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return {
    Authorization: `Bearer ${token}`,
    "x-nombre": "Pedro",
  };
};
