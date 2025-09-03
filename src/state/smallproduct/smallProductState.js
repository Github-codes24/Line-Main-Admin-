import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();
export const createSmallProductAtom = atom({
    key: "smallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getSmallProductAtom = atom({
    key: "smallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchSmallProductAtom = atom({
    key: "smallProduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
