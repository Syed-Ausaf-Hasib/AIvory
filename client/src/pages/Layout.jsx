import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, MoonStarIcon, Sun, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useUser, SignIn } from '@clerk/clerk-react'
import { useDarkMode } from '../context/DarkModeContext'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  }

  return user ? (
    <div className={`transition-all duration-300 flex flex-col items-start justify-start h-screen ${darkMode ? 'bg-gray-900' : ''}`}>

      <nav className={`transition-all duration-300 w-full px-8 min-h-14 flex items-center justify-between ${darkMode ? 'bg-gradient-to-b from-gray-900 to-transparent border-b border-gray-700' : 'border-b border-gray-200'} `}>
        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 cursor-pointer sm:hidden' />
            : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 cursor-pointer sm:hidden' />
        }
        <img src={assets.logo} className='cursor-pointer w-32 sm:w-44' alt="logo" onClick={() => navigate('/')} />
        <button onClick={() => toggleDarkMode()} className={`transition-all duration-300 flex justify-evenly items-center cursor-pointer ml-4 text-sm px-3 py-1 rounded-full border-2 ${darkMode ? 'bg-transparent text-white border-primary' : 'border-gray-600'}`}>
          {darkMode ? <Sun className='text-primary' /> : <MoonStarIcon className='text-gray-600' />}
        </button>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet />
        </div>
      </div>

    </div>
  )
    :
    (
      <div className='flex items-center justify-center h-screen'>
        <SignIn />
      </div>
    )
}

export default Layout
