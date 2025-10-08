import axios from "axios";
import {useCallback} from "react";

function useFetch() {
    const fetchData = useCallback(async ({method, url, data, params, isFormData = false}) => {
        try {
            // Correct token key retrieval
            const token = sessionStorage.getItem("token");
            const id = sessionStorage.getItem("Id");

            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            if (id) headers.companyid = id;

            // Don't set Content-Type for FormData, let axios handle it
            if (!isFormData && data && typeof data === 'object' && !(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const axiosConfig = {
                method,
                url,
                ...(data && {data}),
                ...(params && {params}),
                ...(Object.keys(headers).length > 0 && {headers}),
            };

            console.log("useFetch - Making request:", {
                method,
                url,
                isFormData,
                hasData: !!data,
                dataType: data instanceof FormData ? 'FormData' : typeof data,
                headers
            });

            const result = await axios(axiosConfig);
            console.log("useFetch - Response:", result);
            return result.data;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                stack: error.stack
            });
            throw error; // Rethrow the error to propagate it
        }
    }, []);

    return [fetchData];
}

export default useFetch;
