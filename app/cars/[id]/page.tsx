'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import BookingEngine from '@/components/BookingEngine'
import BookingCalendar from '@/components/BookingCalendar'
import toast from 'react-hot-toast'

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getCarById, language } = useApp()
  const carId = parseInt(params.id as string)
  const car = getCarById(carId)
  const lang = language

  const [selectedImage, setSelectedImage] = useState(0)

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Car not found</h1>
          <button
            onClick={() => router.push('/cars')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  const images = car.images || [car.image]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-gray text-white py-4 px-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => router.push('/cars')}
            className="text-sm font-medium hover:text-gray-300 transition"
          >
            ← {t('cars', lang)}
          </button>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage === idx ? 'border-red-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${car.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{car.name}</h1>
              <p className="text-xl text-gray-600 mb-4">
                {car.model} • {car.type}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    car.availability === 'available'
                      ? 'bg-green-100 text-green-800'
                      : car.availability === 'rented'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {t(car.availability, lang)}
                </span>
                <span className="text-3xl font-bold text-red-600">
                  ${car.price}
                  <span className="text-lg font-normal text-gray-600">/{t('perDay', lang)}</span>
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('features', lang)}</h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            {car.specs && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('specifications', lang)}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">{t('engine', lang)}:</span>
                    <p className="font-semibold text-gray-800">{car.specs.engine}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('transmission', lang)}:</span>
                    <p className="font-semibold text-gray-800">{car.specs.transmission}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('seats', lang)}:</span>
                    <p className="font-semibold text-gray-800">{car.specs.seats}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('fuel', lang)}:</span>
                    <p className="font-semibold text-gray-800">{car.specs.fuel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('mileage', lang)}:</span>
                    <p className="font-semibold text-gray-800">{car.specs.mileage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <BookingEngine carId={car.id} />
          </div>
          <div className="lg:col-span-1">
            <BookingCalendar carId={car.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

