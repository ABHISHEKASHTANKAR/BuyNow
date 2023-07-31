import React, { useState, useEffect } from 'react'
import Product from '../../../Components/Product/Product.jsx';
import axios from 'axios';
import './AdminProducts.css';
import Loader from '../../../Components/Loader/Loader.jsx';
import AddProduct from '../Actions/AddProduct.jsx';
import UpdateProduct from '../Actions/UpdateProduct.jsx';
import DeleteProduct from '../Actions/DeleteProduct.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { openAddProductModal } from '../../../Store/Slices/AdminSlice.js';
import { getProductsAPI } from '../../../APIS.js';

const AdminProducts = () => {

    const AddProductState = useSelector((state) => state.admin.AddProductModal);
    const UpdateProductState = useSelector((state) => state.admin.UpdateProductModal);
    const DeleteProductState = useSelector((state) => state.admin.DeleteProductModal);

    const dispatch = useDispatch();

    const [products, setProducts] = useState({
        loading: true,
        data: [],
    });

    const getAllProducts = async () => {
        const res = await axios.get(getProductsAPI);
        if(res.status === 200){
            const data = await res.data;
            setProducts({loading : false, data : data});
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [products.loading, AddProductState]);

    const handleAddProduct = () => {
        dispatch(openAddProductModal());
    }

    return (
        <div className='admin-products'>
            <div className="products-top">
                <h4>All Products</h4>
                <div className='add-btn' onClick={handleAddProduct}>Add Product</div>
            </div>
            <div className="products-bottom">

                {
                    products.loading
                        ?
                        <div className="loading">
                            <Loader />
                        </div>
                        :
                        <div className="products-bottom">
                            {
                                products.data.map((item) => {
                                    return (
                                        <Product {...item} key={item._id} type='admin-product' />
                                    )
                                })
                            }
                        </div>
                }
            </div>


            <div className={(AddProductState || UpdateProductState || DeleteProductState) ? "modal-overlay" : "modal-overlay inactive"} >
                {AddProductState && <AddProduct />}
                {UpdateProductState && <UpdateProduct />}
                {DeleteProductState && <DeleteProduct />}
            </div>

        </div>
    )
}

export default AdminProducts