import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getToken } from '../../Utils/LoginStatus';
import { BsChevronDoubleDown } from 'react-icons/bs'
import { shortenString, formatDate, calculateTotal } from '../../Utils/Function';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { getUserAPI, getOrdersAPI, getOrdersPerUserAPI } from '../../APIS'; 

const Order = () => {
    const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [activeIndex, setActiveIndex] = useState(null);

    const [user, setUser] = useState(null);
    const [orders, setOrder] = useState([]);

    const getUser = async () => {
        if (userLoggedIn) {
            let id = JSON.parse(localStorage.getItem('id'));
            const token = getToken();
            const response = await axios.get(`${getUserAPI}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        }
    }

    const getOrders = async () => {
        try{
            if(user !== null){
                if(user.role === 'admin'){
                    const response = await axios.get(getOrdersAPI);
                    setOrder(response.data);
                }
                else{
                    const response = await axios.get(`${getOrdersPerUserAPI}${user._id}`);
                    setOrder(response.data);
                }   
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUser()
    }, [userLoggedIn]);

    useEffect(()=>{
        getOrders();
    }, [user]);

    const handleCollapse = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    }

    return (
        <div className='orders'>
            <div className="orders-top">
                {user && user.role === 'admin' ? <h4>All Orders</h4> : <h4>Your Orders</h4>}
            </div>
            <div className="orders-bottom">
                <div className='accordion'>
                    {
                        user === null 
                        ?
                        <Loader />
                        :
                        orders.length === 0 
                        ?
                        <div className="empty-orders">
                            <h1>You Haven't Made Any Orders!!</h1>
                            <Link className='btn' to='/shop'>Shop Now</Link>
                        </div>
                        : 
                        orders.map((order, index) => {
                            return (
                                <div key={index}>
                                    <div className="header">
                                        <div className="left"><div className='sub'>Order {index + 1} : </div> <div>{order._id}</div></div>
                                        <div className="date">
                                            {formatDate(order.updatedAt)}
                                        </div>
                                        <div className={activeIndex === index ? "right right-active" : "right"} onClick={() => handleCollapse(index)}>
                                            <BsChevronDoubleDown />
                                        </div>
                                    </div>
                                    <div className={activeIndex === index ? "collapse active" : "collapse"}>
                                        <div className="left">
                                            {
                                                order.products.map((order, index) => {
                                                    return (
                                                        <div className="order-products" key={index}>
                                                            <img src={order.image} alt="" />
                                                            <h2>{shortenString(order.name, 20)}</h2>
                                                            <h3><span>{order.quantity}</span> items</h3>
                                                            <h3>$ {order.price} </h3>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className="right">
                                            <div className="user-details">
                                                <p><span className='head'>Customer Id : </span><span>{user._id}</span></p>
                                                <p><span className='head'>Cus Address : </span><span>{user.address}</span></p>
                                                <p><span className='head'>Cus Mobile No. : </span><span>{user.mobileNo}</span></p>
                                                <p><span className='head'>Total Amount : </span><span>$ {calculateTotal(order.products)}</span></p>
                                                <p className='payment'><span className='head'>Payment status : </span><span className='payment-status'>Paid</span></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Order