import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open : false,
    initialProducts : [],
    filteredProducts : [],
    priceFilterValue : [0, 1000],
    ratingFilterValue : [0, 5],
    sortValue : "Newest First",
    categoryArr : [],
    searchKeyword : '',
}

const FilterSlice = createSlice({
    name : 'filter',
    initialState,
    reducers : {
        openSortModal : (state) => {
            state.open = true;
        },
        closeSortModal : (state) => {
            state.open = false;
        },
        setSortValue : (state, action) => {
            state.sortValue = action.payload;
        },
        setSearchParams : (state, action) => {
            state.searchParams = action.payload;
        },
        setInitialProducts : (state, action) => {
            state.initialProducts = [...action.payload];
        },
        setFilteredProducts : (state, action) => {
            state.filteredProducts = [...action.payload];
        },
        setPriceFilterValue : (state, action) => {
            state.priceFilterValue = [...action.payload];
        },
        setRatingFilterValue : (state, action) => {
            state.ratingFilterValue = [...action.payload];
        },
        setCategoryArr : (state, action) => {
            state.categoryArr = [...action.payload];
        },
        setSearchKeyword : (state, action) => {
            state.searchKeyword = action.payload;
        },
        clearFilter : (state) =>{
            return initialState;
        }
    }
})

export const {
    openSortModal, 
    setInitialProducts, 
    setFilteredProducts, 
    closeSortModal, 
    setSortValue, 
    setSearchParams,
    setPriceFilterValue,
    setRatingFilterValue,
    setCategoryArr,
    clearFilter,
    setSearchKeyword
} = FilterSlice.actions;


export default FilterSlice.reducer;