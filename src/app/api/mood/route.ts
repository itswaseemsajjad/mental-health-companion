import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const entries = await prisma.moodEntry.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' }, take: 30 })
  return NextResponse.json(entries)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { mood, note, tags } = await req.json()
  const entry = await prisma.moodEntry.create({ data: { userId: session.user.id, mood, note, tags: JSON.stringify(tags) } })
  return NextResponse.json(entry)
}
