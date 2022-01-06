import React from 'react'
import Link from 'next/link'
import EmptyBlogs from '../UI/EmptyBlogs'
import Router from 'next/router'

const Blogs = ({data, handleDeleteBlog}) => {

    

    return (
        data?.data?.length > 0 ? data?.data?.map(({attributes: data, id}, idx) => (
            <div className='flex-between mb-3 text-blue-300' key={id}>
                <div className="flex-grow flex items-center space-x-3">
                    <p>{idx + 1}.</p>
                    <h1 className='font-medium cursor-pointer' onClick={() => Router.push(`/${id}`)}>{data.title}</h1>
                </div>
                <div className='flex items-center space-x-4'>
                    <button className='btn py-[6px] px-[8px] bg-red-500 hover:bg-red-600 text-sm' onClick={() => handleDeleteBlog(id, data.imageURL)}>delete</button>
                </div>
            </div>
        )) : (
            <div className='flex items-center justify-center flex-col'>
                <EmptyBlogs/>
                <Link href="/add-blog">
                    <a className='text-blue-300 underline mt-5'>Add Blog Now</a>
                </Link>
            </div>
        )
    )
}

export default Blogs
