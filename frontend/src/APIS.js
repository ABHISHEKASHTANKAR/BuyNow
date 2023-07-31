// HOST API

const host = 'http://localhost:3001';


// USER APIS

export const getUserAPI = `${host}/api/user/`;
export const updateUserAPI = `${host}/api/user/update/`


// SEARCH APIS

export const searchProductsAPI = `${host}/api/products/search/`


// AUTH APIS

export const loginAPI = `${host}/api/login`
export const registerAPI = `${host}/api/register`
export const logoutAPI = `${host}/api/logout`


// ORDER APIS

export const getOrdersAPI = `${host}/api/order`
export const getOrdersPerUserAPI = `${host}/api/order/`


// PRODUCTS APIS

export const getProductsAPI = `${host}/api/products`
export const getProductByIdAPI = `${host}/api/products/`
export const addProductAPI = `${host}/api/products`
export const deleteProductAPI = `${host}/api/products/`

// FILTER API

export const filterAPI = `${host}/api/productsperfilter`

// PAYMENT APIS

export const createOrderAPI = `${host}/api/payment/orders`
export const verifyOrderAPI = `${host}/api/payment/verify`
export const makeOrderAPI = `${host}/api/order/`