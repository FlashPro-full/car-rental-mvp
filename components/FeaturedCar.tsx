'use client'

import Image from 'next/image'

export default function FeaturedCar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Vehicle</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Featured Car"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-red-600">3</div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Available Units</p>
              <p className="text-sm text-gray-600">Premium Sedan Collection</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Vehicle Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Model:</span>
                <span className="font-medium">2023 Premium Sedan</span>
              </li>
              <li className="flex justify-between">
                <span>Daily Rate:</span>
                <span className="font-medium">$149/day</span>
              </li>
              <li className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Total Bookings:</span>
                <span className="font-medium">47</span>
              </li>
            </ul>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  )
}

