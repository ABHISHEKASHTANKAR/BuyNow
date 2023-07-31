import React from 'react'
import './Admin.css'
import { useParams } from 'react-router-dom'
import AdminRightSide from './AdminRightSide'
import AdminLeftSidebar from './AdminLeftSidebar'

const Admin = () => {
    const params = useParams();
    const infoType = params.info;
  return (
    <div className="admin">
        <div className="admin-left">
            <AdminLeftSidebar />
        </div>
        <div className="admin-right">
            <AdminRightSide type={infoType}/>
        </div>
    </div>
  )
}

export default Admin