import React from 'react'
import { useRouter } from 'next/router'
import { categories } from '../../utils/utils'

const Categories = () => {

    const router = useRouter()

    const handleCty = (val) => {
        if(val !== 'all') {
            router.push(`?category=${val}`, undefined, { shallow: true })
        } else {
            router.push(`/`, undefined, { shallow: true })
        }
    }

    let category = 'all'

    if(router.query.category) {
        category = router.query.category
    }

    return (
        <div className='flex items-center space-x-5 overflow-x-scroll scrollbar-hide'>
            <div className={`category ${category === 'all' && 'bg-white text-gray-800 hover:bg-white hover:text-gray-800'}`} onClick={() => handleCty('all')}>
                All
            </div>
            {categories.map(cty => (
                <div className={`category ${category === cty && 'bg-white text-gray-800 hover:bg-white hover:text-gray-800'}`} onClick={() => handleCty(cty)} key={cty}>
                    {`${cty[0].toUpperCase() + cty.slice(1).replace('-', ' ')}`}
                </div>
            ))}
        </div>
    )
}

export default Categories
