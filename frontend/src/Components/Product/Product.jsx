import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import './Product.css';
import { removeFromCart } from '../../Store/Slices/CartSlice';
import { deleteProductAPI } from '../../APIS';

const Product = (props) => {

    const dispatch = useDispatch();

    const { image, name, price, stock, type, _id, isCart, quantity } = props;

    const handleEdit = () => {

    }

    const handleDelete = async () => {
        const confirm = window.prompt("Do you really want to delete? type Y for yes and N for No!!");
        console.log(confirm);
        if(confirm === "Y"){
            const res = await axios.delete(`${deleteProductAPI}${_id}`);
            window.alert("Product Removed Sunccessfully!! please reload page!!");
        }
    }

    const handleRemove = () => {
        dispatch(removeFromCart(_id));
    }

    return (
        <div className='admin-product'>
            <div className="product-top">
                <div className="top-left">
                    <img src={image} alt="product-img" />
                </div>
                <div className="top-right">
                    <h3>{name}</h3>
                    <div className="btns" style={{justifyContent : isCart ? "flex-end" : "center"}}>

                        <div onClick={handleEdit} className="edit" style={{ display: type === 'admin-product' ? "flex" : "none" }}>
                            <AiOutlineEdit className='edit-icon' />
                        </div>

                        <div className="delete" onClick={isCart ? handleRemove : handleDelete}>
                            <AiOutlineDelete className='delete-icon' />
                        </div>

                    </div>
                </div>
            </div>
            <div className="product-bottom">
                <div className="bottom-left">
                    <p>Price</p>
                    <p>$ {price}</p>
                </div>
                <div className="bottom-right">
                    <p>Quantity</p>
                    <p>{isCart ? quantity : stock}</p>
                </div>
            </div>
        </div>
    )
}

export default Product