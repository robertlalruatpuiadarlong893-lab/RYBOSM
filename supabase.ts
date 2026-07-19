import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Flashcard = {
  id: string
  topic: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  created_at: string
}
