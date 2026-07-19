'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, Flashcard } from '@/lib/supabase'

export default function QuizPage({ params }: { params: { topic: string } }) {
  const topic = decodeURIComponent(params.topic)
  const [cards, setCards] = useState<Flashcard[]>([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('topic', topic)
      if (!error && data) {
        setCards(shuffle(data as Flashcard[]))
      }
      setLoading(false)
    }
    load()
  }, [topic])

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function mark(isCorrect: boolean) {
    if (isCorrect) setCorrect((c) => c + 1)
    else setWrong((w) => w + 1)
    if (index + 1 >= cards.length) {
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setFlipped(false)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center text-ink">
        Focusing lens…
      </main>
    )
  }

  if (cards.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-agar">No cards catalogued under "{topic}" yet.</p>
        <Link href="/" className="mt-4 inline-block text-culture underline underline-offset-4">
          ← Back to slides
        </Link>
      </main>
    )
  }

  if (done) {
    const total = correct + wrong
    const pct = Math.round((correct / total) * 100)
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-xs tracking-[0.3em] text-ink uppercase">Results</p>
        <h1 className="mt-3 font-display text-4xl text-agar">{pct}% accuracy</h1>
        <p className="mt-2 text-ink">
          {correct} correct · {wrong} missed · {total} specimens reviewed
        </p>
        <div className="mt-8 flex justify-center gap-4 text-sm">
          <button
            onClick={() => {
              setIndex(0)
              setCorrect(0)
              setWrong(0)
              setDone(false)
              setFlipped(false)
              setCards(shuffle(cards))
            }}
            className="rounded border border-culture px-4 py-2 text-culture hover:bg-culture/10"
          >
            Run again
          </button>
          <Link
            href="/"
            className="rounded border border-ink/30 px-4 py-2 text-ink hover:border-agar hover:text-agar"
          >
            Back to slides
          </Link>
        </div>
      </main>
    )
  }

  const card = cards[index]

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between text-xs text-ink">
        <Link href="/" className="hover:text-culture">
          ← slides
        </Link>
        <span>
          {topic} · ×{String(index + 1).padStart(3, '0')} / {String(cards.length).padStart(3, '0')}
        </span>
      </div>

      <div
        className={`flip-card relative h-72 cursor-pointer ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-card-inner relative h-full w-full">
          <div className="flip-card-face absolute inset-0 flex flex-col justify-between rounded border border-ink/30 bg-slidealt p-6">
            <span className="text-xs uppercase tracking-widest text-ink">Question</span>
            <p className="font-display text-xl text-agar">{card.question}</p>
            <span className="text-xs text-ink">tap to reveal</span>
          </div>
          <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col justify-between rounded border border-culture/50 bg-slidealt p-6">
            <span className="text-xs uppercase tracking-widest text-culture">Answer</span>
            <p className="font-display text-xl text-agar">{card.answer}</p>
            <span className="text-xs text-ink">tap to flip back</span>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => mark(false)}
            className="flex-1 rounded border border-stain py-3 text-stain hover:bg-stain/10"
          >
            Missed it
          </button>
          <button
            onClick={() => mark(true)}
            className="flex-1 rounded border border-culture py-3 text-culture hover:bg-culture/10"
          >
            Got it
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-ink">
        {correct} correct · {wrong} missed so far
      </p>
    </main>
  )
}
