'use client'
import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/chat')
      .then((r) => r.json())
      .then((data) => setMessages(data))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg }),
    })
    const data = await res.json()
    setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Support Chat</h1>
        <p className="text-gray-500 text-sm">A safe space to talk about anything</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border shadow-sm p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-4">💬</div>
            <p>Hi! I&apos;m here to listen and support you. How are you feeling today?</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-3">
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Share how you're feeling..."
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button type="submit" disabled={loading || !input.trim()} className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 disabled:opacity-50 font-medium">
          Send
        </button>
      </form>
    </div>
  )
}
