import React from 'react'
import moment from 'moment'
import EmptyBlogs from '../UI/EmptyBlogs'

const Messages = ({data, handleDeleteBlog}) => {
    return (
        data?.data?.length > 0 ? data?.data?.map(({attributes: data, id}, idx) => (
            <div className='flex-between mb-3' key={id}>
                <div className="flex-grow flex items-center space-x-3 text-white">
                    <p>{idx + 1}</p>
                    <h1 className=' font-medium'>
                        {data.message}  <br /> 
                        <span className='italic text-sm text-blue-300'>
                            sending by {data.name} {data.email} 
                        </span> 
                        {' | '}
                        <span className='text-sm text-white'> 
                            sent on {moment(data.createdAt).format('LL')}
                        </span>
                    </h1>
                </div>
                <button className='btn py-[6px] px-[8px] bg-red-500 hover:bg-red-600 text-sm' onClick={() => handleDeleteBlog(id)}>delete</button>
            </div>
        )) : (
            <EmptyBlogs title='No Messages'/>
        )
    )
}

export default Messages
