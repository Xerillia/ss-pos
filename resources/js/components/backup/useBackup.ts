import { api, apiDownload } from "@/api/axios";
import { useState } from "react";
import { toast } from "sonner";

export function useBackup() {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isBackingUp, setIsBackingUp] = useState(false);

    const fetchBackups = async () => {
        try {
            const response = await api.get("backups");
            setBackups(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Failed to load backups.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackup = async () => {
        setIsBackingUp(true);
        try {
            const response = await api.post("/backups");

            if (response.data.success) {
                toast.success(response.data.message);

                await fetchBackups();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsBackingUp(false);
        }
    };

    const handleDownload = async (name: string) => {
        try {
            const response = await apiDownload.get(`/backups/${name}`);

            // turn blob into downloadable link
            const blobUrl = window.URL.createObjectURL(
                new Blob([response.data]),
            );
            const tempLink = document.createElement("a");
            tempLink.href = blobUrl;

            // download
            tempLink.setAttribute("download", name);
            document.body.appendChild(tempLink);
            tempLink.click();

            // cleanup
            tempLink.remove();
            window.URL.revokeObjectURL(blobUrl);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        backups,
        loading,
        setLoading,
        error,
        isBackingUp,
        fetchBackups,
        handleBackup,
        handleDownload,
    };
}
