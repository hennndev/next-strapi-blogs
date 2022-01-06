import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FiSearch } from 'react-icons/fi'

const SearchInput = ({mobile}) => {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (e) => setSearchTerm(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(router.asPath !== "/") {
            router.push(`/?search=${searchTerm}`)
        } else {
            router.push(`?search=${searchTerm}`, undefined, {shallow: true})
        }
        setSearchTerm('')
    }

    return (
        <form className={`flex items-center bg-white py-2 px-5 rounded ${mobile ? 'w-full' : 'lg:w-[270px] xl:w-[350px]'} text-gray-800`} onSubmit={handleSubmit}>
            <FiSearch className='text-xl cursor-pointer' onClick={handleSubmit}/>
            <input 
                type="text" 
                className='flex-grow outline-none font-medium ml-5'
                placeholder={router.query.search || 'Search Articles...'}
                value={searchTerm}
                onChange={handleChange}/>
        </form>
    )
}

export default SearchInput
