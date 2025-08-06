'use client'
import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ICONS = {
  house: House,
  dollarSign: DollarSign,
  settings: Settings,
  shoppingBag: ShoppingBag,
  shoppingCart: ShoppingCart,
  mail: Mail,
  users: Users,
  bell: Bell,
  info: Info
}

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState([])
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) => console.error("Error loading sidebar items:", error))
  }, [])

  return (
    <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}>
      <div className='h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]'>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer mb-6'
        >
          <Menu size={24} className="text-gray-300 hover:text-white" />
        </button>
        
        <nav className='flex-grow'>
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon]
            return (
              <Link key={item.name} href={item.href} passHref>
                <div className={`
                  flex items-center p-3 rounded-lg mb-2 transition-all
                  ${pathname === item.href ? 
                    'bg-[#2f2f2f] text-white' : 
                    'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'}
                `}>
                  <div className="p-1.5 rounded-md bg-[#2a2a2a] flex items-center justify-center">
                    {IconComponent && (
                      <IconComponent 
                        size={20} 
                        className={`
                          ${pathname === item.href ? 'text-white' : 'text-gray-300'}
                        `}
                      />
                    )}
                  </div>
                  
                  {isSidebarOpen && (
                    <span className='ml-3 whitespace-nowrap text-sm font-medium'>
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar