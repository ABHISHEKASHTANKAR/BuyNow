import React from 'react'
import './ProfileLeftSidebar.css';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const LinkArr = [
    {
        title : "Account",
        link : "/profile"
    },
    {
        title : "Orders",
        link : "/profile/orders"
    },
    {
        title : "Wishlist",
        link : "/profile/wishlist"
    }
]

const ProfileLeftSidebar = () => {

    const location = useLocation();

  return (
    <div className='profile-sidebar'>
        <h4>Account Details</h4>
        {LinkArr.map((item, index)=>{
            return(
            <Link to={item.link} className={location.pathname === item.link ? "link-item link-item-active" : "link-item"} key={index}>
                <span className='title'>
                    {item.title}
                </span>
            </Link>
            )
        })}
    </div>
  )
}

export default ProfileLeftSidebar