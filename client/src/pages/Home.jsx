import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import { useDarkMode } from '../context/DarkModeContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const Home = () => {
  // Dark mode state can be managed here or in a context/provider
  const { darkMode } = useDarkMode()

  return (
    <div className={`transition-all duration-300 ${darkMode? 'bg-gray-950':''}`}>
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testimonial/>
      <Plan/>
      <Footer/>
    </div>
  )
}

export default Home
