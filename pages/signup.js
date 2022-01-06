import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import Head from 'next/head'
import { useFormik } from 'formik'
import AuthForm from '@/components/Auth/AuthForm'

const Signup = () => {

    const [isSuccess, setIsSuccess] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: '',   
            email : '',
            password: '',
            passwordConfirmation: ''
        },
        onSubmit: (values, { resetForm }) => {
            setIsLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`, values).then((res) => {
                setIsLoading(false)
                setIsSuccess('Success. Your account has been created. Now you can login!')
                resetForm()
            }).catch((error) => {
                setIsLoading(false)
                setIsError('E-mail has been taken')
            })
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username field is required'),
            email: Yup.string().required('Email field is required').email('Email not valid'),
            password: Yup.string().required('Password field is required').min(8, 'Minimum password length is more than 7'),
            passwordConfirmation: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Password confirmation not match with password').required('Password confirmation field is required')
        })
    })


    if(isSuccess) {
        setTimeout(() => {
            setIsSuccess(null)
        }, 5000);
    }
    
    if(isError) {
        setTimeout(() => {
            setIsError(null)
        }, 3000);
    }

    
    return (
        <div className='my-10 flex items-center justify-center'>
            <Head>
                <title>Signup | NextStrapi</title>
                <meta name="authentication" content="Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthForm 
                isSignup
                url='signin' 
                formik={formik} 
                isError={isError}
                isSuccess={isSuccess} 
                isLoading={isLoading}/>
                
        </div>
    )
}

export default Signup
