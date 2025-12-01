'use client'

import { useState } from 'react'

interface Car {
  id: number
  name: string
  model: string
  price: number
  status: string
  image: string
}

export default function CarListings() {
  const [cars] = useState<Car[]>([
    {
      id: 1,
      name: 'BMW 3 Series',
      model: '2023 Sedan',
      price: 89,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Audi Q5',
      model: '2023 SUV',
      price: 129,
      status: 'rented',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Mercedes C-Class',
      model: '2023 Luxury',
      price: 149,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'rented':
        return 'bg-blue-100 text-blue-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Fleet Overview</h2>
        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-40 bg-gray-200 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{car.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    car.status
                  )}`}
                >
                  {car.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{car.model}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${car.price}
                  <span className="text-sm font-normal text-gray-600">/day</span>
                </span>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

