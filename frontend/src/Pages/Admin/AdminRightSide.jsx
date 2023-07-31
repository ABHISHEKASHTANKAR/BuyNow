import React from 'react'
import './AdminRightSide.css'
import AdminProducts from './ProductsTable/AdminProducts';
import Account from '../../Components/Account/Account'
import Order from './../../Components/Orders/Order';

const AdminRightSide = (props) => {
  return (
    <div className='admin-forms'>
      {(props.type === undefined) && <Account />}
      {(props.type === "products") && <AdminProducts />} 
      {(props.type === "orders") && <Order />}
    </div>
  )
}

export default AdminRightSide