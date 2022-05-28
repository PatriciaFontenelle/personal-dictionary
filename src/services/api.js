import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/",
    // baseURL: "https://personal-dictionary-server1.herokuapp.com/"
});

api.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("auth-token")) {
            const xConfig = { ...config };
            xConfig.headers = {
                Authorization: `token ${localStorage.getItem("auth-token")}`,
            };

            return xConfig;
        }
        return config;
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.clear();
            window.location.reload();
            return null;
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.clear();
            window.location.reload();
            return null;
        }
        return Promise.reject(error);
    }
);

export default api;
