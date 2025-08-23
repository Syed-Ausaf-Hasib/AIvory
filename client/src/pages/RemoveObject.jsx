import { Eraser, Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useDarkMode } from '../context/DarkModeContext';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { darkMode } = useDarkMode();

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    // Prevents page from reloading when submitted
    e.preventDefault();
    try {
      setLoading(true)
      if (object.split(' ').length > 1) {
        return toast.error('Please enter a single object to remove')
      }
      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post(
        'api/ai/remove-image-object',
        formData,
        { headers: { 'Authorization': `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className={`transition-all duration-300 h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 ${darkMode ? 'bg-gray-950 text-gray-300' : 'text-slate-700 '}`}>

      {/* First column */}
      <form onSubmit={onSubmitHandler} className={`transition-all duration-300 w-full max-w-lg p-4 rounded-lg border ${darkMode ? 'bg-gray-900 border-gray-700' : ' bg-white border-gray-200'}`}>

        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#3366ccff]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>

        {/* Upload Image Section */}
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <label className={`transition-all duration-300 block w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border focus:border-primary text-gray-600 cursor-pointer bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <span>Choose Image</span>
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
        <p className='text-sm text-gray-500 font-light mt-1'>Supports JPG, PNG and other image formats</p>
        <p className='mt-6 text-sm font-medium'>Describe object to remove</p>
        <textarea rows={4} onChange={(e) => setObject(e.target.value)} value={object} className={`transition-all duration-300 w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-700 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} placeholder='Eg. Watch, Spoon, Hat' required />

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#7984e7ff] to-[#3366ccff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {loading ?
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            : <Scissors className='w-5' />
          }
          Remove Object
        </button>

      </form>

      {/* Second Column */}
      <div className={`transition-all duration-300 w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96 ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white text-slate-600'}`}>

        <div className='flex items-center gap-3'>
          <Scissors className='w-6 text-[#7984e7ff]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <Scissors className='w-9 h-9' />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className='mt-3 w-full h-full' />
        )}

      </div>
    </div>
  )
}

export default RemoveObject
