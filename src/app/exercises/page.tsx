'use client'
import { useState } from 'react'

const exercises = [
  { id: 'breathing', title: '4-7-8 Breathing', desc: 'Calm anxiety with this relaxing breath pattern', icon: '🌬️', category: 'Relaxation' },
  { id: 'grounding', title: '5-4-3-2-1 Grounding', desc: 'Ground yourself using your five senses', icon: '🌱', category: 'Mindfulness' },
  { id: 'gratitude', title: 'Gratitude Journal', desc: 'Shift focus to positive aspects of life', icon: '🙏', category: 'Positive Psychology' },
  { id: 'thought-record', title: 'Thought Record', desc: 'Challenge negative thoughts with CBT', icon: '📋', category: 'CBT' },
]

function BreathingExercise({ onBack }: { onBack: () => void }) {
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState(0)
  const [count, setCount] = useState(4)
  const phases = [{ label: 'Inhale', dur: 4, instruction: 'Breathe in through your nose' }, { label: 'Hold', dur: 7, instruction: 'Hold your breath' }, { label: 'Exhale', dur: 8, instruction: 'Breathe out slowly' }]

  function start() {
    setRunning(true)
    setPhase(0)
    setCount(phases[0].dur)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <button onClick={onBack} className="text-teal-600 mb-6 font-medium">&#8592; Back</button>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">4-7-8 Breathing</h1>
      <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
        <div className="text-6xl font-bold text-teal-600 mb-4">{count}</div>
        <p className="text-xl font-semibold text-gray-900 mb-2">{phases[phase].label}</p>
        <p className="text-gray-500 mb-8">{phases[phase].instruction}</p>
        {!running ? (
          <button onClick={start} className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-700">Start Exercise</button>
        ) : (
          <button onClick={() => setRunning(false)} className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-300">Stop</button>
        )}
      </div>
      <div className="mt-6 bg-teal-50 rounded-xl p-4 text-sm text-teal-700">
        <strong>How it works:</strong> Inhale 4s &rarr; Hold 7s &rarr; Exhale 8s. Repeat 4 times. This activates your parasympathetic nervous system.
      </div>
    </div>
  )
}

export default function ExercisesPage() {
  const [active, setActive] = useState<string | null>(null)
  if (active === 'breathing') return <BreathingExercise onBack={() => setActive(null)} />

  if (active === 'grounding') return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => setActive(null)} className="text-teal-600 mb-6 font-medium">&#8592; Back</button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">5-4-3-2-1 Grounding</h1>
      <div className="space-y-4">
        {[{n:5,sense:'things you can SEE',emoji:'👁️'},{n:4,sense:'things you can TOUCH',emoji:'✋'},{n:3,sense:'things you can HEAR',emoji:'👂'},{n:2,sense:'things you can SMELL',emoji:'👃'},{n:1,sense:'thing you can TASTE',emoji:'👅'}].map((step) => (
          <div key={step.n} className="bg-white rounded-xl p-5 border shadow-sm">
            <div className="flex items-center gap-3 mb-3"><span className="text-2xl">{step.emoji}</span><span className="font-semibold text-gray-900">Name {step.n} {step.sense}</span></div>
            <textarea rows={2} placeholder="Write them here..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
          </div>
        ))}
      </div>
    </div>
  )

  if (active === 'gratitude') return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => setActive(null)} className="text-teal-600 mb-6 font-medium">&#8592; Back</button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gratitude Journal</h1>
      <div className="space-y-4">
        {[1,2,3].map((n) => (
          <div key={n} className="bg-white rounded-xl p-5 border shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">🙏 Gratitude #{n}</label>
            <textarea rows={2} placeholder="I'm grateful for..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
          </div>
        ))}
      </div>
    </div>
  )

  if (active === 'thought-record') {
    const steps = [
      { key: 'situation', label: 'Situation', question: 'What happened? Describe objectively.', placeholder: 'When, where, who...' },
      { key: 'emotion', label: 'Emotion', question: 'What emotion did you feel?', placeholder: 'Anxious 80%, Sad 60%...' },
      { key: 'thought', label: 'Automatic Thought', question: 'What thoughts went through your mind?', placeholder: 'What were you telling yourself...' },
      { key: 'balanced', label: 'Balanced Thought', question: 'What is a more balanced perspective?', placeholder: 'A realistic, compassionate view...' },
    ]
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <button onClick={() => setActive(null)} className="text-teal-600 mb-6 font-medium">&#8592; Back</button>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Thought Record (CBT)</h1>
        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.key} className="bg-white rounded-xl p-5 border shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{s.label}</label>
              <p className="text-xs text-gray-500 mb-2">{s.question}</p>
              <textarea rows={2} placeholder={s.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Wellness Exercises</h1>
      <p className="text-gray-500 mb-8">Evidence-based techniques for mental wellness</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((ex) => (
          <button key={ex.id} onClick={() => setActive(ex.id)} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all text-left hover:-translate-y-1 group">
            <div className="text-4xl mb-4">{ex.icon}</div>
            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{ex.category}</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-teal-600">{ex.title}</h3>
            <p className="text-gray-500 text-sm">{ex.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
