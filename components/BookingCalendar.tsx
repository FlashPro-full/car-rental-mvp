'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import { format, isSameDay, isWithinInterval, eachDayOfInterval } from 'date-fns'

interface BookingCalendarProps {
  carId?: number
  onDateSelect?: (startDate: Date, endDate: Date) => void
}

export default function BookingCalendar({ carId, onDateSelect }: BookingCalendarProps) {
  const { bookings, getBookingsByCarId, language } = useApp()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const lang = language

  const carBookings = carId ? getBookingsByCarId(carId) : bookings

  // Get booked date ranges
  const bookedDates = carBookings
    .filter((booking) => booking.status !== 'cancelled')
    .map((booking) => ({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    }))

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end })
    )
  }

  // Get all booked dates for highlighting
  const getAllBookedDates = () => {
    const dates: Date[] = []
    bookedDates.forEach((range) => {
      const days = eachDayOfInterval({ start: range.start, end: range.end })
      dates.push(...days)
    })
    return dates
  }

  const bookedDatesList = getAllBookedDates()

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    if (start && end && onDateSelect) {
      onDateSelect(start, end)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('selectDates', lang)}</h3>
      <div className="flex flex-col items-center">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={new Date()}
          excludeDates={bookedDatesList}
          className="w-full"
          dayClassName={(date) => {
            if (isDateBooked(date)) {
              return 'bg-red-200 text-red-800 cursor-not-allowed'
            }
            return ''
          }}
        />
        {bookedDates.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-2 font-semibold">Booked Dates:</p>
            <div className="space-y-1">
              {bookedDates.map((range, idx) => (
                <div key={idx} className="text-xs">
                  {format(range.start, 'MMM dd')} - {format(range.end, 'MMM dd')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

