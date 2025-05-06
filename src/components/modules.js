

import { useState, useEffect } from "react";

const useGetModules = () => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setModules([]);
                return;
            }

            try {
                const response = await fetch("https://petrol-pump-management-system-backend-vmp6.onrender.com/modules", {
                    headers: { "Authorization": token },
                });

                const data = await response.json();
                if (data.success) setModules(data.module);
                else setModules([]);
            } catch (error) {
                console.error("Error fetching modules:", error);
                setModules([]);
            }
        };

        fetchModules();

        const handleStorageChange = () => fetchModules();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, [localStorage.getItem("token")]);
    return modules;
};

export default useGetModules;
