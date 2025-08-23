import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useDarkMode } from '../context/DarkModeContext'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style']
  const [selectedStyle, setSelectedStyle] = useState(imageStyle[0])
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { darkMode } = useDarkMode();

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    // Prevents page from reloading when submitted
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate an image of "${input}" in the style of "${selectedStyle}".`

      const { data } = await axios.post(
        'api/ai/generate-image',
        { prompt, publish },
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
          <Sparkles className='w-6 text-[#20C363]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea rows={4} onChange={(e) => setInput(e.target.value)} value={input} className={`transition-all duration-300 w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-green-700 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} placeholder='Describe the image you want to create...' required />
          
        <p className='mt-4 text-sm font-medium'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            imageStyle.map((item, index) => (
              <span onClick={() => setSelectedStyle(item)} key={index} 
              className={`transition-all duration-300 text-xs px-4 py-1 rounded-full cursor-pointer border transition-all duration-300
                    ${darkMode
                  ? selectedStyle === item
                    ? 'bg-green-900 border-green-500 text-gray-300'
                    : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                  : selectedStyle === item
                    ? 'bg-green-50 text-green-700 border border-green-700'
                    : 'text-gray-500 border border-gray-300 hover:bg-gray-100'}`}>
                {item}</span>
            ))
          }
        </div>

        {/* Toggle */}
        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>

            <input type="checkbox" onChange={() => setPublish(!publish)} checked={publish} className='sr-only peer' />
            <div className={`transition-all duration-300 w-9 h-5 rounded-full peer-checked:bg-green-600 transition ${darkMode? 'bg-gray-700':'bg-slate-300'}`}></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>

          </label>
          <p className='text-sm'>Make image public</p>
        </div>

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#20C363] to-[#00784eff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {loading ?
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            : <Image className='w-5' />
          }
          Generate Image
        </button>

      </form>

      {/* Second Column */}
      <div className={`transition-all duration-300 w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96 ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white text-slate-600'}`}>
        <div className='flex items-center gap-3'>
          <Image className='w-6 text-[#20C363]' />
          <h1 className='text-xl font-semibold'>Generated Image</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <Image className='w-9 h-9' />
              <p>Describe your image and click "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full' />
          </div>
        )

        }

      </div>
    </div>
  )
}

export default GenerateImages
