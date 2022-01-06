import React from 'react'
import Blog from './Blog'
import { useRouter } from 'next/router'
import EmptyFindBlogs from '../UI/EmptyFindBlogs'

const Blogs = ({data}) => {

    const router = useRouter()
    const filteredBlogs = data.filter(data => {
        if(router.query.category) {
            return data.attributes.category === router.query.category
        } else if(router.query.search) {
            return data.attributes.category.toLowerCase().replace('-', '')
                        .includes(router.query.search.toLowerCase().replace(' ', '')) ||

                    data.attributes.title.toLowerCase().replace('-', '')
                        .includes(router.query.search.toLowerCase().replace(' ', '')) ||

                    data.attributes.author.toLowerCase().replace('-', '')
                        .includes(router.query.search.toLowerCase().replace(' ', ''))
        } else {
            return data
        }
    })

    if(filteredBlogs.length < 1) {
        return <EmptyFindBlogs/>
    }

    return (
        <div className='grid grid-cols-cards gap-x-5 gap-y-10 mt-10'>
            {filteredBlogs.map(data => (
                <Blog key={data.id} id={data.id} data={data.attributes}/>
            ))}
        </div>
    )
}

export default Blogs
