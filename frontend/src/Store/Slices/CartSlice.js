import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    open : false,
    cartArr : []
}

const CartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart : (state, action) => {
            state.cartArr.push(action.payload);
        },
        removeFromCart : (state, action) => {
            state.cartArr = state.cartArr.filter((item)=>{
                return item._id !== action.payload;
            }) 
        },
        openCart : (state) => {
            state.open = true;
        },
        closeCart : (state) => {
            state.open = false;
        },
        clearCart : (state) => {
            state.cartArr = [];
        }
    }
})

export const {addToCart, removeFromCart, openCart, closeCart, clearCart} = CartSlice.actions;

export default CartSlice.reducer;