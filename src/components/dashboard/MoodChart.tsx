'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props { data: { date: string; mood: number }[] }

export function MoodChart({ data }: Props) {
  if (data.length === 0) return (
    <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Log your first mood to see the chart</div>
  )
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis domain={[1, 10]} tick={{ fontSize: 10 }} />
        <Tooltip formatter={(v) => [`${v}/10`, 'Mood']} />
        <Line type="monotone" dataKey="mood" stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
