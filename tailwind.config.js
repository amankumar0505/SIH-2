/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maitri: {
          bg: "#F0F4F9",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#DDE3EA",
          "border-light": "#EDF2F7",
          primary: "#1A65E5",
          "primary-hover": "#1451B8",
          "primary-light": "#EBF2FF",
          navy: "#13294B",
          gold: "#D97706",
          orange: "#EA580C",
          green: "#0D9488",
          purple: "#5B5CE6",
          text: "#1E293B",
          secondary: "#64748B",
          muted: "#94A3B8"
        },
        apple: {
          bg: "#F0F4F9",
          subtle: "#F8FAFC",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#DDE3EA",
          "border-light": "#EDF2F7",
          text: "#1E293B",
          secondary: "#64748B",
          tertiary: "#94A3B8",
          accent: "#1A65E5",
          "accent-hover": "#1451B8",
          "accent-light": "#EBF2FF",
        },
        gov: {
          bg: "#F0F4F9",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#DDE3EA",
          "border-dark": "#94A3B8",
          navy: {
            DEFAULT: "#1A65E5",
            hover: "#1451B8",
            dark: "#13294B",
            light: "#EBF2FF",
            muted: "#3B82F6"
          },
          slate: {
            DEFAULT: "#64748B",
            light: "#94A3B8",
            lighter: "#CBD5E1",
            dark: "#1E293B"
          },
          green: {
            DEFAULT: "#0D9488",
            bg: "#F0FDF4",
            border: "#A7F3D0",
            text: "#0F766E"
          },
          amber: {
            DEFAULT: "#D97706",
            bg: "#FFFBEB",
            border: "#FDE68A",
            text: "#B45309"
          },
          red: {
            DEFAULT: "#E11D48",
            bg: "#FEF2F2",
            border: "#FECACA",
            text: "#BE123C"
          },
          blue: {
            DEFAULT: "#1A65E5",
            bg: "#EBF2FF",
            border: "#BFDBFE",
            text: "#1D4ED8"
          }
        }
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        display: [
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      borderRadius: {
        DEFAULT: '8px',
        'xs': '3px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
