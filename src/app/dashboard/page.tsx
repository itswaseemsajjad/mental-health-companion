import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MoodChart } from '@/components/dashboard/MoodChart'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const [recentMoods, recentMessages, latestCheckIn] = await Promise.all([
    prisma.moodEntry.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 14,
    }),
    prisma.chatMessage.count({ where: { userId: session.user.id } }),
    prisma.checkIn.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const avgMood = recentMoods.length > 0 ? (recentMoods.reduce((s, m) => s + m.mood, 0) / recentMoods.length).toFixed(1) : '—'

  const chartData = [...recentMoods].reverse().map((m) => ({
    date: new Date(m.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    mood: m.mood,
  }))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {session.user.name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-500">How are you feeling today?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-teal-50 rounded-xl p-4">
          <p className="text-teal-600 text-xs font-medium uppercase">Avg Mood (14d)</p>
          <p className="text-3xl font-bold text-teal-700">{avgMood}<span className="text-lg">/10</span></p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-blue-600 text-xs font-medium uppercase">Mood Logs</p>
          <p className="text-3xl font-bold text-blue-700">{recentMoods.length}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-purple-600 text-xs font-medium uppercase">Chat Messages</p>
          <p className="text-3xl font-bold text-purple-700">{recentMessages}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-green-600 text-xs font-medium uppercase">Last Sleep</p>
          <p className="text-3xl font-bold text-green-700">{latestCheckIn ? `${latestCheckIn.sleep}h` : '—'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold text-gray-900 mb-4">Mood Trend (Last 14 Days)</h2>
          <MoodChart data={chartData} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/mood/log', label: 'Log Mood', icon: '🌤️', color: 'bg-teal-50 hover:bg-teal-100' },
              { href: '/chat', label: 'AI Chat', icon: '💬', color: 'bg-blue-50 hover:bg-blue-100' },
              { href: '/checkin', label: 'Daily Check-in', icon: '✅', color: 'bg-green-50 hover:bg-green-100' },
              { href: '/exercises', label: 'CBT Exercises', icon: '🧘', color: 'bg-purple-50 hover:bg-purple-100' },
            ].map((a) => (
              <Link key={a.href} href={a.href} className={`${a.color} rounded-xl p-4 flex flex-col items-center gap-2 transition-colors`}>
                <span className="text-2xl">{a.icon}</span>
                <span className="text-sm font-medium text-gray-700">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
