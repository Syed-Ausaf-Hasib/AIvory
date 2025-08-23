import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/clerk-react'
import { useDarkMode } from '../context/DarkModeContext'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const BlogTitles = () => {

  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'food']
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { darkMode } = useDarkMode();

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    // Prevents page from reloading when submitted
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate 5 catchy blog titles in bullet points for the topic "${input}" in the category "${selectedCategory}".`

      const { data } = await axios.post(
        'api/ai/generate-blog-title',
        { prompt },
        { headers: { 'Authorization': `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      }
      else {
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
          <Sparkles className='w-6 text-[#B153EA]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className={`transition-all duration-300 w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-purple-700 ${darkMode? 'border-gray-700':'border-gray-300'}`} placeholder='The future of artificial intelligence is...' required />
        <p className='mt-4 text-sm font-medium'>Category</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            blogCategories.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedCategory(item)}
                className={`transition-all duration-300 text-xs px-4 py-1 rounded-full cursor-pointer border transition-all duration-300
                    ${darkMode
                    ? selectedCategory === item
                      ? 'bg-purple-900 border-purple-500 text-gray-300'
                      : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                    : selectedCategory === item
                      ? 'bg-purple-50 text-purple-700 border border-purple-700'
                      : 'text-gray-500 border border-gray-300 hover:bg-gray-100'}`}>
                {item}
              </span>
            ))
          }
        </div>

        <br />

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#fe40afff] to-[#B153EA] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {loading ?
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            : <Hash className='w-5' />
          }
          Generate Title
        </button>

      </form>

      {/* Second Column */}
      <div className={`transition-all duration-300 w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96 ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white text-slate-600'}`}>
        <div className='flex items-center gap-3'>
          <Hash className='w-6 text-[#B153EA]' />
          <h1 className='text-xl font-semibold'>Generated Titles</h1>
        </div>

        {
          !content ?
            (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                  <Hash className='w-9 h-9' />
                  <p>Enter a topic and click "Generate Title" to get started</p>
                </div>
              </div>
            ) : (
              <div className={`transition-all duration-300 mt-3 h-full overflow-y-scroll text-sm ${darkMode? 'text-gray-300':'text-slate-600'}`}>
                <div className='reset-tw'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default BlogTitles
