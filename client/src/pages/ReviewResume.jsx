import { FileTextIcon, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const ReviewResume = () => {
  const [input, setInput] = useState('')
  
  const onSubmitHandler = async (e)=>{
    // Prevents page from reloading when submitted
    e.preventDefault();
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

        {/* First column */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#36a19aff]'/>
            <h1 className='text-xl font-semibold'>Resume Review</h1>
          </div>

          {/* Upload Image Section */}
          <p className='mt-6 text-sm font-medium'>Upload Resume</p>
          <label className="block w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-primary text-gray-600 cursor-pointer bg-white">
            <span>Choose File</span>
            <input
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={(e) => setInput(e.target.files[0])}
              required
            />
          </label>
          {input && (
            <p className="mt-2 text-xs text-gray-500">Selected file: {input.name}</p>
          )}
          {/* This below is the one he actually used in the video */}
          {/* <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-primary text-gray-600' required/> */}
          <p className='text-sm text-gray-500 font-light mt-1'>Supports resume in PDF format only</p>
            
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#08B6CE] to-[#36a19aff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <FileTextIcon className='w-5'/>
            Review Resume
          </button>

        </form>

        {/* Second Column */}
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

          <div className='flex items-center gap-3'>
            <FileTextIcon className='w-6 text-[#08B6CE]'/>
            <h1 className='text-xl font-semibold'>Analysis Results</h1>
          </div>

          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <FileTextIcon className='w-9 h-9'/>
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default ReviewResume
