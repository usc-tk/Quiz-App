import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../State/Context.js';

function NavBar() {

    const { user, setUser, setToken } = useContext(Context);

    const logOut = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
    }


    return (
        <div className='w=[100%]  px-[5%] md:gap-0 gap-1 py-[15px] bg-primary-mid flex md:flex-row flex-col justify-between items-center'>
            <h1 className='font-bold text-[30px] text-text-main'>Quiz</h1>
            <div className="flex flex-row md:gap-20 sm:gap-10 gap-5 items-center">
                <Link to='/'><h3 className='font-medium text-xxs sm:text-xs text-text-main'>Home</h3></Link>
                <Link to="/leaderboard"><h3 className='font-medium text-xxs sm:text-xs  text-text-main'>Leader Board</h3></Link>
                {
                    !user ? <Link to='/log-in'><h3 className='font-medium text-xxs sm:text-xs  text-text-main'>Log In</h3></Link> : <>
                        <div className='flex flex-col justify-center'>
                            <h3 className='font-regular text-xxs  text-text-main'>Hi</h3>
                            <h3  className='font-medium text-xxs sm:text-xs  text-text-main'>{user?.name}</h3>
                        </div>
                        <h3 className='font-medium text-xxs sm:text-xs  text-text-main' onClick={logOut}>Log out</h3>
                    </>
                }

            </div>
        </div>
    )
}

export default NavBar
