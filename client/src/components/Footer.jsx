import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FileText, Github, Instagram, Laptop, Linkedin, Mail } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Footer = () => {
    const {darkMode} = useDarkMode();
    return (
        <footer className={`transition-all duration-300 flex flex-col items-center justify-center w-full py-20 bg-gradient-to-b ${darkMode? 'from-transparent to-gray-900 text-gray-300':'from-transparent to-gray-200 text-gray-600'} mb-[-100px]'`}>
            <img src={assets.logo} alt="Logo"  className='w-60 hover:-translate-y-0.5 transition-all duration-300'/>
            <p className="mt-4 text-center hover:-translate-y-0.5 transition-all duration-300">Copyright © 2025 <a href="https://www.linkedin.com/in/ausaf-hasib-7seven7/">Syed Ausaf Hasib</a>. All rights reservered.</p>
            <div className="flex items-center gap-4 mt-6">
                <FileText className={`${darkMode? 'text-gray-400':'text-gray-500'} w-6 h-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300`} onClick={() => window.location.href = 'https://drive.google.com/drive/folders/1-1PPFIQ1gCeYcLGo0XsFLxJTz8aSEWM8?usp=sharing'}/>
                <Github className={`${darkMode? 'text-gray-400':'text-gray-500'} w-6 h-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300`} onClick={() => window.location.href = 'https://github.com/Syed-Ausaf-Hasib'}/>
                <Laptop className={`${darkMode? 'text-gray-400':'text-gray-500'} w-6 h-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300`} onClick={() => window.location.href = 'https://leetcode.com/u/Ausaf_Hasib/'}/>
                <Linkedin className={`${darkMode? 'text-gray-400':'text-gray-500'} w-6 h-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300`} onClick={() => window.location.href = 'https://www.linkedin.com/in/ausaf-hasib-7seven7/'}/>
                <Mail className={`${darkMode? 'text-gray-400':'text-gray-500'} w-6 h-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300`} onClick={() => window.location.href = 'mailto:syedausaf2003@gmail.com'}/>
            </div>
        </footer>
    );
}

export default Footer
