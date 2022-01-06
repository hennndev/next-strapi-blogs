import axios from 'axios'
import Head from 'next/head'
import Blogs from '@/components/Blogs/Blogs'
import EmptyBlogs from '@/components/UI/EmptyBlogs'
import Categories from '@/components/Categories/Categories'

export default function Home({data}) {

    return (
        <section>
            <Head>
                <title>Homepage | NextStrapi</title>
                <meta name="blogs" content="Blogs List" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className='my-16'>
                {data.data.length < 1 ? (
                    <EmptyBlogs/>
                ) : (
                    <>
                        <Categories/>
                        <Blogs data={data.data}/>
                    </>
                )}  
            </section>     
        </section>
    )
}



export const getStaticProps = async() => {
    const res = await axios(`${process.env.NEXT_PUBLIC_URL}/api/blogs`)
    const { data } = await res

    console.log(data)

    return {
        props: { data },
        revalidate: 60
    }
}

