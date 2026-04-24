import axios from "axios";


export const api = axios.create({
    baseURL: "https://backend-p4-klvc.onrender.com",
    timeout: 5000
})