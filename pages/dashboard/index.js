import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import useFetch from '../../hooks/useFetch'
import Alert from '@/components/UI/Alert'
import { parseCookies } from 'nookies'
import Blogs from '@/components/Dashboard/Blogs'
import Messages from '@/components/Dashboard/Messages'


const Dashboard = () => {

    const cookies = parseCookies() 
    const [route, setRoute] = useState('messages') 
    const [isSuccess, setIsSuccess] = useState(false)

    const isToken = route === 'messages' || route === 'users' 

    const { data, setIsFetch } = useFetch(route, isToken)

    const handleRoute = (val) => {
        setIsFetch(true)
        setRoute(val) 
    }

    const handleDeleteBlog = (id, url = null) => {
        const confirm = window.confirm('Are you sure want to delete this blog ?')
        

        if(confirm) {
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/${route}/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(() => {
                if(!url) {
                    setIsSuccess(true)
                    setIsFetch(true)
                }
                if(url) {
                    axios({
                        url: `${process.env.NEXT_PUBLIC_URL}/api/upload/files`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                        }
                    }).then((res) => {
                        const imgDetail = res.data.find(data => data.url === url)
                        axios({
                            url: `${process.env.NEXT_PUBLIC_URL}/api/upload/files/${imgDetail.id}`,
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${cookies.token}`
                            }
                        }).then(() => {
                            setIsSuccess(true)
                            setIsFetch(true)
                        })
                    })
                }
            })
        }
    }

   

    return (
        <div className='my-10'>
            <Head>
                <title>Dashboard Admin | NextStrapi</title>
                <meta name='Dashboard admin' content="Dashboard data blogs"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isSuccess && <Alert handleClose={() => setIsSuccess(false)} title='Blog has been deleted'/>}
            <div className='bg-gray-800 min-h-[500px] p-4 rounded'>
                <div className='flex items-center space-x-5 mb-5'>
                    <p className='text-blue-300 underline cursor-pointer' onClick={() => handleRoute('blogs')}>Blogs List</p>     
                    <p className='text-blue-300 underline cursor-pointer' onClick={() => handleRoute('users')}>Users List</p>      
                    <p className='text-blue-300 underline cursor-pointer' onClick={() => handleRoute('messages')}>Messages List</p>
                </div>

                {route === 'blogs' && <Blogs data={data} handleDeleteBlog={handleDeleteBlog}/> }
                {route === 'messages' && <Messages data={data} handleDeleteBlog={handleDeleteBlog}/>}
            </div>
        </div>
    )
}

export default Dashboard
