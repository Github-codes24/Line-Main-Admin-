import {useRecoilState} from "recoil";
import conf from "../../config";
import {useState} from "react";
import useFetch from "../useFetch";
import {
    createSmallProductAtom,
    getSmallProductAtom,
    searchSmallProductAtom,
} from "../../state/smallproduct/smallProductState";

const useSmallProduct = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);

    const [addSmallProduct, setAddSmallProduct] = useRecoilState(createSmallProductAtom);
    const [getSmallProduct, setGetSmallProduct] = useRecoilState(getSmallProductAtom);
    const [searchSmallProduct, setSearchSmallProduct] = useRecoilState(searchSmallProductAtom);

    const createSmallProducts = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/small-products`,
                data,
            });
            if (res?.data) {
                setAddSmallProduct(res.data);
            }
        } catch (error) {
            console.log("Error while creating small product:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTheSmallProducts = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/small-products`,
            });
            if (res?.data) {
                setGetSmallProduct(res.data);
            }
        } catch (error) {
            console.log("Error while getting small products:", error);
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
            });
            if (res?.data) {
                setSearchSmallProduct(res.data);
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
        getTheSmallProducts,
        searchSmallProduct,
        searchTheSmallProducts,
    };
};

export default useSmallProduct;
