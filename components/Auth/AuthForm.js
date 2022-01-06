import React from 'react'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { BsArrowRight } from 'react-icons/bs'
import { AiOutlineGithub, AiFillFacebook } from 'react-icons/ai'

const AuthForm = ({formik, url, isSuccess, isError, isLoading, isSignup}) => {

    const router = useRouter()
    return (
        <form className='w-[500px] bg-gray-800 p-5 rounded-md text-gray-200 relative' onSubmit={formik.handleSubmit}>
            {isLoading && <div className='bg-gray-600 opacity-20 z-30 absolute top-0 bottom-0 left-0 right-0 w-full h-full animate-pulse'></div>}
            {isSuccess && (
                    <div className='px-3 py-5 bg-green-600 mb-4 relative rounded'>
                        <p className='text-gray-50'>{isSuccess}</p>
                    </div>
            )}
            {isError && (
                    <div className='px-3 py-5 bg-red-500 mb-4 relative rounded'>
                        <p className='text-gray-50'>{isError}</p>
                    </div>
            )}
            <h1 className='text-center text-2xl mb-3 font-semibold'>{isSignup ? 'Signup' : 'Signin'}</h1>
            {/* USERNAME */}
            {isSignup && (
                <div className='input-control'>
                    <label htmlFor="username" className='font-medium'>Username</label>
                    <input 
                        type="text" 
                        className='input-add'
                        {...formik.getFieldProps('username')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.username && formik.touched.username && <small className='text-red-500 text-[14px]'>{formik.errors.username}</small>}  
                </div>
            )}

            {/* EMAIL */}
            <div className='input-control'>
                <label htmlFor="email" className='font-medium'>Email</label>
                <input 
                    type="email" 
                    id='email'
                    className='input-add'
                    {...formik.getFieldProps(isSignup ? 'email' : 'identifier')}
                    onBlur={formik.handleBlur}/>
                {isSignup ? (
                    formik.errors.email && formik.touched.email && <small className='text-red-500 text-[14px]'>{formik.errors.email}</small>
                ) : (
                    formik.errors.identifier && formik.touched.identifier && <small className='text-red-500 text-[14px]'>{formik.errors.identifier}</small>
                )}   
            </div>

            {/* PASSWORD */}
            <div className='input-control'>
                <label htmlFor="password" className='font-medium'>Password</label>
                <input 
                    type="password" 
                    className='input-add'
                    {...formik.getFieldProps('password')}
                    onBlur={formik.handleBlur}/>
                {formik.errors.password && formik.touched.password && <small className='text-red-500 text-[14px]'>{formik.errors.password}</small>}
            </div>

            {/* PASSWORD CONFIRMATION */}
            {isSignup && (
                <div className='input-control'>
                    <label htmlFor="password" className='font-medium'>Password</label>
                    <input 
                        type="password" 
                        className='input-add'
                        {...formik.getFieldProps('passwordConfirmation')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && <small className='text-red-500 text-[14px]'>{formik.errors.passwordConfirmation}</small>}
                </div>
            )}

            <div className="grid place-items-center mt-5">
                {!isLoading ? (
                    <button className='btn flex items-center' type='submit'>
                        {isSignup ? 'Signup' : 'Signin'} Now
                        <BsArrowRight className='text-xl ml-3'/>
                    </button>
                ) : (
                    <button className={`btn flex items-center ${isLoading && 'bg-gray-700 cursor-not-allowed'}`} type='submit'>
                        Loading...
                    </button>
                )}
            </div>
            <p className='text-center mt-3'>
                {isSignup ? 'Already have an account ?' : "Don't have an account ?" }  
                <span className='text-blue-400 ml-2 cursor-pointer hover:underline' onClick={() => router.push(`/${url}`)}>{isSignup ? 'Signin' : 'Signup'}</span>
            </p>
            {!isSignup && (
                <>
                    <button className='btn flex items-center justify-center bg-transparent mt-5 border border-gray-600 hover:bg-gray-900 hover:border-transparent text-white w-full' type='button'>
                        <AiOutlineGithub className='text-xl mr-5'/>
                        Login with Github
                    </button>
                    <button className='btn flex items-center justify-center bg-transparent mt-[10px] border border-gray-600 hover:bg-gray-900 hover:border-transparent text-white w-full' type='button'>
                        <AiFillFacebook className='text-xl mr-5'/>
                        Login with Facebook
                    </button>
                    <button className='btn flex items-center justify-center bg-transparent mt-[10px] border border-gray-600 hover:bg-gray-900 hover:border-transparent text-white w-full' type='button'>
                        <FcGoogle className='text-xl mr-5'/>
                        Login with Google
                    </button>
                </>
            )}
        </form>
    )
}

export default AuthForm
