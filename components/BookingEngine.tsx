'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import toast from 'react-hot-toast'

interface BookingEngineProps {
  carId?: number
  onBookingComplete?: () => void
}

export default function BookingEngine({ carId, onBookingComplete }: BookingEngineProps) {
  const { cars, getAvailableCars, addBooking, language, user } = useApp()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedCarId, setSelectedCarId] = useState<number | null>(carId || null)
  const [customerName, setCustomerName] = useState(user?.name || '')
  const [customerEmail, setCustomerEmail] = useState(user?.email || '')
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
  })

  const lang = language

  // Get available cars based on selected dates
  const availableCars = startDate && endDate
    ? getAvailableCars(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
    : cars.filter((car) => car.availability === 'available')

  // Filter cars by type and price
  let filteredCars = availableCars
  if (filters.type) {
    filteredCars = filteredCars.filter((car) => car.type === filters.type)
  }
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number)
    filteredCars = filteredCars.filter((car) => car.price >= min && car.price <= max)
  }

  const calculateTotalPrice = () => {
    if (!selectedCarId || !startDate || !endDate) return 0
    const car = cars.find((c) => c.id === selectedCarId)
    if (!car) return 0
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return car.price * days
  }

  const handleBooking = () => {
    if (!selectedCarId || !startDate || !endDate) {
      toast.error('Please select a car and dates')
      return
    }
    if (!customerName || !customerEmail) {
      toast.error('Please fill in customer details')
      return
    }

    const car = cars.find((c) => c.id === selectedCarId)
    if (!car) return

    const newBooking = {
      id: Date.now(),
      carId: selectedCarId,
      carName: car.name,
      customerName,
      customerEmail,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'confirmed' as const,
      totalPrice: calculateTotalPrice(),
    }

    addBooking(newBooking)
    toast.success(t('bookingCreated', lang))
    
    // Reset form
    setStartDate(null)
    setEndDate(null)
    setSelectedCarId(carId || null)
    setCustomerName(user?.name || '')
    setCustomerEmail(user?.email || '')
    
    if (onBookingComplete) {
      onBookingComplete()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t('bookingDetails', lang)}</h2>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('pickupDate', lang)}
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholderText={t('pickupDate', lang)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('returnDate', lang)}
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholderText={t('returnDate', lang)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('carType', lang)}
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t('all', lang)}</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('priceRange', lang)}
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t('all', lang)}</option>
            <option value="0-50">$0 - $50/{t('perDay', lang)}</option>
            <option value="50-100">$50 - $100/{t('perDay', lang)}</option>
            <option value="100-150">$100 - $150/{t('perDay', lang)}</option>
            <option value="150-999">$150+/{t('perDay', lang)}</option>
          </select>
        </div>
      </div>

      {/* Car Selection */}
      {!carId && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('cars', lang)}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedCarId === car.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-800">{car.name}</div>
                <div className="text-sm text-gray-600">{car.model} • {car.type}</div>
                <div className="text-lg font-bold text-red-600 mt-2">
                  ${car.price}
                  <span className="text-sm font-normal text-gray-600">/{t('perDay', lang)}</span>
                </div>
              </div>
            ))}
          </div>
          {filteredCars.length === 0 && (
            <p className="text-gray-500 text-center py-4">{t('available', lang)}</p>
          )}
        </div>
      )}

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('customerName', lang)}
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder={t('customerName', lang)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('customerEmail', lang)}
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder={t('customerEmail', lang)}
          />
        </div>
      </div>

      {/* Total Price */}
      {selectedCarId && startDate && endDate && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">{t('totalPrice', lang)}:</span>
            <span className="text-2xl font-bold text-red-600">${calculateTotalPrice()}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}{' '}
            {t('days', lang)}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedCarId || !startDate || !endDate || !customerName || !customerEmail}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        {t('confirmBooking', lang)}
      </button>
    </div>
  )
}

