import React, { useState, useEffect } from 'react'
import './ProductDetail.css';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/Slices/CartSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { placeOrder } from '../../Utils/PaymentFunction';
import { getProductByIdAPI } from '../../APIS';

const Products = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const [productDetail, setProductDetails] = useState({});
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const getProduct = async () => {
    const response = await axios.get(`${getProductByIdAPI}${params.id}`);
    setProductDetails(response.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const decreamentStyle = {
    color : quantity === 0 ? "#ccc" : "gold",
    cursor : quantity === 0 ? "not-allowed" : "pointer",
    opacity : quantity === 0 ? "0.5" : 1
  }

  const increamentQuantity = () => {
    console.log('btn-clicked');
    setQuantity((prevValue)=>{
      return prevValue + 1;
    })
  }

  const decreamentQuantity = () => {
    if(quantity === 0){
      return;
    }
    setQuantity((prevValue)=>{
      return prevValue - 1;
    })
  }

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  }

  const handleAddToCart = () =>{
    dispatch(addToCart({...productDetail, quantity : quantity}));
  }

  const handleBuyNow = (e) => {
    e.preventDefault();
    const prodArr = [{...productDetail, quantity : quantity}];
    console.log(prodArr);
    const amount = quantity * productDetail.price;
    placeOrder(amount, userLoggedIn, prodArr);
  }
  
  return (
    <div className='product-detail'>
      <div className="product-detail-left">
        <img className='product-img' src={productDetail.image} alt={"Product-img"} />
        <div className="sticker" style={{ display: productDetail.stock === 0 ? "none" : "block" }}>Out Of Stock</div>
      </div>
      <div className="product-detail-right">
        <div className="right-top">
          <h1 className="name">{productDetail.name}</h1>
          <p className='brand'>By - {productDetail.brand}</p>
          <h4 className='price'>$ {productDetail.price}</h4>
          <p className='description'>{productDetail.description}</p>
          <div id="input-div" className='input'>
            <label htmlFor="quantity">Quantity : </label>
            <div>
              <span className='decrement-btn' style={decreamentStyle}><AiFillMinusSquare onClick={decreamentQuantity}/></span>
              <input type="number" id='quantity' className='input' value={quantity} onChange = {handleChange}/>
              <span className='increament-btn'><AiFillPlusSquare onClick={increamentQuantity}/></span>
            </div>
          </div>
          <div className="btns">
            <button onClick={handleAddToCart}>Add To Bag</button>
            <button onClick={handleBuyNow}>Shop Now</button>
          </div>
        </div>
        <div className="right-bottom">

        </div>
      </div>
    </div>
  )
}

export default Products