import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();
export const createSmallProductAtom = atom({
    key: "createSmallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getSmallProductListAtom = atom({
    key: "getSmallProductList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getSmallProductByIdAtom = atom({
    key: "getSmallProductById",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchSmallProductAtom = atom({
    key: "searchSmallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchSmallProductByIdAtom = atom({
    key: "searchSmallProductById",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
