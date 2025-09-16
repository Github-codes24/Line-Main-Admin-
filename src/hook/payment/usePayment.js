import React, {useState} from "react";
import useFetch from "../useFetch";
import {useNavigate} from "react-router-dom";
import {
    getPaymentByIdAtom,
    getPaymentListAtom,
    paymentByIdAtom,
    searchPaymentAtom,
} from "../../state/payment/paymentState";
import {useRecoilState} from "recoil";
import conf from "../../config";
import {toast} from "react-toastify";

const usePayment = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [searchPayment, setSearchPayment] = useRecoilState(searchPaymentAtom);
    // const [getPaymentList, setGetPaymentList] = useRecoilState(getPaymentListAtom);
    const [paymentById, setpaymentById] = useRecoilState(paymentByIdAtom);

    const fetchPayment = async (search, page, limit) => {
        setLoading(true);
        const data = {search: search, page: page, limit: limit};
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/admin/payment`,
                data: data,
            });
            if (res) {
                setSearchPayment(res?.payments);
                toast.success(res?.message);
                navigate("/admin/payment");
            }
        } catch (error) {
            console.log("Error while creating payment:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPaymentById = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/admin/payment/${id}`,
            });
            if (res) {
                setpaymentById(res?.data);
            }
        } catch (error) {
            console.log("Error while fetching payment by ID:", error);
        } finally {
            setLoading(false);
        }
    };

    // const fetchPaymentList = async (page, limit) => {
    //     setLoading(true);
    //     try {
    //         const params = new URLSearchParams({
    //             page,
    //             limit,
    //         });
    //         const res = await fetchData({
    //             method: "GET",
    //             url: `${conf.apiBaseUrl}/admin/payments`,
    //         });
    //         if (res) {
    //             setGetPaymentList(res);
    //         }
    //     } catch (error) {
    //         console.log("Error while fetching payment list:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return {
        loading,
        searchPayment,
        fetchPayment,
        //  getPaymentList,
        //   fetchPaymentList,
        paymentById,
        fetchPaymentById,
    };
};

export default usePayment;
