import React, { useState, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'

import './Cart.css'

import { useSelector, useDispatch } from 'react-redux'
import { closeCart } from '../../Store/Slices/CartSlice';

import emptycart from '../../Assets/empty-cart.png';
import Product from '../Product/Product.jsx';
import { calculateTotal } from '../../Utils/Function';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../Utils/PaymentFunction';


const Cart = () => {

  const Navigate = useNavigate();

  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const isActive = useSelector((state) => state.cart.open);
  const cartItems = useSelector((state) => state.cart.cartArr);


  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();
  const handleCloseCart = () => {
    return dispatch(closeCart());
  }

  useEffect(() => {
    setTotalAmount(calculateTotal(cartItems));
  }, [cartItems]);

  const handleShopping = () => {
    Navigate('/shop');
  }
  return (
    <div className={isActive ? 'cart-container cart-active' : 'cart-container'}>
      <div className="cart-top">
        <h4>Your Cart</h4>
        <div className="close-btn">
          <RxCross2 onClick={handleCloseCart} />
        </div>
      </div>
      <div className="cart-mid">
        {
          cartItems.length === 0
            ?
            <div className="empty-cart">
              <img src={emptycart} alt="" />
              <h3>YOUR CART IS EMPTY</h3>
              <p>Add your favourite products to cart!!</p>
            </div>
            :
            <div className="non-empty-cart">
              {
                cartItems.map((item) => {
                  return (
                    <Product {...item} key={item.id} isCart={true} />
                  )
                })
              }
            </div>
        }
      </div>
      {
        cartItems.length !== 0
        &&
        <>
          <div className="cart-bottom">
            <p className="text">Free Shipping <p>$ 0</p></p>
            <p className="text">Total <p>$ {totalAmount}</p></p>
          </div>
          <div className="cart-buttons">
            <button onClick={() => placeOrder(totalAmount, userLoggedIn, cartItems)}>Place Order</button>
            <button onClick={handleShopping}>Continue Shopping</button>
          </div>
        </>
      }
    </div>
  )
}

export default Cart