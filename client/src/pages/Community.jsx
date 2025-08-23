import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart, Sparkles } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDarkMode } from '../context/DarkModeContext'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const {user} = useUser()
  const [loading, setLoading] = useState(true)
  const {darkMode} = useDarkMode();

  const {getToken} = useAuth()

  // This fetches the published images from the server
  const fetchCreations = async()=>{
    try{
      const {data} = await axios.get(
        'api/user/get-published-creations',
        { headers: { 'Authorization': `Bearer ${await getToken()}` }  }
      )
    
      if(data.success){
        setCreations(Array.isArray(data.creations) ? data.creations : []);
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
    setLoading(false)
  }

  // This toggles the likes
  const imageLikeToggle = async (id) => {
    try{
      const {data} = await axios.post(
        'api/user/toggle-like-creation',
        { id },
        { headers: { 'Authorization': `Bearer ${await getToken()}` } }
      )
      if(data.success){
        toast.success(data.message)
        await fetchCreations()
      }else{
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      fetchCreations()
    }
  },[user])

  return !loading ? (
    <div className={`transition-all duration-300 flex-1 h-full flex flex-col gap-4 p-6  ${darkMode ? 'bg-gray-950 text-gray-300' : 'text-slate-700 '}`}>

        <div className={`transition-all duration-300 flex items-center gap-3 w-85 pl-[20px] pt-[8px] pb-[12px] mb-[-26px] rounded-t-lg border ${darkMode? 'bg-gray-700 border-gray-500':'bg-white border-transparent'}`}>
            <Sparkles className='w-6 text-[#cc1b1bff]'/>
            <h1 className={`transition-all duration-300 text-2xl font-semibold bg-transparent ${darkMode? 'text-gray-300':' text-gray-700'}`}>Community Creations</h1>
        </div>
        
        <div className={`transition-all duration-300 h-full w-full rounded-xl overflow-y-scroll border ${darkMode? 'bg-gray-700 border-gray-500':'bg-white border-transparent'}`}>
          {
            creations.map((creation, index)=>(
              <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'>

                  <img src={creation.content} alt="" className='w-full h-full object--cover rounded-lg'/>
                  <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
                    <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                    <div className='flex gap-1 items-center'>
                      <p>{creation.likes.length}</p>
                      <Heart onClick={()=>imageLikeToggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ?'fill-red-500 text-red-600' : 'text-white'}`}/>
                    </div>
                  </div>

              </div>
            ))
          }
        </div>
    </div>
  )
  :
  (
    <div className={`transition-all duration-300 flex justify-center items-center h-full ${darkMode ? 'bg-gray-950 text-gray-300' : 'text-slate-700 '}`}>
        <span className='w-11 h-11 rounded-full border-3 border-[#cc1b1bff] border-t-transparent animate-spin mt-[3px] mr-[14px]'></span>
    </div>
  )
}

export default Community
