import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './UserModal.css'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../Store/Slices/UserSlice'
import { getToken } from '../../Utils/LoginStatus'
import { logoutAPI, getUserAPI } from '../../APIS'

const UserModal = () => {

  const [user, setUser] = useState({});
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(logoutAPI, { withCredentials: true });
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          }
        })
        dispatch(setIsLoggedIn(false));
        localStorage.removeItem('id');
        Navigate('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getUser = async () => {
    if (userLoggedIn) {
      let id = JSON.parse(localStorage.getItem('id'));
      const token = getToken();
      const response = await axios.get(`${getUserAPI}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    }
  }

  useEffect(() => {
    getUser();
  }, [userLoggedIn]);

  return (
    <div className='user-modal'>
      {
        !userLoggedIn ?
          <NavLink className="user-item" to='/register'>
            Sign Up
          </NavLink>
          :
          user.role === 'admin' ?
          <NavLink className="user-item" to='/admin'>
            Admin
          </NavLink>
            :
          <NavLink className="user-item" to='profile'>
            Profile
          </NavLink>
      }
      {
        userLoggedIn ?
          <div className="user-item" onClick={handleLogOut}>
            Logout
          </div>
          :
          <NavLink className="user-item" to='/login'>
            Sign In
          </NavLink>
      }
    </div>
  )
}

export default UserModal