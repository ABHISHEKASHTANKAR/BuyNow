import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Store/Slices/CartSlice';

import "./ShopProduct.css";
import { shortenString } from '../../Utils/Function';
import { BsStarFill, BsHeartFill } from 'react-icons/bs';

import { useSnackbar } from 'notistack';



const ShopProduct = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { name, image, price, description, rating } = props;

  const [isActive, setIsActive] = useState(false);

  const newName = shortenString(name, 15);
  const newDesciption = shortenString(description, 70);

  const handleHeartClick = () => {
    if (!isActive) {
      // dispatch(addToCart(props));
      // enqueueSnackbar('Item added to your wishlist ❤️ successfully!',
      //   {
      //     variant: 'success',
      //   }
      // );
    }
    else {
      // dispatch(removeFromCart(props.id));
      // enqueueSnackbar('Item removed from your wishlist 💛 successfully!',
      // {
      //   variant: 'error',
      // }
      // );
    }
    setIsActive((prevState) => {
      return !prevState;
    })
  }

  return (
    <Link to={`/products/${props._id}`}   className='shop-product'>
      <div className="product-img">
        <img src={image} alt="product-img" />
      </div>
      <div className="title">
        {newName}
      </div>
      <div className="desc">
        {newDesciption}
      </div>
      <div className="price-rating">
        <div className="price">{price} $</div>
        <div className="rating">{rating} <BsStarFill className='star-icon' /></div>
      </div>
      <div className={isActive ? "heart active" : "heart"} onClick={handleHeartClick}>
        <BsHeartFill className='heart-icon' />
      </div>
    </Link>
  )
}

export default ShopProduct