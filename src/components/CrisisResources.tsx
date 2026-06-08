export function CrisisResources() {
  const resources = [
    { name: 'National Suicide Prevention Lifeline', number: '988', description: 'Call or text 988 (US)' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis counseling' },
    { name: 'SAMHSA Helpline', number: '1-800-662-4357', description: 'Mental health & substance use' },
    { name: 'International Association', number: 'https://www.iasp.info/resources/Crisis_Centres/', description: 'Find crisis centers worldwide' },
  ]

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
      <h3 className="text-red-800 font-semibold mb-1">🆘 Crisis Resources</h3>
      <p className="text-red-600 text-xs mb-4">If you are in immediate danger, please call emergency services (911)</p>
      <div className="space-y-3">
        {resources.map((r) => (
          <div key={r.name} className="bg-white rounded-xl p-3 border border-red-100">
            <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
            <p className="text-red-600 font-mono text-sm">{r.number}</p>
            <p className="text-gray-500 text-xs">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
