import React  from 'react'
import { FiUpload } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { categories } from '../../utils/utils'

const BlogForm = ({formik, isLoading}) => {

    const onDrop = (acceptedFile) => {
        formik.setValues({
            ...formik.values,
            image: acceptedFile[0]
        })
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div className='w-[800px] bg-gray-800 text-gray-200 py-7 px-6 rounded relative'>
            {isLoading && <div className='bg-gray-600 opacity-20 z-30 absolute top-0 bottom-0 left-0 right-0 w-full h-full animate-pulse'></div>}

            <h1 className='text-center text-2xl font-semibold'>Add New Blog</h1>
            <form className='mt-5' onSubmit={formik.handleSubmit}>

                {/* TITLE */}
                <div className="input-control">
                    <label htmlFor="title" className='text-lg font-medium'>Title</label>
                    <input 
                        type="text" 
                        placeholder='Type blog title...' 
                        className='input-add'
                        {...formik.getFieldProps('title')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.title && formik.touched.title && <small className='text-red-500 text-[14px]'>{formik.errors.title}</small>}          
                </div>

                {/* AUTHOR */}
                <div className="input-control">
                    <label htmlFor="title" className='text-lg font-medium'>Author</label>
                    <input 
                        type="text" 
                        placeholder='Type blog author...' 
                        className='input-add'
                        {...formik.getFieldProps('author')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.author && formik.touched.author && <small className='text-red-500 text-[14px]'>{formik.errors.author}</small>}      
                </div>

                {/* CATEGORY */}
                <div className="input-control">
                    <label htmlFor="category" className='text-lg font-medium'>Category</label>
                    <select id='category' className='input-add hover:bg-gray-800' {...formik.getFieldProps('category')} onBlur={formik.handleBlur}>
                        <option value="" className='bg-gray-800 text-white'>Choose Category</option>
                        {categories.map(cty => (
                            <option className='bg-gray-800 text-white' value={cty} key={cty}>{cty[0].toUpperCase() + cty.slice(1).replace('-', ' ')}</option>
                        ))}
                    </select>
                    {formik.errors.category && formik.touched.category && <small className='text-red-500 text-[14px]'>{formik.errors.category}</small>}   
                </div>

                {/* CONTENT */}
                <div className="input-control">
                    <label htmlFor="content" className='text-lg font-medium'>Content</label>
                    <textarea 
                        rows={6} 
                        type="text" 
                        id='content' 
                        placeholder='Type blog content...' 
                        className='input-add'
                        {...formik.getFieldProps('content')}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.content && formik.touched.content && <small className='text-red-500 text-[14px]'>{formik.errors.content}</small>}   
                </div>

                {/* IMAGE */}
                <div className="input-control">
                    <label htmlFor="image" className='text-lg font-medium'>Image</label>
                    <div {...getRootProps()} className={`border-2 ${isDragActive ? 'border-blue-400 text-blue-500' : 'border-gray-400 text-gray-500'} border-dashed px-5 py-10 text-center`}>
                        <input {...getInputProps()} accept='image/*'/>
                        {
                            isDragActive ?
                            <div className='flex flex-col items-center justify-center space-y-3'>
                                <FiUpload className='text-2xl animate-bounce'/>
                                <p>Drag file here...</p>
                            </div> :
                            <div className='flex flex-col items-center justify-center space-y-3 text-gray-500'>
                                <FiUpload className='text-2xl animate-bounce'/>
                                <p>Drag and drop some files here, or click to select files</p>
                            </div>
                        }
                    </div>
                    <small>{formik?.values?.image?.name}</small>
                    {formik.errors.image && formik.touched.image && <small className='text-red-500 text-[14px]'>{formik.errors.image}</small>}
                </div>

                {/* BTN GROUP */}
                <div className='mt-5 flex items-center space-x-5'>
                    {!isLoading && <button className='btn bg-red-500 hover:bg-red-600' type='button' onClick={() => formik.resetForm()}>Reset</button>}
                    <button className={`btn ${isLoading && 'bg-gray-700 hover:bg-gray-700 cursor-not-allowed'}`} type='submit'>
                        {isLoading ? 'Loading...' : 'Submit New Blog'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
