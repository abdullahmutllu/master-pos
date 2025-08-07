'use client'

import Image from 'next/image'
import { Bell } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import profilPage from "../public/profilPage.png"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          MasterPos
        </h1>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Image 
              src={profilPage} 
              alt="Profile" 
              width={32}
              height={32}
              className="rounded-full border border-gray-300 dark:border-gray-600"
            />
            <span className="hidden sm:inline text-gray-900 dark:text-white">
              Abdullah Mutlu
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}