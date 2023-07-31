import React, { useEffect, useState } from 'react'
import './Account.css'
import axios from 'axios';
import { getToken } from '../../Utils/LoginStatus';
import { FaUserEdit } from 'react-icons/fa'
import { enqueueSnackbar } from 'notistack';
import { getUserAPI, updateUserAPI } from '../../APIS';


const Account = () => {

    const [user, setUser] = useState({});

    const getUser = async () => {
        const id = JSON.parse(localStorage.getItem('id'));
        const token = getToken();
        const response = await axios.get(`${getUserAPI}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setUser(response.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (e) => {
        setUser((prevData)=>{
            return {
                ...prevData,
                [e.target.name] : e.target.value,
            }

        })
    }

    const handleEditAccount = async(e) => {
        e.preventDefault();
        try{
            const token = getToken();
            const response = await axios.put(`${updateUserAPI}${user._id}`, user, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            if(response.status === 403){
                enqueueSnackbar("Your session has expired please login once again!!", {
                    variant : "error",
                    anchorOrigin : {
                        vertical : "top",
                        horizontal : "right"
                    }
                })
            }
            if(response.status === 200){
                enqueueSnackbar("Profile Updated Successfully!!", {
                    variant : "success",
                    anchorOrigin : {
                        vertical : "top",
                        horizontal : "right"
                    }
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='account'>
            <div className="account-top">
                <h4>Welcome {user.name} !!</h4>
                <div className='user-icon'><FaUserEdit/></div>
            </div>
            <div className="account-bottom">
                <form onSubmit={handleEditAccount}>
                    <div className="form">
                    <div>
                        <label htmlFor="name">Name : </label>
                        <input id='name' className='input' type="text" value={user.name} onChange={handleChange} name="name"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input id='email' className='input' type="text" value={user.email} onChange={handleChange} name="email"/>
                    </div>
                    <div>
                        <label htmlFor="mobile-no">Mobile No : </label>
                        <input id='mobile-no' className='input' type="text" value={user.mobileNo} onChange={handleChange} name="mobileNo"/>
                    </div>
                    <div>
                        <label htmlFor="address">Address : </label>
                        <input id='address' className='input' type="text" value={user.address} onChange={handleChange} name="address"/>
                    </div>
                    </div>
                    <div className="btn" style={{margin : "auto"}}>
                        <button type='submit'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Account