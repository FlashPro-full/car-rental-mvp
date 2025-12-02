'use client'

import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import type { Language } from '@/lib/i18n'

export default function Header() {
  const { language, setLanguage, isAuthenticated, logout } = useApp()
  const lang = language

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'pl', label: 'PL' },
    { code: 'cz', label: 'CZ' },
    { code: 'nl', label: 'NL' },
  ]

  return (
    <header className="bg-dark-gray text-white py-4 px-8">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-gray-300 transition">
            {t('home', lang).toUpperCase()}
          </Link>
          <Link href="/cars" className="text-sm font-medium hover:text-gray-300 transition">
            {t('cars', lang).toUpperCase()}
          </Link>
          <Link href="/#bookings" className="text-sm font-medium hover:text-gray-300 transition">
            {t('bookings', lang).toUpperCase()}
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-300 transition">
              {t('dashboard', lang).toUpperCase()}
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            {languages.map((langOption) => (
              <button
                key={langOption.code}
                onClick={() => setLanguage(langOption.code)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  language === langOption.code
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {langOption.label}
              </button>
            ))}
          </div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              {t('logout', lang).toUpperCase()}
            </button>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:text-gray-300 transition">
              {t('login', lang).toUpperCase()}
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

