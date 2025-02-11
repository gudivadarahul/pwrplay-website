export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)',opacity: '0' },
          '100%': { transform: 'translateY(0)',opacity: '1' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)' }
        }
      }
    }
  },
  plugins: []
}
