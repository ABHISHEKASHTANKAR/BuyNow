import React, { useState } from 'react'
import google from '../../Assets/Social Media/Google.png'
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../Store/Slices/UserSlice';
import './Login.css'
import { loginAPI } from '../../APIS';

const Login = () => {

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleUserLogin = async (e) => {
        e.preventDefault();
        if (userData.email.length === 0) {
            enqueueSnackbar("Please Provide Email!!", {
                variant : "warning",
                anchorOrigin : {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
        if(userData.password.length === 0){
            enqueueSnackbar("Please Provide Password!!", {
                variant : "warning",
                anchorOrigin : {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
        else {
            try {

                const response = await axios.post(loginAPI, { email: userData.email, password: userData.password }, { withCredentials: true });

                if (response.status === 400) {
                    enqueueSnackbar('Can not login!!', {
                        variant: "error",
                    })
                }

                if (response.status === 200) {
                    enqueueSnackbar('Logged In Successfully!!', {
                        variant: "success"
                    })
                }

                setUserData((prevData) => {
                    return {
                        email: "",
                        password: "",
                    }
                })

                dispatch(setIsLoggedIn(true));

                localStorage.setItem('id' , JSON.stringify(response.data.user._id));

                Navigate(-1);

            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        enqueueSnackbar(error.response.data.error, {
                            variant: "warning",
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            autoHideDuration: 3000
                        })
                    }
                }
            }

        }
    }
    
    return (
        <div>
            <div className='register' style={{ minHeight: "67vh" }}>
                <div className="register-container">
                    <h4>SIGN IN</h4>
                    <form onSubmit={handleUserLogin}>
                        <input type="email" className='input' placeholder='Email' onChange={handleChange} name='email' value={userData.email} />
                        <input type="password" className='input' placeholder='Password' onChange={handleChange} name='password' value={userData.address} />
                        <button type='submit'>SIGN IN</button>
                    </form>
                    <div className="login-links">
                        <div className="google-btn" id='google-btn'>
                            <img src={google} alt="google-icon" />
                            <span>Sign In With Google</span>
                        </div>
                        <div className='register-btn'>Don't have an account? <Link to='/register' className='link'>Sign Up</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login