import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface Iproduct {
    "id": string;
    "category": string;
    "name": string;
    "seller": string;
    "price": number;
    "stock": number;
    "ratings": number;
    "ratingsCount": number;
    "img": string;
    "shipping": number;
    "quantity": number;
}
export interface Icart {
    id: string
    name: string | null
    image: string | null
    price: number | null
    color: string | null
    quantity: number | null
    userId: string
}
export interface Istate {
    filterdPro: Iproduct[];
    currentPage: number;
    productPerPage: number;
    gCartProducts: Icart[],
    globalIsLoading: boolean
}
const initialState: Istate = {
    filterdPro: [],
    currentPage: 1,
    productPerPage: 12,
    gCartProducts: [],
    globalIsLoading: false
}

// اسلایس برای صفحه بندی مناسب محصولات
export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setFilterdPro: (state, action: PayloadAction<Iproduct[]>) => {
            state.filterdPro = action.payload
        },
        setGCartProducts: (state, action: PayloadAction<Icart[]>) => {
            state.gCartProducts = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setGlobalIsLoading: (state, action: PayloadAction<boolean>) => {
            state.globalIsLoading = action.payload
        }
    }
})
export const { setFilterdPro, setCurrentPage, setGCartProducts, setGlobalIsLoading } = ProductSlice.actions