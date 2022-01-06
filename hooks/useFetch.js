import { useState, useEffect } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'

const useFetch = (route, isToken) => {

    const cookies = parseCookies() 
    const [data, setData] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    const token = {
        headers: {
            Authorization: `Bearer ${cookies.token}`
        }
    }

    useEffect(() => {
        if(isFetch) {
            axios(`${process.env.NEXT_PUBLIC_URL}/api/${route}`, isToken && token).then((res) => {
                setData(res.data)
                setIsFetch(false)
            })
        }
    }, [route, isFetch])

    return {
        setIsFetch,
        data
    }
}

export default useFetch
