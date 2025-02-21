import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const isCourseListPage = location.pathname.includes('/course-list');
    return (
        <div className={`flex items-start justify-between px-4 py-4 border-b border-gray-500 sm:px-10 md:px-14 lg:px-36 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img src={assets.logo} alt="Logo" className='cursor-pointer w-28 lg:w-32' />
            <div className='items-center hidden gap-5 text-gray-500 md:flex'>
                <div className='flex items-center gap-5'>
                    <button>Become Educator</button> |
                    <Link to='/my-enrollments'> My Enrollments</Link>
                </div>
                <button className='px-5 py-2 text-white bg-blue-600 rounded-full'>Create Account</button>
            </div>
            
            <div className='flex items-center gap-0 text-gray-500 md:hidden sm:gap-5'>
                <div>
                    <button>Become Educator</button> |
                    <Link to='/my-enrollments'> My Enrollments</Link>
                </div>
                <button><img src={assets.user_icon} alt="" /></button>
            </div>
        </div>
    )
}

export default Navbar