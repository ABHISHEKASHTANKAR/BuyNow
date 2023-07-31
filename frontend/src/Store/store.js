import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './Slices/CartSlice';
import FilterReducer from './Slices/FilterSlice';
import AdminSlice from './Slices/AdminSlice'
import PaginationSlice from "./Slices/PaginationSlice";
import UserSlice from "./Slices/UserSlice";

const store = configureStore({
    reducer : {
        cart : CartReducer,
        filter : FilterReducer,
        admin : AdminSlice,
        pagination : PaginationSlice,
        user : UserSlice
    },
})

export default store;