import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

const Blog = ({id, data}) => {

    return (
        <div className='bg-gray-700 shadow-md rounded-md h-[400px] flex flex-col cursor-pointer overflow-hidden'>
            <div className='relative h-[220px]'>
                <Image src={`${process.env.NEXT_PUBLIC_URL}${data?.imageURL}`} layout='fill' objectFit='cover'/>
            </div>
            <div className='flex-grow flex flex-col justify-between p-[10px] text-white'>
                <div>
                    <div className='flex items-center space-x-2 text-sm text-gray-400'>
                        <p className='bg-yellow-600 rounded py-[3px] px-[8px] text-white'>
                            {data?.category.replace('-', ' ')}
                        </p>
                        <p>|</p>
                        <p>Posted on {moment(data?.createdAt).format('LL')}</p>     
                    </div>
                    <h1 className='mt-2 text-xl line-clamp-1'>{data?.title}</h1>
                    <p className='line-clamp-2 text-gray-400 text-[15px]'>{data?.content}</p>
                </div>
                <div className='flex-between mt-5'>
                    <p>{data?.author}</p>
                    <Link href={`/${id}`}>
                        <a className='text-blue-300 hover:underline'>Read more</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Blog
