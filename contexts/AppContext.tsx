'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
export interface Car {
  id: number
  name: string
  model: string
  type: string
  price: number
  image: string
  images?: string[]
  features: string[]
  specs?: {
    engine: string
    transmission: string
    seats: number
    fuel: string
    mileage: string
  }
  availability: 'available' | 'rented' | 'maintenance' | 'reserved'
}

export interface Booking {
  id: number
  carId: number
  carName: string
  customerName: string
  customerEmail: string
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
}

export interface User {
  email: string
  name: string
  role: 'admin' | 'customer'
}

interface AppContextType {
  // User state
  user: User | null
  isAuthenticated: boolean
  login: (email: string, name: string, role?: 'admin' | 'customer') => void
  logout: () => void

  // Cars state
  cars: Car[]
  setCars: (cars: Car[]) => void
  addCar: (car: Car) => void
  updateCar: (id: number, car: Partial<Car>) => void
  deleteCar: (id: number) => void
  getCarById: (id: number) => Car | undefined

  // Bookings state
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: number, booking: Partial<Booking>) => void
  deleteBooking: (id: number) => void
  getBookingsByCarId: (carId: number) => Booking[]
  getAvailableCars: (startDate: string, endDate: string) => Car[]

  // Language state
  language: 'en' | 'pl' | 'cz' | 'nl'
  setLanguage: (lang: 'en' | 'pl' | 'cz' | 'nl') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock initial data
const initialCars: Car[] = [
  {
    id: 1,
    name: 'BMW 3 Series',
    model: '2023',
    type: 'sedan',
    price: 89,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Automatic', 'GPS', 'Bluetooth'],
    specs: {
      engine: '2.0L Turbo',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Petrol',
      mileage: '15,000 km',
    },
    availability: 'available',
  },
  {
    id: 2,
    name: 'Audi Q5',
    model: '2023',
    type: 'suv',
    price: 129,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Automatic', 'GPS', 'Bluetooth', 'Sunroof'],
    specs: {
      engine: '2.0L Turbo',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Petrol',
      mileage: '12,000 km',
    },
    availability: 'available',
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    model: '2023',
    type: 'luxury',
    price: 149,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Automatic', 'GPS', 'Bluetooth', 'Leather Seats'],
    specs: {
      engine: '2.0L Turbo',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Petrol',
      mileage: '10,000 km',
    },
    availability: 'available',
  },
  {
    id: 4,
    name: 'Toyota Camry',
    model: '2023',
    type: 'sedan',
    price: 59,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Automatic', 'GPS', 'Bluetooth'],
    specs: {
      engine: '2.5L',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Hybrid',
      mileage: '18,000 km',
    },
    availability: 'available',
  },
  {
    id: 5,
    name: 'Honda CR-V',
    model: '2023',
    type: 'suv',
    price: 79,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Automatic', 'GPS', 'Bluetooth', 'AWD'],
    specs: {
      engine: '1.5L Turbo',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Petrol',
      mileage: '20,000 km',
    },
    availability: 'available',
  },
  {
    id: 6,
    name: 'Tesla Model 3',
    model: '2023',
    type: 'luxury',
    price: 199,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Electric', 'Autopilot', 'GPS', 'Premium Sound'],
    specs: {
      engine: 'Electric',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Electric',
      mileage: '8,000 km',
    },
    availability: 'available',
  },
]

const initialBookings: Booking[] = [
  {
    id: 1,
    carId: 1,
    carName: 'BMW 3 Series',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    status: 'confirmed',
    totalPrice: 445,
  },
  {
    id: 2,
    carId: 2,
    carName: 'Audi Q5',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    startDate: '2025-01-18',
    endDate: '2025-01-25',
    status: 'confirmed',
    totalPrice: 903,
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [language, setLanguage] = useState<'en' | 'pl' | 'cz' | 'nl'>('en')

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      const savedCars = localStorage.getItem('cars')
      const savedBookings = localStorage.getItem('bookings')
      const savedLanguage = localStorage.getItem('language')

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      if (savedCars) {
        setCars(JSON.parse(savedCars))
      }
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings))
      }
      if (savedLanguage) {
        setLanguage(savedLanguage as 'en' | 'pl' | 'cz' | 'nl')
      }
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isAuthenticated', 'true')
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
      }
    }
  }, [user])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cars', JSON.stringify(cars))
    }
  }, [cars])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(bookings))
    }
  }, [bookings])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  const login = (email: string, name: string, role: 'admin' | 'customer' = 'customer') => {
    const newUser: User = { email, name, role }
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  const addCar = (car: Car) => {
    setCars([...cars, car])
  }

  const updateCar = (id: number, updates: Partial<Car>) => {
    setCars(cars.map((car) => (car.id === id ? { ...car, ...updates } : car)))
  }

  const deleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id))
  }

  const getCarById = (id: number) => {
    return cars.find((car) => car.id === id)
  }

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking])
    // Update car availability
    updateCar(booking.carId, { availability: 'rented' })
  }

  const updateBooking = (id: number, updates: Partial<Booking>) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking)))
  }

  const deleteBooking = (id: number) => {
    const booking = bookings.find((b) => b.id === id)
    if (booking) {
      setBookings(bookings.filter((b) => b.id !== id))
      // Update car availability
      updateCar(booking.carId, { availability: 'available' })
    }
  }

  const getBookingsByCarId = (carId: number) => {
    return bookings.filter((booking) => booking.carId === carId)
  }

  const getAvailableCars = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    return cars.filter((car) => {
      // Check if car is available
      if (car.availability !== 'available') return false

      // Check if car has conflicting bookings
      const conflictingBookings = bookings.filter((booking) => {
        if (booking.carId !== car.id || booking.status === 'cancelled') return false
        const bookingStart = new Date(booking.startDate)
        const bookingEnd = new Date(booking.endDate)
        return !(end < bookingStart || start > bookingEnd)
      })

      return conflictingBookings.length === 0
    })
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        cars,
        setCars,
        addCar,
        updateCar,
        deleteCar,
        getCarById,
        bookings,
        setBookings,
        addBooking,
        updateBooking,
        deleteBooking,
        getBookingsByCarId,
        getAvailableCars,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

