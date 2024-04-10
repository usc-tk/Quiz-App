import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {Context } from '../State/Context.js';
import axios from 'axios'

function LogIn() {


    const { setToken } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: null, password: null });
    const [error, setError] = useState(null);

    const logIn = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.email == null) {
            setError("Email is required");
        } else if (formData.password == null) {
            setError("Password is required");
        }
        else {
            try {
                const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/user/login/`, { ...formData });
                if (res.data.message) {
                    setError(res.data.message);
                }
                if (res.data.token) {
                    localStorage.setItem('user',`${res.data.token}`);
                    setToken(res.data.token);
                    navigate("/")
                }
                
            } catch (e) {
                console.log(e);
            }
        }
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className='flex justify-center items-center bg-primary-mid w-[100%] h-[100vh] flex-col'>
            <form className='w-[450px] bg-secondary-light  px-[2%] py-[30px] flex flex-col rounded-sm'>
                <h1 className='font-semibold text-xl text-text-mid'>Sign In</h1>
                <div className='flex flex-col gap-[20px] mt-10'>
                    <div>
                        <p className='text-xxs text-text-light font-medium'>User Email *</p>
                        <input placeholder='joedoe@gmail.com' className='bg-secondary-light text-text-light w-[100%] px-[2%] py-[5px] text-xxs outline-none border-secondary-main border-[1px] rounded-md' type='email' name='email' onChange={onChange} />
                    </div>
                    <div>
                        <p className='text-xxs text-text-light font-medium'>Password *</p>
                        <input placeholder='******' className='bg-secondary-light text-text-light w-[100%] px-[2%] py-[5px] text-xxs outline-none border-secondary-main border-[1px] rounded-md' type='password' name='password' onChange={onChange} />
                    </div>
                    {
                        error ? <p className='text-xxs text-fail font-medium'>{error}</p> : <></>
                    }
                    <button type='submit' className='bg-primary-light hover:bg-primary-mid w-[100%] py-[5px] rounded-md text-text-main text-xs' onClick={logIn}>Log in</button>
                </div>
                <Link to={'/sign-up'} className='mt-[10px]'><p className='text-xxs text-text-light font-medium'>Doesn't have account?</p></Link>
            </form>
            <Link to={"/"} className='ms-[350px] mt-[10px] font-medium text-text-main'>Back</Link>
        </div>
    )
}

export default LogIn
