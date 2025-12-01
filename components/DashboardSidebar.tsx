'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'fleet', label: 'Fleet Management', icon: '🚗', path: '/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: '📅', path: '/dashboard/bookings' },
    { id: 'customers', label: 'Customers', icon: '👥', path: '/dashboard' },
    { id: 'reports', label: 'Reports', icon: '📈', path: '/dashboard' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/dashboard' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const filterOptions = [
    { id: 'available', label: 'Available', color: 'bg-blue-400' },
    { id: 'rented', label: 'Rented', color: 'bg-purple-400' },
    { id: 'maintenance', label: 'Maintenance', color: 'bg-green-400' },
    { id: 'reserved', label: 'Reserved', color: 'bg-pink-400' },
  ]

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      {/* Navigation Menu */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                pathname === item.path
                  ? 'bg-red-50 text-red-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mb-8">
        Add New Vehicle
      </button>

      {/* Filters Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Quick Filters
        </h2>
        <div className="space-y-3">
          {filterOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(option.id)}
                onChange={() => toggleFilter(option.id)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <div className={`w-4 h-4 rounded ${option.color}`}></div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

