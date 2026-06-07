import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) })

export async function POST(req: Request) {
  try {
    const { name, email, password } = schema.parse(await req.json())
    if (await prisma.user.findUnique({ where: { email } })) return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    const user = await prisma.user.create({ data: { name, email, password: await bcrypt.hash(password, 10) } })
    return NextResponse.json({ id: user.id })
  } catch { return NextResponse.json({ error: 'Invalid data' }, { status: 400 }) }
}
