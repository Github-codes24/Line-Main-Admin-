import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const productCategoryAtom = atom({
    key: "productcategory",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const productSubCategoryAtom = atom({
    key: "productsubcategory",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
