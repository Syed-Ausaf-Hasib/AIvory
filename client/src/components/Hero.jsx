import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import StackUsed from './StackUsed'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Hero = () => {
    const navigate = useNavigate()
    const [trustedCount, setTrustedCount] = useState()

    const trustedUsers = async () => {
        try{
            const {data} = await axios.get('api/trust/get-trusted-users-count')
            if(data.success){
                setTrustedCount(data.count)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    useEffect(() => {
        trustedUsers()
    }, [])

  return (
    <div className='pt-15 px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
        {/* Text section */}
        <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
                Create amazing content <br/> with{' '}
                <span className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                    AI tools
                </span>
            </h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
                Transform your content creation with our suite of premium AI tools.<br/> Write articles, generate images and enhance your workflow.
            </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
            <button onClick={()=> navigate('/ai')}className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start creating now</button>
            <button onClick={()=> toast.error('This feature is not added yet') } className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 active:border-primary transition cursor-pointer'>Watch demo</button>
        </div>

        {/* Dummy Users */}
        {
            trustedCount?
            (
                <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                    <img src={assets.user_group} alt="" className='h-8'/> Trusted by {trustedCount}+ users
                </div>
            ):(
                <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                    <span className='w-8 h-8 rounded-full border-3 border-purple-700 border-t-transparent animate-spin'></span>
                </div>
            )
        }
        

        <StackUsed/>
    </div>
  )
}

export default Hero
