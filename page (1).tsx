'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AddPage() {
  const [topic, setTopic] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    const { error } = await supabase
      .from('flashcards')
      .insert([{ topic, question, answer, difficulty }])

    if (error) {
      setStatus('error')
      return
    }
    setStatus('saved')
    setQuestion('')
    setAnswer('')
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between text-xs text-ink">
        <Link href="/" className="hover:text-culture">
          ← slides
        </Link>
        <span>New specimen</span>
      </div>

      <h1 className="mb-6 font-display text-2xl text-agar">Catalogue a flashcard</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink">
            Topic
          </label>
          <input
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Cell Biology"
            className="w-full rounded border border-ink/30 bg-slidealt px-3 py-2 text-agar placeholder:text-ink/50 focus:border-culture focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink">
            Question
          </label>
          <textarea
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full rounded border border-ink/30 bg-slidealt px-3 py-2 text-agar focus:border-culture focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink">
            Answer
          </label>
          <textarea
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            className="w-full rounded border border-ink/30 bg-slidealt px-3 py-2 text-agar focus:border-culture focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="w-full rounded border border-ink/30 bg-slidealt px-3 py-2 text-agar focus:border-culture focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'saving'}
          className="w-full rounded border border-culture py-3 text-culture hover:bg-culture/10 disabled:opacity-50"
        >
          {status === 'saving' ? 'Saving…' : 'Add to catalogue'}
        </button>

        {status === 'saved' && (
          <p className="text-center text-sm text-culture">Saved. Add another, or go quiz yourself.</p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm text-stain">
            Something went wrong — check your Supabase connection.
          </p>
        )}
      </form>
    </main>
  )
}
