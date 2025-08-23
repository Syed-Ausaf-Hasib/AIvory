import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bed, Home, LucidePanelsLeftRight, Moon, MoonStarIcon, PillBottle, ShieldEllipsis, SquaresExclude, Star, Sun } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

const Navbar = () => {
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()
  const {darkMode, setDarkMode} = useDarkMode()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  }

  return (
    <div className={`fixed z-5 w-full backdrop-blur-2xl shadow-md flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-transparent border-b border-gray-900' : ''}`}>

      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />
      <div className='flex justify-center h-[36px] mr-[-10px] '>
        {
          user ? <UserButton/> : (
            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started <ArrowRight className='w-4 h-4' /></button>
          )
        }
        <button onClick={() => toggleDarkMode()} className={`flex justify-evenly items-center cursor-pointer ml-4 text-sm px-3 py-1 rounded-full border-2 ${darkMode ? 'bg-transparent text-white border-primary' : 'border-gray-600'}`}>
          {darkMode ? <Sun className='text-primary'/> : <MoonStarIcon className='text-gray-600'/>}
        </button>
      </div>

    </div>
  )
}

export default Navbar
