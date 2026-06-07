'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const moodEmojis = ['😞', '😟', '😐', '🙂', '😊', '😄', '🤗', '😁', '🌟', '🎉']
const moodLabels = ['Terrible', 'Very Bad', 'Bad', 'Okay', 'Fine', 'Good', 'Great', 'Very Good', 'Excellent', 'Perfect']
const commonTags = ['Anxious', 'Stressed', 'Tired', 'Happy', 'Sad', 'Angry', 'Calm', 'Motivated', 'Lonely', 'Grateful']

export default function LogMoodPage() {
  const router = useRouter()
  const [mood, setMood] = useState(5)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  function toggleTag(tag: string) {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, note, tags }),
    })
    router.push('/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Log Your Mood</h1>
      <p className="text-gray-500 mb-8">How are you feeling right now?</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
          <div className="text-7xl mb-4">{moodEmojis[mood - 1]}</div>
          <p className="text-xl font-semibold text-gray-900 mb-6">{moodLabels[mood - 1]}</p>
          <input
            type="range" min={1} max={10} value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 - Terrible</span>
            <span>10 - Perfect</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <label className="block text-sm font-medium text-gray-700 mb-2">How I&apos;m feeling (optional)</label>
          <textarea
            value={note} onChange={(e) => setNote(e.target.value)} rows={3}
            placeholder="What's on your mind? What happened today?"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <label className="block text-sm font-medium text-gray-700 mb-3">Tags (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <button
                key={tag} type="button" onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${tags.includes(tag) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Mood Entry'}
        </button>
      </form>
    </div>
  )
}
