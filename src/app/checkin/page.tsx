'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckInPage() {
  const router = useRouter()
  const [values, setValues] = useState({ mood: 5, energy: 5, anxiety: 5, sleep: 7, gratitude: '', goals: '' })
  const [loading, setLoading] = useState(false)

  const sliders = [
    { key: 'mood', label: 'Overall Mood', min: 1, max: 10, emoji: '🌤️' },
    { key: 'energy', label: 'Energy Level', min: 1, max: 10, emoji: '⚡' },
    { key: 'anxiety', label: 'Anxiety Level', min: 1, max: 10, emoji: '😰' },
    { key: 'sleep', label: 'Hours of Sleep', min: 0, max: 12, emoji: '😴' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    router.push('/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Check-In</h1>
      <p className="text-gray-500 mb-8">Take a moment to reflect on your day</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-6">
          {sliders.map((s) => (
            <div key={s.key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">{s.emoji} {s.label}</label>
                <span className="text-teal-600 font-bold">{(values as any)[s.key]}{s.key === 'sleep' ? 'h' : '/10'}</span>
              </div>
              <input type="range" min={s.min} max={s.max} value={(values as any)[s.key]} onChange={(e) => setValues((v) => ({ ...v, [s.key]: Number(e.target.value) }))} className="w-full accent-teal-600" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <label className="block text-sm font-medium text-gray-700 mb-2">🙏 Three things I&apos;m grateful for</label>
          <textarea value={values.gratitude} onChange={(e) => setValues((v) => ({ ...v, gratitude: e.target.value }))} rows={3} placeholder="1. ..." className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <label className="block text-sm font-medium text-gray-700 mb-2">🎯 Goals for tomorrow</label>
          <textarea value={values.goals} onChange={(e) => setValues((v) => ({ ...v, goals: e.target.value }))} rows={3} placeholder="1. ..." className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 disabled:opacity-50">{loading ? 'Saving...' : 'Complete Check-In'}</button>
      </form>
    </div>
  )
}
