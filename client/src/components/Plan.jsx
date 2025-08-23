import React from 'react'
import { PricingTable } from '@clerk/clerk-react'
import { useDarkMode } from '../context/DarkModeContext'

const Plan = () => {
  const { darkMode } = useDarkMode()
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
      <div className='text-center'>
        <h2 className={`transition-all duration-300 text-[42px] font-semibold ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>Choose Your Plan</h2>
        <p className={`transition-all duration-300 max-w-lg mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
      </div>

      {/* Pricing Table */}
      <div className='mt-14 max-sm:mx-8'>
        <div className={darkMode ? "dark" : ""}>
          <PricingTable/>
        </div>
      </div>
    </div>
  )
}

export default Plan
