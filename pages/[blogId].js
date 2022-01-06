import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments/Comments'
import AddComment from '@/components/Comments/AddComment'

const BlogDetail = ({id, data}) => {

    const [postComment, setPostComment] = useState(false)
    const router = useRouter()

    return (
        <section className='my-10'>
            <Head>
                <title>BlogDetail Page | NextStrapi</title>
                <meta name="Blog" content="Blog Detail" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex items-center justify-center'>
                <div className='relative w-[900px] h-[230px] md:h-[400px] shadow-2xl'>
                    <Image src={`${process.env.NEXT_PUBLIC_URL}${data?.imageURL}`} layout='fill' objectFit='cover'/>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className='bg-gray-700 w-[900px] p-4 text-white rounded-b'>
                    <p className='text-sm text-gray-300 mb-3'>Posted by {data?.author}</p>
                    <div className='flex items-center space-x-2 text-sm'>
                        <p className='bg-yellow-600 rounded py-[3px] px-[8px]'>
                            {data?.category.replace('-', ' ')}
                        </p>
                        <p>|</p>
                        <p>Posted on {moment(data?.createdAt).format('LL')}</p>     
                    </div>
                    <h1 className='mt-5 text-3xl md:text-4xl font-bold'>{data?.title}</h1>
                    <p className='mt-5 leading-7'>{data?.content}</p>
                    <div className='mt-5 flex items-center space-x-4'>
                        <button className='text-blue-300 hover:underline' onClick={() => router.push('/')}>Get Back</button>
                        <button className='text-blue-300 hover:underline' onClick={() => setPostComment(!postComment)}>{postComment ? 'Show Comment Form' : 'Hide Comment Form'}</button>
                    </div>
                    <section className='mt-5'>
                        {!postComment && <AddComment id={id}/>}
                        <Comments id={id}/>
                    </section>
                </div>
            </div>
        </section>
    )
}



export const getStaticPaths = async () => {
    const res = await axios(`${process.env.NEXT_PUBLIC_URL}/api/blogs`)
    const { data } = await res

    const paths = data.data.map(data => ({
        params: { blogId: String(data.id) }
    }))


    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({params}) => {
    const res = await axios(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${params.blogId}`)
    const { data } = await res 
    
    return {
        props: {
            id: data.data.id,
            data: data.data.attributes
        },
        revalidate: 60
    }
}

export default BlogDetail
