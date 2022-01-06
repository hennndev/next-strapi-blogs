import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import Head from 'next/head'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useData } from '../context/context'
import AuthForm from '@/components/Auth/AuthForm'


const Signin = () => {

    const router = useRouter()
    const { handleSetUser } = useData()
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    

    const formik = useFormik({
        initialValues: {
            identifier: '',   
            password: '',
        },
        onSubmit: (values, { resetForm }) => {
            setIsLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`, values).then((res) => {
                setIsLoading(false)
                setIsSuccess('Success Login !')
                resetForm()
                handleSetUser(res.data)
                setTimeout(() => {
                    router.replace('/')
                }, 1000);
            }).catch((error) => {     
                setIsLoading(false)   
                setIsError('E-mail or password is wrong')
            })
        },
        validationSchema: Yup.object({
            identifier: Yup.string().required('Identifier field is required'),
            password: Yup.string().required('Password field is required').min(8, 'Minimum password length is more than 7')
        })
    })

    if(isError) {
        setTimeout(() => {
            setIsError(null)
        }, 5000);
    }


    return (
        <div className='my-10 flex items-center justify-center'>
            <Head>
                <title>Signin | NextStrapi</title>
                <meta name="authentication" content="Sign In" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthForm 
                url='signup' 
                formik={formik} 
                isError={isError} 
                isSuccess={isSuccess} 
                isLoading={isLoading}/>
        </div>
    )
}


export default Signin
