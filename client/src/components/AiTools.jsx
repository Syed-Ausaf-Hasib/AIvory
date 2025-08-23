import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import Testimonial from './Testimonial'
import { useDarkMode } from '../context/DarkModeContext'

const AiTools = () => {
    const {user} = useUser()
    const {openSignIn} = useClerk()
    const navigate = useNavigate()
    const { darkMode } = useDarkMode()

  return (
    <div className='mt-7 px-4 sm:px-20 xl:px-32 my-24 '>

        {/* Title and Description */}
       <div className='text-center'>
            <h2 className={`transition-all duration-300 text-[42px] font-semibold ${darkMode? 'text-gray-300' : 'text-slate-700 '}`}>Powerful AI Tools</h2>
            <p className={`transition-all duration-300 max-w-lg mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                Everything you need to create, enhance and optimize your content with cutting-edge AI technology.
            </p>
       </div>

        {/* Tools Section */}
        <div className='flex flex-wrap mt-10 justify-center'>
            {AiToolsData.map((tool, index)=>(
                <div key={index} className={`p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 ${darkMode ? 'bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-700' : ''}`}
                    onClick={()=> (user ? navigate(tool.path) : openSignIn())}>
                    <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' 
                                style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
                    <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>   
                </div>
            ))}
        </div>
    </div>
  )
}

export default AiTools
