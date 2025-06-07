import axios from "axios";

const axiosApiInstance = axios.create();

// Set base API URL from environment variables
axiosApiInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry &&
            originalRequest.url !== "/auth/login/"
        ) {
            originalRequest._retry = true;
            try {
                return axiosApiInstance(originalRequest);
            } catch (retryError) {
                console.error("Retry failed:", retryError);
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosApiInstance;