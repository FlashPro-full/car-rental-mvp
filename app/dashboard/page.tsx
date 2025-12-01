'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardSidebar from '@/components/DashboardSidebar'
import CarListings from '@/components/CarListings'
import FeaturedCar from '@/components/FeaturedCar'
import FilterPanel from '@/components/FilterPanel'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('isAuthenticated')
      if (!auth) {
        router.push('/login')
      } else {
        setIsAuthenticated(true)
      }
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CarListings />
              <FeaturedCar />
            </div>
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

