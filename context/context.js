import { createContext, useContext, useState, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

const Context = createContext()

const Provider = ({children}) => {
    const cookies = parseCookies()
    const [user, setUser] = useState(null)
    const [isLogout, setIsLogout] = useState(false)

    const handleLogout = () => {
        const confirm = window.confirm('Are you sure want to logout ?') 
        if(confirm) {
            setUser(null)
            setIsLogout(true)
            destroyCookie(null, 'userLogin')
            destroyCookie(null, 'token')  
            Router.replace('/')    
        }
    }
    const handleSetUser = (data) => {
        setUser(data.user)
        setCookie(null, 'userLogin', JSON.stringify(data.user))
        setCookie(null, 'token', data.jwt)
    }

    useEffect(() => {
        if(cookies.userLogin) {
            setUser(JSON.parse(cookies.userLogin))
        }
     }, [cookies.userLogin]);

    return (
        <Context.Provider value={{
            user,
            setUser,
            handleLogout,
            handleSetUser
        }}>
            {children}
        </Context.Provider>
    )
}

const useData = () => useContext(Context)

export { Provider, useData }