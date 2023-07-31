import React from 'react'
import { Link } from 'react-router-dom'
import './ProductSlider.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import Product from './Product';
import background1 from '../../Assets/banners/slider-img.png'
import background2 from '../../Assets/banners/slider-img(2).png'


import 'swiper/css'
import "swiper/css/navigation";
import { Navigation} from 'swiper';


const ProductSlider = ({ title, prodArr , type}) => {
  return (
    <div className='product-slider'>
      <div className="left">
        {
          type === 0 
          ?
          <img src={background1} alt="" />
          :
          <img src={background2} alt=""/>
        }
        <h1>{title}</h1>
        <Link className='v-btn' to='/shop'>View All</Link>
      </div>
      <div className="right">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {
            prodArr.map((item, index) => {
              return (
              <SwiperSlide key={index}>
                <Product {...item} />
              </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  )
}

export default ProductSlider