import axios from "axios";
import {useCallback} from "react";

function useFetch() {
    const fetchData = useCallback(async ({method, url, data, params}) => {
        try {
            // Correct token key retrieval
            const token = sessionStorage.getItem("token");
            const id = sessionStorage.getItem("Id");

            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            if (id) headers.companyid = id;

            const axiosConfig = {
                method,
                url,
                ...(data && {data}),
                ...(params && {params}),
                // headers: {
                //   Authorization: Bearer ${token},
                //   companyid: ${id},
                // },
                ...(Object.keys(headers).length > 0 && {headers}),
            };

            const result = await axios(axiosConfig);
            return result.data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Error fetching data from ${url}:`, error.message, error.stack);
            throw error; // Rethrow the error to propagate it
        }
    }, []);

    return [fetchData];
}

export default useFetch;
