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

export const processCheckout = async (payload) => {
    try {
        const response = await api.post("/pos/checkout", payload);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw {
            message:
                "Network or server error. Please try again or notify admins.",
        };
    }
};
