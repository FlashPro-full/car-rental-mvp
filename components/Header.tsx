export default function Header() {
  return (
    <header className="bg-dark-gray text-white py-4 px-8">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-gray-300 transition">
            HOME
          </a>
          <a href="#" className="text-sm font-medium hover:text-gray-300 transition">
            CARS
          </a>
          <a href="#" className="text-sm font-medium hover:text-gray-300 transition">
            BOOKINGS
          </a>
          <a href="#" className="text-sm font-medium hover:text-gray-300 transition">
            CUSTOMERS
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm font-medium hover:text-gray-300 transition">
            LOGIN
          </a>
        </div>
      </nav>
    </header>
  )
}

