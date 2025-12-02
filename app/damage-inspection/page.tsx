'use client'

import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/i18n'
import toast from 'react-hot-toast'

interface CarPart {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
}

interface DamageReport {
  partId: string
  partName: string
  severity: 'none' | 'minor' | 'major'
  notes: string
}

const carParts: CarPart[] = [
  { id: 'front-bumper', name: 'Front Bumper', x: 40, y: 10, width: 20, height: 8 },
  { id: 'hood', name: 'Hood', x: 35, y: 15, width: 30, height: 15 },
  { id: 'windshield', name: 'Windshield', x: 38, y: 30, width: 24, height: 12 },
  { id: 'roof', name: 'Roof', x: 30, y: 42, width: 40, height: 15 },
  { id: 'rear-window', name: 'Rear Window', x: 38, y: 57, width: 24, height: 10 },
  { id: 'trunk', name: 'Trunk', x: 35, y: 67, width: 30, height: 15 },
  { id: 'rear-bumper', name: 'Rear Bumper', x: 40, y: 82, width: 20, height: 8 },
  { id: 'front-left-door', name: 'Front Left Door', x: 10, y: 30, width: 15, height: 25 },
  { id: 'rear-left-door', name: 'Rear Left Door', x: 10, y: 55, width: 15, height: 25 },
  { id: 'front-right-door', name: 'Front Right Door', x: 75, y: 30, width: 15, height: 25 },
  { id: 'rear-right-door', name: 'Rear Right Door', x: 75, y: 55, width: 15, height: 25 },
  { id: 'front-left-wheel', name: 'Front Left Wheel', x: 5, y: 45, width: 12, height: 12 },
  { id: 'front-right-wheel', name: 'Front Right Wheel', x: 83, y: 45, width: 12, height: 12 },
  { id: 'rear-left-wheel', name: 'Rear Left Wheel', x: 5, y: 70, width: 12, height: 12 },
  { id: 'rear-right-wheel', name: 'Rear Right Wheel', x: 83, y: 70, width: 12, height: 12 },
]

export default function DamageInspectionPage() {
  const { language } = useApp()
  const lang = language
  const [damageReports, setDamageReports] = useState<Record<string, DamageReport>>({})
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null)
  const [severity, setSeverity] = useState<'none' | 'minor' | 'major'>('none')
  const [notes, setNotes] = useState('')

  const handlePartClick = (part: CarPart) => {
    setSelectedPart(part)
    const existingReport = damageReports[part.id]
    if (existingReport) {
      setSeverity(existingReport.severity)
      setNotes(existingReport.notes)
    } else {
      setSeverity('none')
      setNotes('')
    }
  }

  const saveDamageReport = () => {
    if (!selectedPart) return

    const report: DamageReport = {
      partId: selectedPart.id,
      partName: selectedPart.name,
      severity,
      notes,
    }

    setDamageReports({
      ...damageReports,
      [selectedPart.id]: report,
    })

    toast.success(`${t('damageReport', lang)} saved for ${selectedPart.name}`)
    setSelectedPart(null)
    setSeverity('none')
    setNotes('')
  }

  const getPartColor = (partId: string) => {
    const report = damageReports[partId]
    if (!report || report.severity === 'none') return 'rgba(34, 197, 94, 0.3)' // green
    if (report.severity === 'minor') return 'rgba(234, 179, 8, 0.5)' // yellow
    return 'rgba(239, 68, 68, 0.6)' // red
  }

  const getPartBorderColor = (partId: string) => {
    const report = damageReports[partId]
    if (!report || report.severity === 'none') return 'rgba(34, 197, 94, 0.8)'
    if (report.severity === 'minor') return 'rgba(234, 179, 8, 0.9)'
    return 'rgba(239, 68, 68, 1)'
  }

  const handleSubmit = () => {
    const reports = Object.values(damageReports).filter((r) => r.severity !== 'none')
    if (reports.length === 0) {
      toast.error('Please report at least one damage')
      return
    }

    console.log('Damage Report Submitted:', reports)
    toast.success(t('submitReport', lang) + ' - ' + reports.length + ' damages reported')
    
    // Reset
    setDamageReports({})
    setSelectedPart(null)
    setSeverity('none')
    setNotes('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-gray text-white py-4 px-8">
        <h1 className="text-2xl font-bold">{t('damageInspection', lang)}</h1>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Schematic */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('selectArea', lang)}</h2>
              <div className="relative bg-gray-100 rounded-lg p-8" style={{ aspectRatio: '1/1' }}>
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  {/* Car outline */}
                  <rect
                    x="30"
                    y="20"
                    width="40"
                    height="60"
                    rx="5"
                    fill="rgba(156, 163, 175, 0.2)"
                    stroke="rgba(75, 85, 99, 0.5)"
                    strokeWidth="0.5"
                  />
                  
                  {/* Car parts */}
                  {carParts.map((part) => (
                    <g key={part.id}>
                      <rect
                        x={part.x}
                        y={part.y}
                        width={part.width}
                        height={part.height}
                        fill={getPartColor(part.id)}
                        stroke={getPartBorderColor(part.id)}
                        strokeWidth={selectedPart?.id === part.id ? '1' : '0.5'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePartClick(part)}
                        className="hover:opacity-80 transition"
                      />
                      {damageReports[part.id] && damageReports[part.id].severity !== 'none' && (
                        <text
                          x={part.x + part.width / 2}
                          y={part.y + part.height / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="3"
                          fill="white"
                          fontWeight="bold"
                        >
                          {damageReports[part.id].severity === 'minor' ? '!' : '!!'}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-300 rounded"></div>
                  <span>{t('noDamage', lang)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>{t('minorDamage', lang)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>{t('majorDamage', lang)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Damage Report Form */}
          <div className="space-y-6">
            {selectedPart ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {selectedPart.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('damageReport', lang)}
                    </label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as 'none' | 'minor' | 'major')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="none">{t('noDamage', lang)}</option>
                      <option value="minor">{t('minorDamage', lang)}</option>
                      <option value="major">{t('majorDamage', lang)}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Add notes about the damage..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveDamageReport}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPart(null)
                        setSeverity('none')
                        setNotes('')
                      }}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-600 text-center">
                  {t('selectArea', lang)} to report damage
                </p>
              </div>
            )}

            {/* Damage Reports Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {t('damageReport', lang)} Summary
              </h3>
              {Object.values(damageReports).filter((r) => r.severity !== 'none').length === 0 ? (
                <p className="text-gray-500 text-sm">No damages reported</p>
              ) : (
                <div className="space-y-2">
                  {Object.values(damageReports)
                    .filter((r) => r.severity !== 'none')
                    .map((report) => (
                      <div
                        key={report.partId}
                        className={`p-3 rounded-lg ${
                          report.severity === 'major'
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-yellow-50 border border-yellow-200'
                        }`}
                      >
                        <div className="font-semibold text-gray-800">{report.partName}</div>
                        <div className="text-sm text-gray-600 capitalize">{report.severity}</div>
                        {report.notes && (
                          <div className="text-xs text-gray-500 mt-1">{report.notes}</div>
                        )}
                      </div>
                    ))}
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={Object.values(damageReports).filter((r) => r.severity !== 'none').length === 0}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                {t('submitReport', lang)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

