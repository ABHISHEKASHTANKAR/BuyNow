import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AddProductModal : false,
    UpdateProductModal : false,
    DeleteProductModal : false, 
}

const AdminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        openAddProductModal : (state) => {
            state.AddProductModal = true;
        },
        closeAddProductModal : (state) => {
            state.AddProductModal = false;
        },
        openEditProductModal : (state) => {
            state.openAddProduct = true;
        },
        closeEditProductModal : (state) => {
            state.UpdateProductModal = false;
        },
        openDeleteProductModal : (state) => {
            state.DeleteProductModal = true;
        },
        closeDeleteProductModal : (state) => {
            state.DeleteProductModal = false;
        },
        
    }
})

export const { openAddProductModal, closeAddProductModal, openEditProductModal, 
               closeEditProductModal, openDeleteProductModal, closeDeleteProductModal,
            } = AdminSlice.actions;

export default AdminSlice.reducer;