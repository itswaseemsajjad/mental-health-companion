export const affirmations = [
  'I am worthy of love and belonging.',
  'I am stronger than I think.',
  'This feeling is temporary. I will get through this.',
  'I am doing my best, and that is enough.',
  'I choose to focus on what I can control.',
  'I am growing and learning every day.',
  'My feelings are valid and important.',
  'I deserve peace and happiness.',
  'I have overcome challenges before and I can do it again.',
  'I am not alone in this journey.',
  'Small steps forward are still progress.',
  'I am allowed to rest and recharge.',
]

export function getDailyAffirmation(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return affirmations[dayOfYear % affirmations.length]
}

export function getRandomAffirmation(): string {
  return affirmations[Math.floor(Math.random() * affirmations.length)]
}
