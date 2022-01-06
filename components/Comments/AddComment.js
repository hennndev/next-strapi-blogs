import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { useData } from '../../context/context'
import nookies from 'nookies'


const AddComment = ({id}) => {

    const router = useRouter()
    const { user } = useData()
    const cookies = nookies.get()
    const [comment, setComment] = useState('')
    const handleChange = (e) => setComment(e.target.value) 

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user) {
            router.push('/signin')
        } else {
            if(comment) {
                axios(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`).then((res) => {
                    axios({
                        url: `${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`, 
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                        },
                        data: {
                            data: {
                                comments: [...res.data.data.attributes.comments, {
                                    id: uuid(),
                                    name: user?.username,
                                    comment: comment.replaceAll('\n', '').trim(),
                                    createdAt: new Date()
                                }]
                            }
                        }
                    }).then(() => {
                        alert('Success, Your Comment has been Posted')
                        setComment('')
                    })
                })
            } else {
                alert('Please fill the field comment input')
            }
        }
    }



    return (
        <form onSubmit={handleSubmit} className='bg-gray-800 p-4'>
            <textarea 
                placeholder='Type your comment' 
                rows={6} 
                className='mb-2 w-full bg-transparent rounded text-white outline-none'
                value={comment}
                onChange={handleChange}></textarea>
            <button className='btn bg-blue-600 hover:bg-blue-700' type='submit'>
                Submit Comment
            </button>
        </form>
    )
}

export default AddComment
