import React, { useState } from 'react'
import Link from 'next/link'
import SearchInput from './SearchInput'
import { FiMenu } from 'react-icons/fi'
import { useData } from '../../context/context'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false)
    const { user, handleLogout } = useData()

    const handleClick = () => {
        setIsOpen(false)
    }

    return (
        <header className='flex flex-col space-y-4 text-white font-medium'>
            <div className='flex-between space-x-5'>
                <div className='flex items-center flex-grow lg:space-x-5 xl:space-x-10'>
                    <h1 className='text-[30px]'>StrapiBlogs</h1>
                    <nav className='hidden flex-grow lg:flex-between mt-1'>
                        <div className='flex items-center lg:space-x-3 xl:space-x-5'>
                            <Link href="/">
                                <a onClick={handleClick} className='link'>Homepage</a>
                            </Link>
                            {user?.username === 'admin' && (
                                <Link href="/dashboard">
                                    <a onClick={handleClick} className='link'>Dashboard</a>
                                </Link>
                            )}
                            {user && (
                                <Link href="/add-blog">
                                    <a onClick={handleClick} className='link'>Add Blog</a>
                                </Link>
                            )}
                            <Link href="/contact">
                                <a onClick={handleClick} className='link'>Contact</a>
                            </Link>
                            {!user ? (
                                <Link href="/signin">
                                    <a onClick={handleClick} className='link'>Sign In</a>
                                </Link>
                            ) : (
                                <p className='link cursor-pointer text-red-500 hover:text-red-600' onClick={handleLogout}>Logout</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-5">
                            <SearchInput/>
                            {user && (
                                user?.username === 'admin' ? (
                                    <p className='inline-flex lg:hidden'>{user?.username}</p>
                                ) : (
                                    <div className='bg-gray-500 h-[40px] w-[40px] rounded-full flex items-center justify-center text-center'>
                                        <p>{user?.username[0].toUpperCase()}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </nav>
                </div>    
                <FiMenu className='block lg:hidden text-xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
                {user && (
                    user?.username === 'admin' ? (
                        <p>{user?.username}</p>
                    ) : (
                        <div className='bg-gray-500 h-[40px] w-[40px] rounded-full flex lg:hidden items-center justify-center text-center'>
                            <p>{user?.username[0].toUpperCase()}</p>
                        </div>
                    )
                )}
            </div>
            {isOpen && (
                <nav className='flex flex-col space-y-3 lg:hidden'>
                    <div className="flex items-center space-x-5">
                        <SearchInput mobile/>
                    </div>
                    <div className='flex items-center flex-wrap'>
                        <Link href="/">
                            <a onClick={handleClick} className='link mr-5 mb-2'>Homepage</a>
                        </Link>
                        {user?.username === 'admin' && (
                            <Link href="/dashboard">
                                <a onClick={handleClick} className='link mr-5 mb-2'>Dashboard</a>
                            </Link>
                        )}
                        {user && (
                            <Link href="/add-blog">
                                <a onClick={handleClick} className='link mr-5 mb-2'>Add Blog</a>
                            </Link>
                        )}
                        <Link href="/contact">
                            <a onClick={handleClick} className='link mr-5 mb-2'>Contact</a>
                        </Link>
                        {!user ? (
                            <Link href="/signin">
                                <a onClick={handleClick} className='link mr-5 mb-2'>Sign In</a>
                            </Link>
                        ) : (
                            <p className='link mr-5 mb-2 cursor-pointer text-red-500 hover:text-red-600' onClick={handleLogout}>Logout</p>
                        )}
                    </div>
                </nav>
            )}
        </header>
    )
}


export default Header
