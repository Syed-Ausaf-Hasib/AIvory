import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { useDarkMode } from '../context/DarkModeContext'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]
  const [selectedLength, setSelectedLength] = useState(articleLength[0])
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
      const prompt = `Write an article about "${input}" with a length of ${selectedLength.length} words.`

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
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
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className={`transition-all duration-300 w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-700 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} placeholder='The future of artificial intelligence is...' required />
        <p className='mt-4 text-sm font-medium'>Article Length</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            articleLength.map((item, index) => (
              <span onClick={() => setSelectedLength(item)} key={index} 
              className={`transition-all duration-300 text-xs px-4 py-1 rounded-full cursor-pointer border transition-all duration-300
                    ${darkMode
                  ? selectedLength.text === item.text
                    ? 'bg-blue-900 border-blue-500 text-gray-300'
                    : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                  : selectedLength.text === item.text
                    ? 'bg-blue-50 text-blue-700 border border-blue-700'
                    : 'text-gray-500 border border-gray-300 hover:bg-gray-100'}`}>
              {item.text}
              </span>
            ))
          }
        </div>

        <br />

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-t from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Edit className='w-5' />
          }
          Generate Article
        </button>

      </form>

      {/* Second Column */}
      <div className={`transition-all duration-300 w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white text-slate-600'}`}>
        <div className='flex items-center gap-3'>
          <Edit className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Article</h1>
        </div>

        {!content ? (
          // This is there if the data is not generated 
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click "Generate Article" to get started</p>
            </div>
          </div>
        ) : (
          <div className={`transition-all duration-300 mt-3 h-full overflow-y-scroll text-sm ${darkMode? 'text-gray-300':'text-slate-600'}`}>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default WriteArticle
