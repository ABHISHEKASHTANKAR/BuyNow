import React from 'react'
import './BrandsModal.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from '../../Store/Slices/FilterSlice';

const BrandsModal = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(setSearchKeyword(e.target.id));
        Navigate('/shop');
    }
  return (
    <div className='brands'>
        <div className="top">
            <h3>Shop By Brand</h3>
            <Link className = 'normal-link' to="/brands">See All</Link>
        </div>
        <hr />
        <div className="bottom">
            <div className="left">
                <div id='gucci' className='brand-item' onClick={handleClick}>Gucci</div>
                <div id='sony' className='brand-item' onClick={handleClick}>Sony</div>
                <div id='samsung' className='brand-item' onClick={handleClick}>Samsung</div>
                <div id='nike' className='brand-item' onClick={handleClick}>Nike</div>
            </div>
          
            <div className="right">
                <div id='calvin' className='brand-item' onClick={handleClick}>Calvin Klein</div>
                <div id='fastrack' className='brand-item' onClick={handleClick}>Fastrack</div>
                <div id='apple' className='brand-item' onClick={handleClick}>Apple</div>
                <div id='one plus' className='brand-item' onClick={handleClick}>One Plus</div>                
            </div>
        </div>
    </div>
  )
}

export default BrandsModal