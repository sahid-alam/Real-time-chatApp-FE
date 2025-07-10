/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: [
          "'IBM Plex Mono'",
          "'JetBrains Mono'",
          "'Source Code Pro'",
          'Courier New',
          'monospace'
        ],
      },
      colors: {
        'retro-bg': '#111',
        'retro-green': '#39FF14',
        'retro-amber': '#FFBF00',
        'retro-border': '#39FF14',
        'dark-bg': '#0f0f0f',
        'dark-surface': '#1a1a1a',
        'dark-card': '#2a2a2a',
        'dark-border': '#404040',
        'accent': '#3b82f6',
        'accent-hover': '#2563eb',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
} 