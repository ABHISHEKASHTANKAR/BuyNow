import React from 'react'
import Account from '../../Components/Account/Account'
import Order from '../../Components/Orders/Order'

const ProfileRightSide = (props) => {
  return (
    <div className='profile-right-contents'>
      {(props.type === undefined) && <Account />} 
      {(props.type === 'orders') && <Order/>}
    </div>
  )
}

export default ProfileRightSide