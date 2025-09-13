// import axios from "axios";
// import { useCallback } from "react";

// function useFetch() {
//   const fetchData = useCallback(async ({ method, url, data, params }) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const id = sessionStorage.getItem("Id");

//       const headers = {};
//       if (token) headers.Authorization = `Bearer ${token}`;
//       if (id) headers.companyid = id;

//       const axiosConfig = {
//         method,
//         url,
//         ...(data && { data }),
//         ...(params && { params }),
//         ...(Object.keys(headers).length > 0 && { headers }),
//       };

//       const result = await axios(axiosConfig);
//       return result.data;
//     } catch (error) {
//       console.error(`Error fetching data from ${url}:`, error.message);
//       throw error;
//     }
//   }, []);

//   return [fetchData];
// }

// export default useFetch;
import axios from "axios";
import { useCallback } from "react";

function useFetch() {
  const fetchData = useCallback(async ({ method, url, data, params }) => {
    try {
      const token = sessionStorage.getItem("token");

      // Build headers
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Axios config
      const axiosConfig = {
        method,
        url,
        headers,
        ...(data && { data }),
        ...(params && { params }),
      };

      console.log("🚀 Fetching:", axiosConfig); // Debug log

      const response = await axios(axiosConfig);

      return response.data;
    } catch (error) {
      console.error("❌ API Fetch Error:", error);

      // Return consistent error format
      if (error.response) {
        // Server responded with a status code outside 2xx
        return {
          success: false,
          message: error.response.data?.message || "Server Error",
          status: error.response.status,
          data: error.response.data || null,
        };
      } else if (error.request) {
        // No response received
        return {
          success: false,
          message: "No response from server",
          status: null,
          data: null,
        };
      } else {
        // Other errors
        return {
          success: false,
          message: error.message || "Unknown error occurred",
          status: null,
          data: null,
        };
      }
    }
  }, []);

  return [fetchData];
}

export default useFetch;
