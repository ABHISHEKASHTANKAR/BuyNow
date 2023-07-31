import React from 'react'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import './Footer.css'
import whatsapp from '../../Assets/Social Media/whatsapp-icon.png'
import instagram from '../../Assets/Social Media/instagram-icon.png'
import facebook from '../../Assets/Social Media/facebook-icon.png'
import twitter from '../../Assets/Social Media/twitter-icon.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="footer-top">
        <div className="left">
          <h3>CUSTOMER SERVICE</h3>
          <div className="link-container">
            <Link to="/" className='link'>Contact Us</Link>
            <Link to="/" className='link'>Sell With Us</Link>
            <Link to="/" className='link'>Shipping</Link>
          </div>
        </div>
        <div className="mid">
          <h3>LINKS</h3>
          <div className="link-container">
            <Link to="/" className='link'>Your Cart</Link>
            <Link to="/" className='link'>Your Orders</Link>
            <Link to="/" className='link'>Log Out</Link>
          </div>
        </div>
        <div className="right">
          <h3>NEWSLETTER</h3>
          <div className="newsletter">
            <span>Sign Up for Our Newsletter</span>
            <div className="email-input"><input type="text" placeholder='Please Enter Your Email'/><button>SUBSCRIBE</button></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="copyright"><AiOutlineCopyrightCircle className='copyright-icon' /> <span> Mern Ecomm Personal Project By - (AshAbhi) !!</span></div>
        <div className="social-media">
          <img className='media-icon' src={whatsapp} alt='whatsapp-icon' />
          <img className='media-icon' src={instagram} alt='instagram-icon' />
          <img className='media-icon' src={facebook} alt='facebook-icon' />
          <img className='media-icon' src={twitter} alt='twitter-icon' />
        </div>
      </div>
    </div>
  )
}

export default Footer