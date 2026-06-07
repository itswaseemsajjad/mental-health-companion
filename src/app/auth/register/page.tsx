'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password') }) })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Failed'); return }
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8"><div className="text-5xl mb-3">🌱</div><h1 className="text-2xl font-bold text-gray-900">Start your journey</h1><p className="text-gray-500 text-sm">Create your MindfulAI account</p></div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" required placeholder="Full Name" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input name="email" type="email" required placeholder="Email" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input name="password" type="password" required minLength={6} placeholder="Password (min 6 chars)" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 disabled:opacity-50">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">Already have an account? <Link href="/auth/signin" className="text-teal-600 hover:underline">Sign In</Link></p>
      </div>
    </div>
  )
}
