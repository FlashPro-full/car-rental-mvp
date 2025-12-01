import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-dark-gray text-white py-4 px-8">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-gray-300 transition">
            HOME
          </Link>
          <Link href="/#cars" className="text-sm font-medium hover:text-gray-300 transition">
            CARS
          </Link>
          <Link href="/#bookings" className="text-sm font-medium hover:text-gray-300 transition">
            BOOKINGS
          </Link>
          <Link href="/#customers" className="text-sm font-medium hover:text-gray-300 transition">
            CUSTOMERS
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium hover:text-gray-300 transition">
            LOGIN
          </Link>
        </div>
      </nav>
    </header>
  )
}

