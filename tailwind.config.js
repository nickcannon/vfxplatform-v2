/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './*.html',
    './FAQ/**/*.html',
    './about/**/*.html',
    './contact/**/*.html',
    './linux/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vfx-dark': '#1a1a2e',
        'vfx-primary': '#16213e',
        'vfx-accent': '#0f3460',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
