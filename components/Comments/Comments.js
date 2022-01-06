import React, { useState } from 'react'
import useSWR from 'swr'
import moment from 'moment'

const Comments = ({id}) => {

    const [isSliced, setIsSliced] = useState(true)
    const [commentSlice, setCommentSlice] = useState(3)
    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`, fetcher)

    const handleClick = () => {
        setIsSliced(!isSliced)
        setCommentSlice(isSliced ? data?.data?.attributes?.comments.length : 3 )
    }

    return (
        <div className='mt-5 bg-gray-800 px-3 py-5 w-full rounded text-white'>
            <h1 className='text-xl text-gray-400 text-center'>All Comments</h1>
            {data?.data?.attributes?.comments.length > 0 ? (
                <>
                    {data?.data?.attributes?.comments.slice(0, commentSlice).map(comment => (
                        <div className='flex flex-col space-y-1 mt-5' key={comment?.id}>
                            <div className="flex items-center">
                                <h3 className='text-lg text-blue-400 font-medium'>{comment?.name}</h3>
                                <p className='mt-1 ml-3 text-gray-400 text-sm underline'>{moment(comment?.createdAt).startOf('ss').fromNow()}</p>
                            </div>
                            <p className='text-gray-400'>{comment?.comment}</p>
                        </div>
                    ))}
                    {data?.data?.attributes?.comments.length > 3 && (
                        <div>
                            <p className='text-blue-500 underline mt-5 cursor-pointer' onClick={handleClick}>
                                {isSliced ? 'See all comments' : 'Short comments'}
                            </p>
                        </div>
                    )}
                </>
            ): (
                <div className='mt-10'>
                    <h1 className='text-gray-500'>No comments yet</h1>
                </div>
            )}
        </div>
    )
}

export default Comments
