import axios from "axios";

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
    try {
        const admin = JSON.parse(localStorage.getItem("admin"));
        if (admin?.token) {
            config.headers.Authorization = `Bearer ${admin.token}`;
        }
    } catch {
        localStorage.removeItem("admin");
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url?.endsWith("/admin/login")) {
            localStorage.removeItem("admin");
            if (window.location.pathname.startsWith("/admin")) {
                window.location.assign("/admin/login");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
