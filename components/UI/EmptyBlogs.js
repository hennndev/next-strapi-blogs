import React from 'react'

const EmptyBlogs = ({title = 'Oops Sorry, Not Blogs Anymore Today :('}) => {
    return (
        <div className='flex items-center justify-center mt-40'>
            <div className='bg-gray-600 p-5 rounded'>
                <h1 className='text-white text-xl text-center'>{title}</h1>
            </div>
        </div>
    )
}

export default EmptyBlogs
