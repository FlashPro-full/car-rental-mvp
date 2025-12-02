'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import BookingEngine from '@/components/BookingEngine'
import AvailabilityGrid from '@/components/AvailabilityGrid'
import BookingCalendar from '@/components/BookingCalendar'
import ContentSection from '@/components/ContentSection'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* Booking Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingEngine />
          </div>
          <div className="lg:col-span-1">
            <BookingCalendar onDateSelect={handleDateSelect} />
          </div>
        </div>
      </section>

      {/* Availability Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <AvailabilityGrid startDate={selectedStartDate || undefined} endDate={selectedEndDate || undefined} />
      </section>

      <StatsSection />
      <ContentSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

