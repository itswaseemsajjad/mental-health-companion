import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/openai'

const SYSTEM_PROMPT = `You are MindfulAI, a compassionate and empathetic mental health companion. Listen actively, validate feelings without judgment, suggest evidence-based coping strategies, and use CBT techniques to help reframe negative thoughts. Never diagnose or prescribe medication. Keep responses warm, concise, and supportive.`

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json([])
  const messages = await prisma.chatMessage.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'asc' }, take: 50 })
  return NextResponse.json(messages.map((m) => ({ role: m.role, content: m.content })))
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { message } = await req.json()
  const history = await prisma.chatMessage.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'asc' }, take: 20 })
  await prisma.chatMessage.create({ data: { userId: session.user.id, role: 'user', content: message } })
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history.map((m) => ({ role: m.role as 'user'|'assistant', content: m.content })), { role: 'user', content: message }],
    max_tokens: 500,
  })
  const reply = completion.choices[0].message.content || "I'm here for you. Can you tell me more?"
  await prisma.chatMessage.create({ data: { userId: session.user.id, role: 'assistant', content: reply } })
  return NextResponse.json({ message: reply })
}
