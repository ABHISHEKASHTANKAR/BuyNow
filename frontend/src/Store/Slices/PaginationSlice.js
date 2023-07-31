import { createSlice } from "@reduxjs/toolkit";
import { setPriceFilterValue, setRatingFilterValue, setCategoryArr } from './FilterSlice';

const initialState = {
    totalPages : 0,
    currentPage : 1
}

const PaginationSlice = createSlice({
    name : "pagination",
    initialState,
    reducers : {
        setTotalPages : (state, action) => {
            state.totalPages = action.payload;
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder.addCase([setPriceFilterValue, setCategoryArr, setRatingFilterValue], () => {
            return initialState;
        })
    }
})

export const {setCurrentPage, setTotalPages} = PaginationSlice.actions;

export default PaginationSlice.reducer;