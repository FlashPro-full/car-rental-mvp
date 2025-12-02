'use client'

import { useState, useMemo } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import { format, addDays, differenceInDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns'
import toast from 'react-hot-toast'

interface BookingBarProps {
  booking: {
    id: number
    carId: number
    carName: string
    startDate: string
    endDate: string
    status: string
  }
  startDate: Date
  endDate: Date
  carIndex: number
}

function BookingBar({ booking, startDate, endDate, carIndex }: BookingBarProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `booking-${booking.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const bookingStart = new Date(booking.startDate)
  const bookingEnd = new Date(booking.endDate)
  const chartStart = startDate
  const chartEnd = endDate

  const daysFromStart = differenceInDays(bookingStart, chartStart)
  const bookingDuration = differenceInDays(bookingEnd, bookingStart) + 1
  const totalDays = differenceInDays(chartEnd, chartStart) + 1

  const leftPercent = (daysFromStart / totalDays) * 100
  const widthPercent = (bookingDuration / totalDays) * 100

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-blue-500',
    completed: 'bg-green-500',
    cancelled: 'bg-gray-400',
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute h-8 rounded cursor-move ${statusColors[booking.status] || 'bg-gray-500'} text-white text-xs flex items-center justify-center px-2 hover:opacity-80 transition`}
      style={{
        ...style,
        left: `${Math.max(0, leftPercent)}%`,
        width: `${Math.min(100, widthPercent)}%`,
        top: `${carIndex * 50 + 10}px`,
        minWidth: '60px',
      }}
      title={`${booking.carName}: ${format(bookingStart, 'MMM dd')} - ${format(bookingEnd, 'MMM dd')}`}
    >
      <span className="truncate">{booking.carName}</span>
    </div>
  )
}

export default function GanttChart() {
  const { bookings, cars, updateBooking, language } = useApp()
  const lang = language

  const [viewStartDate, setViewStartDate] = useState(() => {
    const today = new Date()
    return startOfWeek(today, { weekStartsOn: 1 })
  })

  const [viewEndDate, setViewEndDate] = useState(() => {
    const today = new Date()
    return addDays(endOfWeek(today, { weekStartsOn: 1 }), 14)
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  const days = useMemo(() => {
    return eachDayOfInterval({ start: viewStartDate, end: viewEndDate })
  }, [viewStartDate, viewEndDate])

  // Group bookings by car
  const bookingsByCar = useMemo(() => {
    const grouped: Record<number, typeof bookings> = {}
    cars.forEach((car) => {
      grouped[car.id] = bookings.filter((b) => b.carId === car.id && b.status !== 'cancelled')
    })
    return grouped
  }, [bookings, cars])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    setActiveId(null)

    if (!over || !delta) return

    const bookingId = parseInt((active.id as string).replace('booking-', ''))
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    // Calculate new dates based on drag delta
    const dayWidth = 100 / days.length // percentage per day
    const daysMoved = Math.round(delta.x / (dayWidth * 10)) // approximate conversion
    
    if (daysMoved === 0) return

    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)
    const bookingDuration = differenceInDays(bookingEnd, bookingStart)
    
    const newStartDate = addDays(bookingStart, daysMoved)
    const newEndDate = addDays(newStartDate, bookingDuration)

    // Validate dates are within view range
    if (newStartDate < viewStartDate || newEndDate > viewEndDate) {
      toast.error('Cannot move booking outside view range')
      return
    }

    updateBooking(bookingId, {
      startDate: format(newStartDate, 'yyyy-MM-dd'),
      endDate: format(newEndDate, 'yyyy-MM-dd'),
    })

    toast.success(t('bookingUpdated', lang))
  }

  const activeBooking = activeId
    ? bookings.find((b) => `booking-${b.id}` === activeId)
    : null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{t('fleetManagement', lang)}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setViewStartDate(addDays(viewStartDate, -7))
              setViewEndDate(addDays(viewEndDate, -7))
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-600">
            {format(viewStartDate, 'MMM dd')} - {format(viewEndDate, 'MMM dd')}
          </span>
          <button
            onClick={() => {
              setViewStartDate(addDays(viewStartDate, 7))
              setViewEndDate(addDays(viewEndDate, 7))
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="min-w-full">
            {/* Header with dates */}
            <div className="flex border-b-2 border-gray-300 mb-2">
              <div className="w-48 flex-shrink-0 p-2 font-semibold text-gray-700 border-r-2 border-gray-300">
                {t('cars', lang)}
              </div>
              <div className="flex flex-1">
                {days.map((day, idx) => (
                  <div
                    key={idx}
                    className="flex-1 min-w-[100px] p-2 text-center text-sm border-r border-gray-200"
                  >
                    <div className="font-semibold">{format(day, 'EEE')}</div>
                    <div className="text-gray-600">{format(day, 'MMM dd')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Car rows */}
            <SortableContext
              items={bookings.map((b) => `booking-${b.id}`)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="relative">
                {cars.map((car, carIndex) => (
                  <div key={car.id} className="flex border-b border-gray-200 min-h-[50px] relative">
                    <div className="w-48 flex-shrink-0 p-2 border-r-2 border-gray-300 bg-gray-50">
                      <div className="font-semibold text-gray-800">{car.name}</div>
                      <div className="text-xs text-gray-600">{car.type}</div>
                    </div>
                    <div className="flex-1 relative" style={{ minHeight: '50px' }}>
                      {bookingsByCar[car.id]?.map((booking) => (
                        <BookingBar
                          key={booking.id}
                          booking={booking}
                          startDate={viewStartDate}
                          endDate={viewEndDate}
                          carIndex={carIndex}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeBooking ? (
                <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                  {activeBooking.carName}
                </div>
              ) : null}
            </DragOverlay>
          </div>
        </DndContext>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>{t('pending', lang)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>{t('confirmed', lang)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>{t('completed', lang)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>{t('cancelled', lang)}</span>
        </div>
      </div>
    </div>
  )
}

