import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Car Rental</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for car rental services. Quality vehicles, competitive prices, and exceptional service.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/#bookings" className="hover:text-white transition">
                  Bookings
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Long Term Rental
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Corporate Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Airport Transfer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@carrental.com</li>
              <li>Phone: +x (xxx) xxx-xxxx</li>
              <li>Address: 123 Main St, City, State</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Car Rental Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

