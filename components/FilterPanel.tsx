'use client'

import { useState } from 'react'

export default function FilterPanel() {
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto Sync</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {isFilterOpen ? '−' : '+'}
          </button>
        </div>
        {isFilterOpen && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>All Prices</option>
                <option>$0 - $50/day</option>
                <option>$50 - $100/day</option>
                <option>$100 - $150/day</option>
                <option>$150+/day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>All Types</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Luxury</option>
                <option>Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>All Status</option>
                <option>Available</option>
                <option>Rented</option>
                <option>Maintenance</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
              Apply Filters
            </button>
          </div>
        )}
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Monthly Stats</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm opacity-90">Total Revenue</p>
            <p className="text-2xl font-bold">$45,230</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Active Rentals</p>
            <p className="text-2xl font-bold">23</p>
          </div>
        </div>
      </div>
    </div>
  )
}

