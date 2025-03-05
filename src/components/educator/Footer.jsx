import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='flex flex-col items-center justify-between w-full px-8 text-left border-t md:flex-row-reverse'>
            <div className='flex items-center gap-4'>
                <img src={assets.logo} alt="logo" className='hidden w-20 md:block' />
                <div className='hidden w-px md:block h-7 bg-gray-500/60'></div>
                <p className='py-4 text-xs text-center text-gray-500 md:text-sm'>Copyright 2025 © LMS. All Right Reserved.</p>
            </div>
            <div className='flex items-center gap-3 max-md:mt-4'>
                <a href="#">
                    <img src={assets.facebook_icon} alt="facebook" />
                </a>
                <a href="#">
                    <img src={assets.twitter_icon} alt="twitter" />
                </a>
                <a href="#">
                    <img src={assets.instagram_icon} alt="instagram" />
                </a>
            </div>
        </footer>
    )
}

export default Footer