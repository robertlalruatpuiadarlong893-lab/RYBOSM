# RYBOSM — Biology Flashcard Drills

A simple flashcard/quiz app for drilling yourself on biology topics.
Built with Next.js, styled with Tailwind, backed by Supabase.

## 1. Create the Supabase table

In your Supabase project, open the SQL editor and run:

```sql
create table flashcards (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  question text not null,
  answer text not null,
  difficulty text default 'medium',
  created_at timestamp default now()
);

alter table flashcards enable row level security;

create policy "public read" on flashcards
  for select using (true);

create policy "public insert" on flashcards
  for insert with check (true);
```

## 2. Local setup

```bash
npm install
cp .env.local.example .env.local
# fill in your Supabase URL + anon key in .env.local
npm run dev
```

Visit `http://localhost:3000`.

## 3. Deploy

- Push this repo to GitHub.
- Import it in Vercel (New Project → your GitHub repo).
- Add the two environment variables (`NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) under Vercel → Settings → Environment Variables.
- Every push to `main` auto-deploys.

## How it works

- `/` — lists topics found in your `flashcards` table
- `/quiz/[topic]` — flips through flashcards for that topic, tracks score
- `/add` — form to add new flashcards straight into Supabase
