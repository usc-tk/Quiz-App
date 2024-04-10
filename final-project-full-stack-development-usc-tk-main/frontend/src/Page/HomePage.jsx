import React from 'react';
import { useContext } from 'react';
import { Context } from '../State/Context.js';
import { Link } from 'react-router-dom';


function HomePage() {

    const { user } = useContext(Context);

    return (
        <div className='flex relative overflow-hidden items-center flex-col justify-center w-[100%] h-[calc(100vh-75px)]'>
            <div style={{zIndex:2}} className='flex flex-col items-center md:w-[50%] w-[80%] gap-[20px]'>
                <p className='align-center text-center text-xs font-regular text-text-light'>Welcome to Quiz, the ultimate destination for challenging your knowledge! Get ready to test your wits, have fun, and learn something new. Our carefully crafted quizzes cover a wide range of topics, from history and science to pop culture and sports. Whether you're a trivia enthusiast or simply looking to pass the time, our engaging questions and diverse categories will keep you entertained. So, buckle up and let the quizzing begin!</p>
                <h1 className='align-center text-center text-sm font-medium text-text-main'>Click on Start Quiz to begin</h1>
               <Link to={user ? '/begin' : '/log-in'}> <button  className=' bg-primary-light hover:bg-primary-mid w-[200px] py-[10px] rounded-[10px] text-sm font-medium'>Start Quiz</button></Link>
            </div>
            <svg className='z-0 absolute w-[1500px] opacity-90 -bottom-[250px]'
                width={1928}
                height={1088}
                viewBox="0 0 1928 1088"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_262_4)">
                    <mask
                        id="mask0_262_4"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={4}
                        y={0}
                        width={1920}
                        height={1080}
                    >
                        <rect x={4} width={1920} height={1080} fill="#FEFDFD" />
                    </mask>
                    <g mask="url(#mask0_262_4)">
                        <path
                            d="M185 658C65.2438 624.421 -183 798.167 -217 894.5L-171 1162.5L1857 1197.5C1870 1092.83 1948.2 843.1 1917 795.5C1878 736 1705.5 619 1589 619C1464.02 619 1279.03 680.132 1088 795.5C732 1010.5 386.5 714.5 185 658Z"
                            fill="#D68FFF"
                        />
                        <path
                            d="M319.5 704C199.744 670.421 -48.5 844.167 -82.5 940.5L-36.5 1208.5L1991.5 1243.5C2004.5 1138.83 2082.7 889.1 2051.5 841.5C2012.5 782 1840 665 1723.5 665C1598.52 665 1413.53 726.132 1222.5 841.5C866.5 1056.5 521 760.5 319.5 704Z"
                            fill="#8402CF"
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_d_262_4"
                        x={0}
                        y={619}
                        width={1928}
                        height={469}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_262_4"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_262_4"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>


        </div>
    )
}

export default HomePage
