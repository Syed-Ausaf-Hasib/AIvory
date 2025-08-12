import { Eraser, Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  
  const onSubmitHandler = async (e)=>{
    // Prevents page from reloading when submitted
    e.preventDefault();
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

        {/* First column */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#3366ccff]'/>
            <h1 className='text-xl font-semibold'>Object Removal</h1>
          </div>

          {/* Upload Image Section */}
          <p className='mt-6 text-sm font-medium'>Upload Image</p>
          <label className="block w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-primary text-gray-600 cursor-pointer bg-white">
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*"
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
          <p className='mt-6 text-sm font-medium'>Describe object to remove</p>
          <textarea rows={4} onChange={(e)=>setObject(e.target.value)} value={object} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-green-700' placeholder='Eg. Watch, Spoon, Hat' required/>
          
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#7984e7ff] to-[#3366ccff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <Scissors className='w-5'/>
            Remove Object
          </button>

        </form>

        {/* Second Column */}
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>

          <div className='flex items-center gap-3'>
            <Scissors className='w-6 text-[#7984e7ff]'/>
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>

          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <Scissors className='w-9 h-9'/>
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default RemoveObject
