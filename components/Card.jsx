'use client'
import React from 'react'

const Card = ({ name, icon: Icon, value }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 shadow-sm border border-[#2f2f2f] hover:border-[#3f3f3f] transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{name}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value || 'N/A'}</p>
        </div>
        {Icon && (
          <div className="p-3 rounded-full bg-[#2a2a2a]">
            <Icon className="h-6 w-6 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Card