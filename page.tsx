'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [topics, setTopics] = useState<{ topic: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTopics() {
      const { data, error } = await supabase.from('flashcards').select('topic')
      if (!error && data) {
        const counts: Record<string, number> = {}
        data.forEach((row) => {
          counts[row.topic] = (counts[row.topic] || 0) + 1
        })
        setTopics(
          Object.entries(counts)
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => a.topic.localeCompare(b.topic))
        )
      }
      setLoading(false)
    }
    loadTopics()
  }, [])

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-12 border-b border-ink/30 pb-6">
        <p className="text-xs tracking-[0.3em] text-ink uppercase">Specimen Log · RYBOSM</p>
        <h1 className="mt-2 font-display text-4xl text-agar">Biology Drills</h1>
        <p className="mt-3 text-sm text-ink">
          Pick a slide below to begin testing yourself.
        </p>
      </div>

      {loading && <p className="text-ink">Loading slides…</p>}

      {!loading && topics.length === 0 && (
        <div className="rounded border border-dashed border-ink/40 p-8 text-center">
          <p className="text-agar">No specimens catalogued yet.</p>
          <Link
            href="/add"
            className="mt-4 inline-block text-culture underline underline-offset-4"
          >
            Add your first flashcard →
          </Link>
        </div>
      )}

      <ul className="space-y-3">
        {topics.map(({ topic, count }, i) => (
          <li key={topic}>
            <Link
              href={`/quiz/${encodeURIComponent(topic)}`}
              className="group flex items-center justify-between rounded border border-ink/30 bg-slidealt px-5 py-4 transition hover:border-culture"
            >
              <span className="flex items-center gap-4">
                <span className="text-xs text-ink">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-agar group-hover:text-culture">{topic}</span>
              </span>
              <span className="text-xs text-ink">{count} card{count !== 1 ? 's' : ''}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-between text-sm">
        <Link href="/add" className="text-ink hover:text-culture">
          + Add flashcards
        </Link>
      </div>
    </main>
  )
}
