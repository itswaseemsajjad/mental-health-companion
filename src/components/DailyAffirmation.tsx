'use client'
import { useState } from 'react'
import { getDailyAffirmation, getRandomAffirmation } from '@/lib/affirmations'

export function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState(getDailyAffirmation())

  return (
    <div className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-2xl p-5 text-center">
      <p className="text-2xl mb-3">🌟</p>
      <p className="text-sm font-medium text-gray-500 mb-2">Daily Affirmation</p>
      <p className="text-teal-800 font-medium italic leading-relaxed mb-4">"{affirmation}"</p>
      <button
        onClick={() => setAffirmation(getRandomAffirmation())}
        className="text-xs text-teal-600 hover:text-teal-700 font-medium"
      >
        ↻ New affirmation
      </button>
    </div>
  )
}
