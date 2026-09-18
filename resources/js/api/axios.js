import axios from "axios";

const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const baseOptions = {
    baseURL: `${import.meta.env.VITE_APP_URL}/api`,
    withCredentials: true,
    withXSRFToken: true,
};

export const api = axios.create({
    ...baseOptions,
    headers: defaultHeaders,
});

export const apiDownload = axios.create({
    ...baseOptions,
    responseType: "blob",
});

export const apiUpload = axios.create({
    ...baseOptions,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
