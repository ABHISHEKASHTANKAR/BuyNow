import React, { useState } from 'react'
import axios from 'axios'
import google from '../../Assets/Social Media/Google.png'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { registerAPI } from '../../APIS'

const Register = () => {

    const Navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobileNo: "",
        address: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    }

    console.log(userData);

    const handleRegisterUser = async(e) => {
        e.preventDefault();
        if(userData.password !== userData.confirmPassword){
            enqueueSnackbar("Password and Confirmpassword should be same!!", {
                variant : "warning",
                anchorOrigin : {
                    vertical : "top",
                    horizontal : "center"
                }
            });
        }
        else if(userData.password.length === 0 || userData.address.length === 0 || userData.name.length === 0 || userData.email.length ===0 || userData.mobileNo === 0){
            enqueueSnackbar("All form fields are mandatory!!", {
                variant : "warning",
                anchorOrigin : {
                    vertical : "top",
                    horizontal : "center"
                }
            })
        }
        else{
            try{
                const response = await axios.post(registerAPI, {
                    name : userData.name,
                    email : userData.email,
                    address : userData.address,
                    password : userData.password,
                    mobileNo : userData.mobileNo
                })

                enqueueSnackbar("Registration Successfull!!", {
                    variant : "success",
                    anchorOrigin : {
                        vertical : "top",
                        horizontal : "center"
                    }
                })
                
                Navigate('/login');
            }
            catch(error){
                if(error.response){
                    enqueueSnackbar(error.response.data.error, {
                        variant : "error",
                        anchorOrigin : {
                            vertical : "top",
                            horizontal : "center"
                        }
                    })
                }
            }
        }
    }

    return (
        <div className='register'>
            <div className="register-container">
                <h4>Sign Up</h4>
                <form onSubmit={handleRegisterUser}>
                    <input type="text" className='input' placeholder='Name' onChange={handleChange} name='name' value={userData.name} />
                    <input type="email" className='input' placeholder='Email' onChange={handleChange} name='email' value={userData.email} />
                    <div style={{ display: "flex", columnGap: "0.8rem", width: "101.3%" }}>
                        <input type="password" className='input' placeholder='Password' onChange={handleChange} name='password' value={userData.password} />
                        <input type="password" className='input' placeholder='Confirm Password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} />
                    </div>
                    <input type="text" className='input' placeholder='Mobile Number' onChange={handleChange} name='mobileNo' value={userData.mobileNo} />
                    <input type="text" className='input' placeholder='Address' onChange={handleChange} name='address' value={userData.address} />
                    <button type='submit'>SIGN UP</button>
                </form>
                <div className="login-links">
                    <div className="google-btn">
                        <img src={google} alt="google-icon" />
                        <span>Sign In With Google</span>
                    </div>
                    <div>Already a User? <Link to='/login' className='link'>Sign In</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Register