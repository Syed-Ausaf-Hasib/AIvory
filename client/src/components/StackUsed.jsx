import React from 'react'
import { assets } from '../assets/assets';
import { useDarkMode } from '../context/DarkModeContext';

const StackUsed = () => {
    const techs = ["ReactLogo", "ViteLogo", "TailwindCSSLogo", "ReactRouterLogo", "ClerkLogo", "AxiosLogo", "NodeLogo", "ExpressLogo", "NeonLogo",];
    const { darkMode } = useDarkMode();

    return (
        <div className="z-1 overflow-hidden w-full relative max-w-5xl mx-auto select-none mt-20">
            <div className={`transition-colors duration-300 absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r to-transparent ${darkMode? 'from-gray-950':'from-white'}`} />
            <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "30s" }}>
                <div className="flex">
                    {[...techs, ...techs].map((tech, index) => (
                        <img
                            key={index}
                            src={assets[tech+( darkMode ? 'Dark' : '')]}
                            alt={tech}
                            className={`transition-all duration-300 bg-gradient-radial from-primary to-transparent w-35 object-cover mx-6`}
                            draggable={false}
                        />
                    ))}
                </div>
            </div>
            <div className={`transition-colors duration-300 absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l to-transparent ${darkMode? 'from-gray-950':'from-white'}`} />
        </div>
    );
}

export default StackUsed
