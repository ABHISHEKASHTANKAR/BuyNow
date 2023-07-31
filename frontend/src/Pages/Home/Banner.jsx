import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import "swiper/css/navigation";
import './Banner.css'

import { Autoplay, Pagination, Navigation } from 'swiper';




import gadgetSale from '../../Assets/banners/gadget-sale.jpg';
import kitchenSale from '../../Assets/banners/kitchen-sale.jpg';
import poco from '../../Assets/banners/poco-m4-pro.webp';
import realme from '../../Assets/banners/realme-9-pro.webp';
import fashionSale1 from '../../Assets/banners/fashionsale.jpg';
import fashionSale2 from '../../Assets/banners/fashion-sale.webp';
import oppo from '../../Assets/banners/oppo-reno7.webp';


const Banner = () => {
    return (
        <div className='banner-container'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                loop={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}

                className="mySwiper"
            >
                <SwiperSlide className='img-container'>
                    <img src={realme} alt="realme" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={fashionSale1} alt="fashionSale1" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={poco} alt="poco" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={gadgetSale} alt="gadgetSale" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={oppo} alt="oppo" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={kitchenSale} alt="kitchenSale" className='banner-img' />
                </SwiperSlide>
                <SwiperSlide className='img-container'>
                    <img src={fashionSale2} alt="fashionSale2" className='banner-img' />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner