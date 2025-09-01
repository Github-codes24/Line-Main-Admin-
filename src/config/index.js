//Base API URL from environment variable
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://linemen-be-1.onrender.com';
export const API_BASE_URL = 'https://linemen-be-1.onrender.com';


//API endpoints
//API endpoints
//API endpoints
export const API_ENDPOINTS = {
    ADD_CUSTOMER: '/admin/Customer/add-customer',
    UPDATE_CUSTOMER: '/admin/Customer/update-customer',
    GET_SINGLE_CUSTOMER: '/admin/Customer/get-single-customer',
    GET_ALL_CUSTOMERS: '/admin/customer/get-all-customer',
    DELETE_CUSTOMER: '/admin/Customer/delete-customer',  // Fixed delete endpoint

    // Shop endpoints
    ADD_SHOP: '/admin/shop/add-shop',
    UPDATE_SHOP: '/admin/shop/update-shop',
    GET_ALL_SHOPS: '/admin/shop/get-all-shop',
    GET_SINGLE_SHOP: '/admin/shop/get-shop',
    DELETE_SHOP: '/admin/shop/delete-shop'
};


export const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIxNTRlNTlmMzU3OWJiOGQzMTA1OWYiLCJlbWFpbCI6ImQyZXZhbnNoc2FlZGh1MjBAZ21haWwuY29tIiwiaWF0IjoxNzU2NjQzMjExLCJleHAiOjE3NTY3Mjk2MTF9.2gecP5rWP-4r7HfEJG92YtSpjrQxYTa1Klf1zMfQwYg';
};

// API Functions
export const addCustomer = async (customerData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADD_CUSTOMER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(customerData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

export const updateCustomer = async (customerId, customerData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_CUSTOMER}/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(customerData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const getSingleCustomer = async (customerId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_SINGLE_CUSTOMER}/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting customer', error);
        throw error;
    }
};

//Adding function for get all customer
export const getAllCustomers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_CUSTOMERS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error getting all customers:', error)
        throw error;
    }
}

//Adding Delete function for user API 
// Add this new function after getAllCustomers
export const deleteCustomer = async (customerId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DELETE_CUSTOMER}/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};


// Shop API Functions
export const updateShop = async (shopId, shopData) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.UPDATE_SHOP}/${shopId}`;
        console.log('API URL:', url);
        console.log('Request Data:', shopData);

        // Check if there are files to upload
        const hasFiles = shopData.aadhaarImage instanceof File || shopData.gstinImage instanceof File;

        let body;
        let headers = {
            'Authorization': `Bearer ${getAuthToken()}`
        };

        if (hasFiles) {
            // Use FormData for file uploads
            const formData = new FormData();
            Object.keys(shopData).forEach(key => {
                if (shopData[key] !== null && shopData[key] !== undefined) {
                    formData.append(key, shopData[key]);
                }
            });
            body = formData;
            // Don't set Content-Type for FormData, browser will set it automatically
        } else {
            // Use JSON for text-only data
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(shopData);
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
            // Try to get error details from response
            const errorText = await response.text();
            console.log('Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating shop:', error);
        throw error;
    }
};

export const getSingleShop = async (shopId) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.GET_SINGLE_SHOP}/${shopId}`;
        console.log('Get Single Shop API URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        console.log('Get Single Shop Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Get Single Shop Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Get Single Shop Success:', data);
        return data;
    } catch (error) {
        console.error('Error getting single shop:', error);
        throw error;
    }
};

export const getAllShops = async (page = 1, limit = 10, search = '') => {
    try {
        // Build URL with query parameters
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        // Add search parameter only if provided
        if (search && search.trim() !== '') {
            params.append('search', search.trim());
        }

        const url = `${API_BASE_URL}${API_ENDPOINTS.GET_ALL_SHOPS}?${params.toString()}`;
        console.log('Get All Shops API URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        console.log('Get All Shops Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Get All Shops Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Get All Shops Success:', data);
        return data;
    } catch (error) {
        console.error('Error getting all shops:', error);
        throw error;
    }
};

export const addShop = async (shopData) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.ADD_SHOP}`;
        console.log('Add Shop API URL:', url);
        console.log('Add Shop Request Data:', shopData);

        // Check if there are files to upload
        const hasFiles = shopData.aadhaarImage instanceof File || shopData.gstinImage instanceof File;

        let body;
        let headers = {
            'Authorization': `Bearer ${getAuthToken()}`
        };

        if (hasFiles) {
            // Use FormData for file uploads
            const formData = new FormData();
            Object.keys(shopData).forEach(key => {
                if (shopData[key] !== null && shopData[key] !== undefined) {
                    formData.append(key, shopData[key]);
                }
            });
            body = formData;
            // Don't set Content-Type for FormData, browser will set it automatically
        } else {
            // Use JSON for text-only data
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(shopData);
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        console.log('Add Shop Response Status:', response.status);

        if (!response.ok) {
            // Try to get error details from response
            const errorText = await response.text();
            console.log('Add Shop Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding shop:', error);
        throw error;
    }
};

export const deleteShop = async (shopId) => {
    try {
        const url = `${API_BASE_URL}${API_ENDPOINTS.DELETE_SHOP}/${shopId}`;
        console.log('Delete Shop API URL:', url);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        console.log('Delete Shop Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Delete Shop Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Delete Shop Success:', data);
        return data;
    } catch (error) {
        console.error('Error deleting shop:', error);
        throw error;
    }
};

//For grant access of token
// https://linemen-be-1.onrender.com/admin/Customer/add-customer

//For check add customer admin/customermanagement/add

