

import { useState, useEffect } from "react";
import BASE_URL from "./config";

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
                const response = await fetch(`${BASE_URL}/modules`, {
                    headers: { "Authorization": token },
                });

                

                const data = await response.json();
                console.log(data);
                if (data.success) {
                    console.log(data.module);
                    setModules(data.module);
                    console.log(modules);
                }
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
