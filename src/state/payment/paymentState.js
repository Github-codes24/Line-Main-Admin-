import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();
export const searchPaymentAtom = atom({
    key: "search",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// export const getPaymentListAtom = atom({
//     key: "getpaymentlist",
//     default: [],
//     effects_UNSTABLE: [persistAtom],
// });

export const paymentByIdAtom = atom({
    key: "paymentbyid",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
