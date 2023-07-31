import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { NavLink, Link } from 'react-router-dom'
import { BsChevronUp } from 'react-icons/bs'
import { GiShoppingBag } from 'react-icons/gi'
import './Navbar.css'
import BrandsModal from './BrandsModal'
import UserModal from './UserModal'
import Cart from '../Cart/Cart'


import { useSelector, useDispatch } from 'react-redux';
import { openCart } from '../../Store/Slices/CartSlice'
import { getToken } from '../../Utils/LoginStatus'
import { firstName } from '../../Utils/Function'
import { getUserAPI } from '../../APIS'
import Searchbar from './Searchbar'

const Navbar = () => {

  const dispatch = useDispatch();
  const brandsRef = useRef(null);
  const userRef = useRef(null);


  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const noOfCartItems = useSelector((state) => state.cart.cartArr.length);

  const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [toggleBrandsDropdown, setToggleBrandsDropdown] = useState(false);
  const [user, setUser] = useState({ name: "" });

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

  useEffect(() => {
    getUser();
  }, [userLoggedIn]);

  const handleOpenCart = () => {
    dispatch(openCart());
  }

  const handleUserDropdownClick = () => {
    setToggleUserDropdown((prevstate) => {
      return !prevstate;
    })
  }


  const handleBrandsDropdownClick = () => {
    setToggleBrandsDropdown((prevstate) => {
      return !prevstate;
    })
  }

  const OutisideClickHandler = (ref) => {
    useEffect(() => {
      const handleOutSideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target) && e.target.id !== 'brands') {
          setToggleBrandsDropdown(false);
        }

        if(ref.current && !ref.current.contains(e.target) && e.target.id !== 'user-modal'){
          setToggleUserDropdown(false);
        }        
      }

      document.addEventListener('click', handleOutSideClick);

      return () => document.removeEventListener('click', handleOutSideClick);

    }, [ref]);
  }
  OutisideClickHandler(brandsRef);
  OutisideClickHandler(userRef);
  return (
    <div className='navbar'>
      <Link className="logo" to="/">
        <h1>Buy<span>Now.</span></h1>
      </Link>
      <Searchbar />
      <div className="menu">
        <NavLink className='menu-item' to='shop'> Shop </NavLink>
        <div id="brands" className='menu-item' onClick={handleBrandsDropdownClick}> Brands <span className={toggleBrandsDropdown ? "arrow-icon-up" : "arrow-icon-down"}><BsChevronUp className='arrow-icon-up' /> </span></div>
        {toggleBrandsDropdown && <div ref={brandsRef} className='brands-modal'><BrandsModal /></div>}
        <div id='user-modal' className='menu-item' onClick={handleUserDropdownClick}> {userLoggedIn ? firstName(user.name) : "User"} <span className={toggleUserDropdown ? "arrow-icon-up" : "arrow-icon-down"}><BsChevronUp className='arrow-icon-up' /></span> </div>
        {toggleUserDropdown &&<div ref={userRef} className='user-modal'><UserModal /></div>}
      </div>
      <div className="cart">
        {noOfCartItems > 0 && <span className='cart-items'>{noOfCartItems}</span>}
        <GiShoppingBag className='cart-icon' onClick={handleOpenCart} />
        <Cart />
      </div>
    </div>
  )
}

export default Navbar