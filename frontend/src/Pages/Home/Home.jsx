import React, {useState, useEffect} from 'react'
import './Home.css'
import Banner from './Banner'
import Categories from './Categories'
import ProductSlider from '../../Components/ProductSlider/ProductSlider'
import { getRandomProducts } from '../../Utils/Function'
import axios from 'axios';
import { getProductsAPI } from '../../APIS'


const Home = () => {
  const [prodArr, setProdArr] = useState([]);

  useEffect(()=>{
    const getData = async() => {
      const response = await axios.get(getProductsAPI);
      setProdArr(response.data);
    }

    getData();
  }, []);

  
  return (
    <div className='Home'>
        <Categories />
        <Banner />
        <ProductSlider title = {"Best Deals For You!!"} prodArr={getRandomProducts(prodArr, 15)} type={0}/>
        <ProductSlider title = {"Latest Collections!!"} prodArr={getRandomProducts(prodArr, 15)} type={1}/>
    </div>
  )
}

export default Home