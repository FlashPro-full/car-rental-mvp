'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Car {
  id: number
  name: string
  model: string
  type: string
  price: number
  image: string
  features: string[]
}

export default function CarsPage() {
  const [cars] = useState<Car[]>([
    {
      id: 1,
      name: 'BMW 3 Series',
      model: '2023',
      type: 'sedan',
      price: 89,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Automatic', 'GPS', 'Bluetooth'],
    },
    {
      id: 2,
      name: 'Audi Q5',
      model: '2023',
      type: 'suv',
      price: 129,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Automatic', 'GPS', 'Bluetooth', 'Sunroof'],
    },
    {
      id: 3,
      name: 'Mercedes C-Class',
      model: '2023',
      type: 'luxury',
      price: 149,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Automatic', 'GPS', 'Bluetooth', 'Leather Seats'],
    },
    {
      id: 4,
      name: 'Toyota Camry',
      model: '2023',
      type: 'sedan',
      price: 59,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Automatic', 'GPS', 'Bluetooth'],
    },
    {
      id: 5,
      name: 'Honda CR-V',
      model: '2023',
      type: 'suv',
      price: 79,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Automatic', 'GPS', 'Bluetooth', 'AWD'],
    },
    {
      id: 6,
      name: 'Tesla Model 3',
      model: '2023',
      type: 'luxury',
      price: 199,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Electric', 'Autopilot', 'GPS', 'Premium Sound'],
    },
  ])

  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
  })

  useEffect(() => {
    let filtered = cars

    if (filters.type) {
      filtered = filtered.filter((car) => car.type === filters.type)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter((car) => car.price >= min && car.price <= max)
    }

    setFilteredCars(filtered)
  }, [filters, cars])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-gray text-white py-4 px-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold">
            CAR RENTAL
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm hover:text-gray-300">
              Home
            </Link>
            <Link href="/login" className="text-sm hover:text-gray-300">
              Login
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Available Cars</h1>
          <div className="flex gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50/day</option>
              <option value="50-100">$50 - $100/day</option>
              <option value="100-150">$100 - $150/day</option>
              <option value="150-999">$150+/day</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {car.name}
                </h3>
                <p className="text-gray-600 mb-4">{car.model} • {car.type}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${car.price}
                    <span className="text-sm font-normal text-gray-600">/day</span>
                  </span>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

