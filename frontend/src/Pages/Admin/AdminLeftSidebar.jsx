import React from 'react'
import './AdminLeftSidebar.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



const LinkArr = [
    {
        title : "Account",
        link : "/admin"
    },
    {
        title : "Products",
        link : "/admin/products"
    },
    {
        title : "Orders",
        link : "/admin/orders"
    },
    {
        title : "Users",
        link : "/admin/users"
    },
    {
        title : "Merchants",
        link : "/admin/merchants"
    }
]


const AdminLeftSidebar = () => {
    const location = useLocation();
    
  return (
    <div className='admin-sidebar'>
        <h4>Admin Console</h4>
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

export default AdminLeftSidebar