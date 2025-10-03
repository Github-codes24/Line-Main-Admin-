import {useRecoilState} from "recoil";
import conf from "../../config";
import {useState} from "react";
import useFetch from "../useFetch";
import {
    createSmallProductAtom,
    getSmallProductByIdAtom,
    getSmallProductListAtom,
    paginationAtom,
    searchSmallProductAtom,
    searchSmallProductByIdAtom,
} from "../../state/smallproduct/smallProductState";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const useSmallProduct = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [addSmallProduct, setAddSmallProduct] = useRecoilState(createSmallProductAtom);
    const [getSmallProduct, setGetSmallProduct] = useRecoilState(getSmallProductListAtom);
    const [getsmallProductById, setGetSmallProductById] = useRecoilState(getSmallProductByIdAtom);
    const [searchSmallProduct, setSearchSmallProduct] = useRecoilState(searchSmallProductAtom);
    const [searchSmallProductById, setSearchSmallProductById] = useRecoilState(searchSmallProductByIdAtom);

    const createSmallProducts = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/small-products`,
                data,
            });
            
            console.log('API Response:', res);
            
            // Check if product was added successfully
            if (res && (res.success || res.data || res._id)) {
                setAddSmallProduct(res.data || res);
                toast.success(res?.message || "Small product added successfully!");
                setTimeout(() => {
                    navigate("/admin/smallproduct");
                }, 1000);
                return { success: true, data: res };
            } else {
                throw new Error(res?.message || 'Failed to add small product');
            }
        } catch (error) {
            console.error("Error while creating small product:", error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add small product';
            toast.error(errorMessage);
            throw error; // Re-throw to handle in component
        } finally {
            setLoading(false);
        }
    };

    const getSmallProductList = async (page, limit) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page,
                limit: limit,
            });
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/small-products??${params}`,
            });
            if (res) {
                setGetSmallProduct(res);
            }
        } catch (error) {
            console.log("Error while getting small products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSmallProductById = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/small-products/${id}`,
            });
            if (res) {
                setGetSmallProductById(res?.data);
            }
        } catch (error) {
            console.log("Error while getting small products:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateSmallProducts = async (id, formData) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/admin/small-products/${id}`,
                data: formData,
            });
            
            console.log('Update API Response:', res);
            
            // Check if product was updated successfully
            if (res && (res.success || res.data || res._id)) {
                toast.success(res?.message || "Small product updated successfully!");
                setTimeout(() => {
                    navigate("/admin/smallproduct");
                }, 1000);
                return { success: true, data: res };
            } else {
                throw new Error(res?.message || 'Failed to update small product');
            }
        } catch (error) {
            console.error("Error while updating small product:", error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update small product';
            toast.error(errorMessage);
            throw error; // Re-throw to handle in component
        } finally {
            setLoading(false);
        }
    };

    const deleteSmallProductById = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}/admin/small-products/${id}`,
            });
            if (res) {
                toast.success(res?.message);
            }
        } catch (error) {
            console.log("Error while delete small product", error);
        } finally {
            setLoading(false);
        }
    };

    const searchTheSmallProducts = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/small-products`,
                data: data,
            });
            if (res) {
                setSearchSmallProduct(res?.data);
            }
        } catch (error) {
            console.log("Error while searching small product", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const searchTheSmallProductById = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/small-products`,
                data: data,
            });
            if (res) {
                setSearchSmallProductById(res?.data);
            }
        } catch (error) {
            console.log("Error while searching small product", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        addSmallProduct,
        createSmallProducts,
        getSmallProduct,
        getSmallProductList,
        getsmallProductById,
        fetchSmallProductById,
        searchSmallProduct,
        searchTheSmallProductById,
        searchTheSmallProducts,
        deleteSmallProductById,
        updateSmallProducts,
    };
};

export default useSmallProduct;
