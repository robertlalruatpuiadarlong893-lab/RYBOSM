import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slide: '#0F1B17',      // background — dark specimen-slide green-black
        slidealt: '#16241E',   // panel background
        agar: '#E8E2CE',       // pale agar/paper text
        culture: '#5EEAD4',    // bioluminescent teal accent
        stain: '#FB7185',      // eosin-pink accent (wrong/alert)
        ink: '#7C8B85',        // muted label text
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
