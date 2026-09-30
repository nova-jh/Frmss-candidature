import axios from "axios";
import { clearStoredAdmin, readStoredAdmin } from "./adminStorage";

const configuredApiUrl = import.meta.env.VITE_API_URL;

if (import.meta.env.PROD && !configuredApiUrl) {
    throw new Error("VITE_API_URL must be configured for a production build");
}

const api = axios.create({

    baseURL: configuredApiUrl || "http://localhost:8080/api",

    headers: {

        "Content-Type": "application/json"

    }

});

api.interceptors.request.use((config) => {
    const admin = readStoredAdmin();
    if (admin?.token) {
        config.headers.Authorization = `Bearer ${admin.token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url?.endsWith("/admin/login")) {
            clearStoredAdmin();
            if (window.location.pathname.startsWith("/admin")) {
                window.location.assign("/admin/login");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
