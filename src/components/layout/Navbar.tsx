'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-teal-600">🌿 MindfulAI</Link>
        <div className="flex items-center gap-6">
          {session && (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-teal-600 text-sm font-medium">Dashboard</Link>
              <Link href="/chat" className="text-gray-600 hover:text-teal-600 text-sm font-medium">Chat</Link>
              <Link href="/exercises" className="text-gray-600 hover:text-teal-600 text-sm font-medium">Exercises</Link>
            </>
          )}
          {session ? (
            <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-red-500">Sign Out</button>
          ) : (
            <Link href="/auth/signin" className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
