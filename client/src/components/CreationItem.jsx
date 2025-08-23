import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { useDarkMode } from '../context/DarkModeContext';

const CreationItem = ({item}) => {
    const [expanded, setExpanded]= useState(false);
    const {darkMode} = useDarkMode();

  return (
    <div onClick={()=>setExpanded(!expanded)} className={`transition-all duration-300 p-4 max-w-5xl text-sm rounded-lg cursor-pointer border ${darkMode ? 'bg-gray-900 text-gray-300 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{item.prompt}</h2>
                <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <button className={`transition-all duration-300 bg-[#EFF6FF] border border-[#BFDBFE] text=[#1E40AF] px-4 py-1 rounded-full  ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-500' :''}`}>
                {item.type}
            </button>
        </div>
        {
            expanded && (
                <div>
                    {item.type==='image'?(
                        <div>
                            <img src={item.content} alt="image" className='mt-3 w-full max-w-md'/>
                        </div>
                    ):(
                        <div className={`transition-all duration-300 mt-3 h-full overflow-y-scroll text-sm`}>
                            <div className='reset-tw'>
                                <Markdown>
                                    {item.content}
                                </Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    </div>
  )
}

export default CreationItem
