'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import toast from 'react-hot-toast'
import type { Car } from '@/contexts/AppContext'

export default function MobileAdminPage() {
  const router = useRouter()
  const { isAuthenticated, addCar, updateCar, cars, language } = useApp()
  const lang = language

  const [formData, setFormData] = useState<Partial<Car>>({
    name: '',
    model: '',
    type: 'sedan',
    price: 0,
    image: '',
    images: [],
    features: [],
    specs: {
      engine: '',
      transmission: 'Automatic',
      seats: 5,
      fuel: 'Petrol',
      mileage: '',
    },
    availability: 'available',
  })

  const [featureInput, setFeatureInput] = useState('')
  const [imageInput, setImageInput] = useState('')
  const [editingCarId, setEditingCarId] = useState<number | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (editingCarId) {
      const car = cars.find((c) => c.id === editingCarId)
      if (car) {
        setFormData({
          name: car.name,
          model: car.model,
          type: car.type,
          price: car.price,
          image: car.image,
          images: car.images || [],
          features: car.features,
          specs: car.specs || {
            engine: '',
            transmission: 'Automatic',
            seats: 5,
            fuel: 'Petrol',
            mileage: '',
          },
          availability: car.availability,
        })
      }
    }
  }, [editingCarId, cars])

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('specs.')) {
      const specField = field.replace('specs.', '')
      setFormData({
        ...formData,
        specs: {
          ...formData.specs!,
          [specField]: value,
        },
      })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      })
      setFeatureInput('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    })
  }

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageInput.trim()],
        image: formData.image || imageInput.trim(),
      })
      setImageInput('')
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || []
    setFormData({
      ...formData,
      images: newImages,
      image: newImages[0] || formData.image,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.model || !formData.price || !formData.image) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingCarId) {
      updateCar(editingCarId, formData)
      toast.success(t('carUpdated', lang))
    } else {
      const newCar: Car = {
        id: Date.now(),
        name: formData.name!,
        model: formData.model!,
        type: formData.type || 'sedan',
        price: formData.price!,
        image: formData.image!,
        images: formData.images || [],
        features: formData.features || [],
        specs: formData.specs,
        availability: formData.availability || 'available',
      }
      addCar(newCar)
      toast.success(t('carAdded', lang))
    }

    // Reset form
    setFormData({
      name: '',
      model: '',
      type: 'sedan',
      price: 0,
      image: '',
      images: [],
      features: [],
      specs: {
        engine: '',
        transmission: 'Automatic',
        seats: 5,
        fuel: 'Petrol',
        mileage: '',
      },
      availability: 'available',
    })
    setEditingCarId(null)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-dark-gray text-white py-4 px-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold">{t('fleetManagement', lang)}</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingCarId ? t('editCar', lang) : t('addCar', lang)}
          </h2>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('carName', lang)} *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('carModel', lang)} *
              </label>
              <input
                type="text"
                value={formData.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('carType', lang)}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('carPrice', lang)} * ($/{t('perDay', lang)})
                </label>
                <input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('carImage', lang)} *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Image URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.images?.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image src={img} alt={`Image ${idx + 1}`} fill className="object-cover" />
                  </div>
                  <span className="flex-1 text-sm text-gray-600 truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('features', lang)}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Feature name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features?.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('engine', lang)}
              </label>
              <input
                type="text"
                value={formData.specs?.engine || ''}
                onChange={(e) => handleInputChange('specs.engine', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('transmission', lang)}
              </label>
              <select
                value={formData.specs?.transmission || 'Automatic'}
                onChange={(e) => handleInputChange('specs.transmission', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('seats', lang)}
              </label>
              <input
                type="number"
                value={formData.specs?.seats || 5}
                onChange={(e) => handleInputChange('specs.seats', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                min="2"
                max="9"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fuel', lang)}
              </label>
              <select
                value={formData.specs?.fuel || 'Petrol'}
                onChange={(e) => handleInputChange('specs.fuel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('mileage', lang)}
              </label>
              <input
                type="text"
                value={formData.specs?.mileage || ''}
                onChange={(e) => handleInputChange('specs.mileage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., 15,000 km"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('availability', lang)}
            </label>
            <select
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="available">{t('available', lang)}</option>
              <option value="rented">{t('rented', lang)}</option>
              <option value="maintenance">{t('maintenance', lang)}</option>
              <option value="reserved">{t('reserved', lang)}</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              {editingCarId ? t('save', lang) : t('addCar', lang)}
            </button>
            {editingCarId && (
              <button
                type="button"
                onClick={() => {
                  setEditingCarId(null)
                  setFormData({
                    name: '',
                    model: '',
                    type: 'sedan',
                    price: 0,
                    image: '',
                    images: [],
                    features: [],
                    specs: {
                      engine: '',
                      transmission: 'Automatic',
                      seats: 5,
                      fuel: 'Petrol',
                      mileage: '',
                    },
                    availability: 'available',
                  })
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
              >
                {t('cancel', lang)}
              </button>
            )}
          </div>
        </form>

        {/* Car List for Quick Edit */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Edit Cars</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {cars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-gray-800">{car.name}</div>
                  <div className="text-sm text-gray-600">{car.model} • ${car.price}/{t('perDay', lang)}</div>
                </div>
                <button
                  onClick={() => setEditingCarId(car.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  {t('editCar', lang)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

