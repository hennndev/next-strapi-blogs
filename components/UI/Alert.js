import React from 'react'
import { BsCheckLg } from 'react-icons/bs'

const Alert = ({title = 'Your blog has been added', handleClose}) => {
    return (
        <div className='fixed w-full h-full top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center px-10'>
            <div className='bg-gray-700 text-green-300 flex flex-col items-center justify-center p-5 rounded-md min-h-[300px] min-w-[200px]'>
                <BsCheckLg className='text-[70px] mb-2'/>
                <h1 className='text-2xl text-center'>Success, {title}!</h1>
                <button className="btn mt-5 bg-gray-800 hover:bg-gray-900 font-medium" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default Alert
