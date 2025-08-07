'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import profilPage from "../public/profilPage.png"
import { Bell, Sun, Moon } from 'lucide-react'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)

  // Sayfa yüklendiğinde tema kontrolü
  useEffect(() => {
    // localStorage'dan tema tercihini oku
    const savedMode = localStorage.getItem('darkMode')
    // Sistem tercihini kontrol et (eğer localStorage'da kayıt yoksa)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Eğer localStorage'da kayıt varsa onu kullan, yoksa sistem tercihini kullan
    const initialMode = savedMode !== null ? savedMode === 'true' : systemPrefersDark
    
    setDarkMode(initialMode)
    document.documentElement.classList.toggle('dark', initialMode)
    
    // Sistem teması değişikliklerini dinle
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches)
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Tema değiştirme fonksiyonu
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString()) // toString ekledik
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <header className='
      bg-white dark:bg-[#1e1e1e] 
      shadow-lg 
      border-b border-gray-200 dark:border-[#1f1f1f] 
      mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg
    '>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
        <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100'>
          MasterPos
        </h1>
        
        <div className='flex items-center space-x-3 sm:space-x-6'>
          {/* Tema değiştirme butonu */}
          <button 
            onClick={toggleDarkMode}
            className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2f2f2f]'
            aria-label={darkMode ? 'Light moda geç' : 'Dark moda geç'}
          >
            {darkMode ? (
              <Sun className='w-5 h-5 text-yellow-400' />
            ) : (
              <Moon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
            )}
          </button>
          
          <Image 
            src={profilPage} 
            alt='profile page' 
            width={25} 
            height={25} 
            className='rounded-full shadow-md cursor-pointer border border-gray-300 dark:border-gray-600' 
          />
          
          <div className='relative'>
            <Bell className='w-5 sm:w-6 h-5 sm:h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-white'/>
          </div>
          
          <div className='flex items-center space-x-2 sm:space-x-3'>
            <Image 
              src={profilPage} 
              alt='profile page' 
              width={25} 
              height={25} 
              className='rounded-full border border-gray-300 dark:border-gray-600' 
            />
            <span className='hidden sm:block text-gray-800 dark:text-gray-100 font-medium'>
              Abdullah Mutlu
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header