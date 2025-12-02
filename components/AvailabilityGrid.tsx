'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import { format } from 'date-fns'

interface AvailabilityGridProps {
  startDate?: Date
  endDate?: Date
}

export default function AvailabilityGrid({ startDate, endDate }: AvailabilityGridProps) {
  const { cars, getAvailableCars, language } = useApp()
  const lang = language

  const availableCars = startDate && endDate
    ? getAvailableCars(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      )
    : cars.filter((car) => car.availability === 'available')

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {t('available', lang)} {t('cars', lang)}
      </h2>
      {availableCars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {startDate && endDate
              ? `No cars available for the selected dates`
              : 'No cars available at the moment'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableCars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      car.availability === 'available'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {t(car.availability, lang)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{car.name}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {car.model} • {car.type}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {car.features.slice(0, 3).map((feature, idx) => (
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
                    <span className="text-sm font-normal text-gray-600">/{t('perDay', lang)}</span>
                  </span>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm">
                    {t('bookNow', lang)}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

