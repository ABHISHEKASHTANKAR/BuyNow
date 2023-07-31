import React from 'react'
import ProfileLeftSidebar from './ProfileLeftSidebar'
import ProfileRightSide from './ProfileRightSide'
import './Profile.css'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const params = useParams();

  const infoType = params.info;

  return (
    <div className="profile">
        <div className="admin-left">
            <ProfileLeftSidebar />
        </div>
        <div className="profile-right">
            <ProfileRightSide type = {infoType}/>
        </div>
    </div>
  )
}

export default Profile