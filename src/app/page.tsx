import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full">Your Safe Space</span>
          <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-6">Your <span className="text-teal-600">Mental Wellness</span> Companion</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Track your mood, chat with an empathetic AI, practice CBT exercises, and build healthy mental habits — all in one place.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register" className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-700 transition-colors shadow-lg">
              Start Your Journey
            </Link>
            <Link href="/auth/signin" className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50">
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🌤️', title: 'Mood Tracking', desc: 'Log daily moods with notes and visualize trends over time' },
            { icon: '💬', title: 'AI Chat Support', desc: 'Talk to an empathetic AI trained in supportive listening' },
            { icon: '🧘', title: 'CBT Exercises', desc: 'Evidence-based cognitive behavioral therapy techniques' },
            { icon: '✅', title: 'Daily Check-ins', desc: 'Structured check-ins to monitor sleep, energy, and anxiety' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p className="text-amber-800 text-sm">
            <strong>Important:</strong> This app is a wellness tool and not a substitute for professional mental health treatment.
            If you are in crisis, please contact a mental health professional or call a crisis helpline.
          </p>
        </div>
      </div>
    </div>
  )
}
