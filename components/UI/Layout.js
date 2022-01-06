import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'


const Layout = ({children}) => {
    return (
        <main className='bg-gray-900 min-h-screen px-5 relative'>
            <div className="container pt-[15px] pb-10">
                <Header/>
                {children}
            </div>
            <Footer/>
        </main>
    )
}

export default Layout
