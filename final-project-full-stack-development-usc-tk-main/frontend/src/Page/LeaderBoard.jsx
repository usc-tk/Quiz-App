import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LeaderBoard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getLeaderBoard = async () => {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/leadboard/get`);
            setData(response.data);
        }
        getLeaderBoard();
    }, []);

    const convertDate = (timestamp) => {

        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    return (
        <div className='flex flex-col w-[100%] px-[5%] items-center py-[30px] gap-[30px]'>
            <h1 className='md:text-lg text-md text-text-mid font-semibold'>Leader Board</h1>
            {
                data.map((curr, indx) => {
                    if (indx == 0) {
                        return (
                            <div className='flex flex-row items-center  '>
                                <div className='flex flex-col justify-center items-center bg-primary-mid px-5 py-[10px] h-[150px]'>
                                    <h3 className='md:text-md text-sm'>Rank</h3>
                                    <h1 className='text-text-mid font-semibold md:text-[50px] text-[30px]'>{indx + 1}</h1>
                                </div>
                                <div className='flex flex-col  items-center justify-center bg-primary-mid px-5 py-[10px] h-[150px]'>
                                    <h3 className='md:text-md text-sm'>Total Score</h3>
                                    <h1 className='text-text-mid font-semibold md:text-[50px] text-[30px]'>{+ curr?.score + " pts"}</h1>
                                </div>
                                <div key={indx} className='flex flex-col justify-center bg-secondary-mid px-5 py-[10px] h-[150px]'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-user text-text-mid md:text-[50px] text-[30px]"></i>
                                        <h1 className='md:text-lg text-md font-medium'>{curr?.name}</h1>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-envelope  text-text-mid text-lg"></i>
                                        <h2 className='text-text-mid text-sm'>{curr?.email}</h2>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'><i className
                                        ="uil uil-calender text-text-mid text-lg"></i> <h3
                                            className='text-text-mid text-xs'>{convertDate(parseInt(curr?.date))}</h3></div>
                                </div>
                            </div>
                        )
                    }
                    else if (indx <= 4) {
                        return (
                            <div className='flex flex-row   items-center'>
                                <div className='flex flex-col justify-center items-center bg-primary-mid px-5 py-[10px] h-[150px]'>
                                    <h3>Rank</h3>
                                    <h1 className='text-text-mid font-semibold text-xl'>{indx + 1}</h1>
                                </div>
                                <div className='flex flex-col  items-center justify-center bg-primary-mid px-5 py-[10px] h-[150px]'>
                                    <h3>Total Score</h3>
                                    <h1 className='text-text-mid font-semibold text-xl'>{+ curr?.score + " pts"}</h1>
                                </div>
                                <div key={indx} className='flex flex-col justify-center bg-secondary-mid px-5 py-[10px] h-[150px]'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-user text-text-mid text-xl"></i>
                                        <h1 className='text-md font-medium'>{curr?.name}</h1>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-envelope  text-text-mid text-md"></i>
                                        <h2 className='text-text-mid text-xs'>{curr?.email}</h2>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'><i className
                                        ="uil uil-calender text-text-mid text-md"></i> <h3
                                            className='text-text-mid text-xxs'>{convertDate(parseInt(curr?.date))}</h3></div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className='flex flex-row items-center'>
                                <div className='flex flex-col justify-center items-center bg-primary-mid px-5 py-[5px] h-[150px]'>
                                    <h3 className='text-xxs'>Rank</h3>
                                    <h1 className='text-text-mid font-semibold text-lg'>{indx + 1}</h1>
                                </div>
                                <div className='flex flex-col  items-center justify-center bg-primary-mid px-5 py-[5px] h-[150px]'>
                                    <h3 className='text-xxs'>Total Score</h3>
                                    <h1 className='text-text-mid font-semibold text-lg'>{+ curr?.score + " pts"}</h1>
                                </div>
                                <div key={indx} className='flex flex-col justify-center bg-secondary-mid px-5 py-[5px] h-[150px]'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-user text-text-mid text-lg"></i>
                                        <h1 className='text-sm font-medium'>{curr?.name}</h1>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'>
                                        <i className="uil uil-envelope  text-text-mid text-sm"></i>
                                        <h2 className='text-text-mid text-xxs'>{curr?.email}</h2>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'><i className
                                        ="uil uil-calender text-text-mid text-sm"></i> <h3
                                            className='text-text-mid text-xxs'>{convertDate(parseInt(curr?.date))}</h3></div>
                                </div>
                            </div>
                        )
                    }

                }
                )
            }
        </div>
    )
}

export default LeaderBoard
