interface MoodEntry {
  mood: number
  createdAt: string | Date
}

export interface MoodTrend {
  direction: 'improving' | 'declining' | 'stable'
  changePercent: number
  weeklyAverage: number
  bestDay: string
  worstDay: string
}

export function analyzeMoodTrend(entries: MoodEntry[]): MoodTrend | null {
  if (entries.length < 3) return null

  const sorted = [...entries].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  const recent = sorted.slice(-7)
  const older = sorted.slice(-14, -7)

  const recentAvg = recent.reduce((s, e) => s + e.mood, 0) / recent.length
  const olderAvg = older.length > 0 ? older.reduce((s, e) => s + e.mood, 0) / older.length : recentAvg

  const changePercent = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0

  const byDay = sorted.reduce((acc, e) => {
    const day = new Date(e.createdAt).toLocaleDateString('en', { weekday: 'long' })
    if (!acc[day]) acc[day] = []
    acc[day].push(e.mood)
    return acc
  }, {} as Record<string, number[]>)

  const dayAverages = Object.entries(byDay).map(([day, moods]) => ({
    day,
    avg: moods.reduce((s, m) => s + m, 0) / moods.length,
  }))

  const bestDay = dayAverages.sort((a, b) => b.avg - a.avg)[0]?.day || 'N/A'
  const worstDay = dayAverages.sort((a, b) => a.avg - b.avg)[0]?.day || 'N/A'

  return {
    direction: changePercent > 5 ? 'improving' : changePercent < -5 ? 'declining' : 'stable',
    changePercent: Math.round(changePercent),
    weeklyAverage: Math.round(recentAvg * 10) / 10,
    bestDay,
    worstDay,
  }
}
