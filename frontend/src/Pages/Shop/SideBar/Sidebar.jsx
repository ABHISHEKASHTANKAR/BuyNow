import React from 'react'
import './Sidebar.css'
import PriceFilter from './PriceFilter'
import RatingFilter from './RatingFilter'
import CategoryFilter from './CategoryFilter'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <PriceFilter/>
        <RatingFilter/>
        <CategoryFilter/>
    </div>
  )
}

export default Sidebar