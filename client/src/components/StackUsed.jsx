import React from 'react'
import { assets } from '../assets/assets';

const StackUsed = () => {
    const techs = ["ReactLogo", "ViteLogo", "TailwindCSSLogo", "ReactRouterLogo", "ClerkLogo", "AxiosLogo", "NodeLogo", "ExpressLogo", "NeonLogo", ];
  return (
            <div className="z-1 overflow-hidden w-full relative max-w-5xl mx-auto select-none mt-20">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "30s" }}>
                    <div className="flex">
                        {[...techs, ...techs].map((tech, index) => (
                            <img key={index} src={assets[tech]}
                                alt={tech} className="w-35 object-cover mx-6" draggable={false} />
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
    );
}

export default StackUsed
