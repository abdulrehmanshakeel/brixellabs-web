/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030c14",
        surface: "#061523",
        "surface-card": "#091e30",
        "surface-card-hover": "#0e2c45",
        "surface-dark": "#02070c",
        cyan: {
          DEFAULT: "#00f0ff",
          glow: "#00f0ff",
          teal: "#00e5d0",
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        slate: {
          muted: "#8ca7be",
          dim: "#5a738a",
          dark: "#1c2d3d",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 240, 255, 0.45)',
        'neon-lg': '0 0 35px rgba(0, 240, 255, 0.6)',
        'neon-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'neon-teal': '0 0 25px rgba(0, 229, 208, 0.5)',
        'card-glow': '0 8px 32px 0 rgba(0, 240, 255, 0.08)',
        'card-glow-hover': '0 12px 40px 0 rgba(0, 240, 255, 0.22)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan': 'scanLine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 28px rgba(0, 240, 255, 0.8))' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
