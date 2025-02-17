export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s infinite',
        'float': 'float 15s infinite',
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
        },
        float: {
          '0%, 100%': {
            transform: 'translate(0, 0)',
            opacity: 0.2
          },
          '25%': {
            transform: 'translate(10px, -30px)',
            opacity: 0.3
          },
          '50%': {
            transform: 'translate(-15px, -50px)',
            opacity: 0.2
          },
          '75%': {
            transform: 'translate(8px, -20px)',
            opacity: 0.3
          }
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      fontFamily: {
        'headers': ['Bebas Neue','sans-serif'],
        'subheaders': ['Rajdhani','sans-serif'],
        'body': ['Poppins','sans-serif'],
      },
      fontWeight: {
        'light': 300,
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    }
  },
  plugins: [],
  safelist: [
    'perspective-1000',
    'transform-style-3d',
    'backface-hidden',
    'rotate-y-180',
    'rotate-y-90'
  ]
}
