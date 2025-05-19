// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000", // změň na svoje API, pokud máš jinou URL
});

// Automaticky přidá Authorization hlavičku
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
