import axios from "axios";

export const STUDENT_HEADER_VALUE = "Pedro";

export const api = axios.create({
  baseURL: "https://backend-p4-klvc.onrender.com",
  timeout: 5000,
});

export const authHeaders = (token?: string | null) => ({
  "x-nombre": STUDENT_HEADER_VALUE,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});