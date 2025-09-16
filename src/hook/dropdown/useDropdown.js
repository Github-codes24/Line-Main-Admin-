import {useRecoilState} from "recoil";
import conf from "../../config";
import {useState} from "react";
import useFetch from "../useFetch";
import {productCategoryAtom, productSubCategoryAtom} from "../../state/dropdown/dropDownState";

const useDropdown = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [productCategory, setProductCategory] = useRecoilState(productCategoryAtom);
    const [productSubCategory, setProductSubCategory] = useRecoilState(productSubCategoryAtom);

    const fetchProductCategory = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/tabs/form-data`,
            });
            if (res) {
                setProductCategory(res?.data);
            }
        } catch (error) {
            console.log("Error while fetching product category", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductSubCategory = async (categoryId) => {
        setProductSubCategory([]);
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/tabs/${categoryId}/subtabs`,
            });
            if (res) {
                setProductSubCategory(res?.data);
            }
        } catch (error) {
            console.log("Error while fetching product category", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return {productCategory, productSubCategory, setProductSubCategory, fetchProductCategory, fetchProductSubCategory};
};

export default useDropdown;
