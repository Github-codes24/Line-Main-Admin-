import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();
export const createSmallProductAtom = atom({
    key: "createSmallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getSmallProductAtom = atom({
    key: "getSmallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchSmallProductAtom = atom({
    key: "searchSmallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
