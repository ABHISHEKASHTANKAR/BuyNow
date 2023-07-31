import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./Categories.css"
import appliances from '../../Assets/categories/appliances.png'
import beauty from '../../Assets/categories/beauty.png'
import electronics from '../../Assets/categories/electronics.png'
import fashion from '../../Assets/categories/fashion.png'
import furniture from '../../Assets/categories/furniture.png'
import grocery from '../../Assets/categories/grocery.png'
import home from '../../Assets/categories/home.png'
import phone from '../../Assets/categories/phone.png'
import travel from '../../Assets/categories/travel.png'
import { useDispatch } from 'react-redux'
import { setSearchKeyword } from '../../Store/Slices/FilterSlice'
import { setCurrentPage } from '../../Store/Slices/PaginationSlice'



const catArr = [
    {
        name: "Mobiles",
        category : "Mobiles",
        pic: phone
    },
    {
        name: "Fashion",
        category : "Fashion",
        pic: fashion
    },
    {
        name: "Electronics",
        category : "Electronics",
        pic: electronics
    },
    {
        name: "Home",
        category : "Home",
        pic: home
    },
    {
        name: "Travel",
        category : "Fashion",
        pic: travel
    },
    {
        name: "Appliances",
        category : "Electronics",
        pic: appliances
    },
    {
        name: "Furniture",
        category : "Furniture",
        pic: furniture
    },
    {
        name: "Beauty, Toys and More",
        category : "Toys",
        pic: beauty
    },
    {
        name: "Grocery",
        category : "Grocery",
        pic: grocery
    }
]

const Categories = () => {

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (category) => {
        dispatch(setSearchKeyword(category));
        dispatch(setCurrentPage(1));
        Navigate('/shop');
    }

    return (
        <div className='category-container'>
            {
                catArr.map((item, index) => {
                    return (
                        <div className='category'  key={index} onClick={() => handleClick(item.category)}>
                            <div className='cat-img'>
                                <img draggable="false" src={item.pic} alt={item.name} />
                            </div>
                            <span >{item.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Categories