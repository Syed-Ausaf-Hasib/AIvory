import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems=[
    {to:'/ai', label:'Dashboard', Icon: House, colorFrom: '#3C81F6', colorTo: '#9234EA'},
    {to:'/ai/blog-titles', label:'Title Generation', Icon: Hash, colorFrom: '#B153EA', colorTo: '#fe40afff'},
    {to:'/ai/write-article', label:'Article Generation', Icon: SquarePen, colorFrom: '#74abb7ff', colorTo: '#3588F2'},
    {to:'/ai/generate-images', label:'Image Generation', Icon: Image, colorFrom: '#00784eff', colorTo: '#20C363'},
    {to:'/ai/remove-background', label:'Background Removal', Icon: Eraser, colorFrom: '#c55f23ff', colorTo: '#F04A3C'},
    {to:'/ai/remove-object', label: 'Object Removal', Icon: Scissors, colorFrom: '#3366ccff', colorTo: '#7984e7ff'},
    {to:'/ai/review-resume', label:'Resume Review', Icon: FileText, colorFrom: '#36a19aff', colorTo: '#08B6CE'},
    {to:'/ai/community', label:'Community', Icon: Users, colorFrom: '#cc1b1bff', colorTo: '#de4e4eff'}
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const user = useUser();
    const {signOut, openUserProfile} = useClerk();

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
        
        <div className='my-7 w-full'>

            {/* Name and Profile */}
            <img src={user.user.imageUrl} alt="User Avatar" className='w-13 rounded-full mx-auto'/>
            <h1 className='mt-3 mb-6 text-center'>{user.user.fullName}</h1>

            <div className='px-6 mt-3 text-sm text-gray-600 font-medium'>
            {/* Navigation Buttons */}
            {
                navItems.map(({to, label, Icon, colorFrom, colorTo}) => (
                    <NavLink key={to} to={to} end={to === '/ai'} onClick={() => setSidebar(false)}
                        className={({isActive}) =>
                            `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'text-white' : ''}`
                        }
                        style={({isActive}) =>
                            isActive && colorFrom && colorTo
                                ? { background: `linear-gradient(to right, ${colorFrom}, ${colorTo})` }
                                : {}
                        }
                    >
                        {({isActive}) => (
                            <>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                {label}
                            </>
                        )}
                    </NavLink>
                ))
            }
            </div>
        </div>

        {/* Footer of Sidebar */}
        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
            <div onClick={openUserProfile} className='fex gap-2 items-center cursor-pointer'>
                <img src={user.user.imageUrl} alt="avaterLogo" className='w-8 rounded-full'/>
                <div>
                    <h1 className='text-sm font-medium'>{user.user.fullName}</h1>
                    <p className='text-xs text-gray-500'>
                        <Protect plan='premium' fallback='Free'>Premium</Protect> plan
                    </p>
                </div>
            </div>
            <LogOut onClick={signOut} className='w-4.5 text-gray-500 hover:text-gray-800 transition cursor-pointer' />
        </div>
    </div>
  )
}

export default Sidebar


