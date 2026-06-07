# Mental Health Companion

An AI-powered mental wellness app with mood tracking, empathetic AI chat, and CBT exercises.

## Features

- Daily mood logging with emoji scale and tags
- Mood trend charts (14-day history)
- Empathetic AI chat powered by GPT-4o
- Structured daily check-ins (mood, energy, anxiety, sleep)
- Wellness exercises: 4-7-8 Breathing, Grounding, Gratitude, Thought Record

## Setup

```bash
git clone https://github.com/itswaseemsajjad/mental-health-companion
cd mental-health-companion
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npx prisma db push
npm run dev
```

## Disclaimer

This app is a wellness tool, not a substitute for professional mental health treatment.
