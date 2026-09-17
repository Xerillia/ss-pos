import axios from "axios";

const baseOptions = {
    baseURL: `${import.meta.env.VITE_APP_URL}/api`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

export const api = axios.create(baseOptions);

export const apiDownload = axios.create({
    ...baseOptions,
    responseType: "blob",
});
