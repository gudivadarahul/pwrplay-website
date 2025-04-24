// Detect if we're running through ngrok
const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok');

// Use environment variable if available, otherwise determine based on environment
const API_URL = process.env.VITE_API_URL || (
    process.env.NODE_ENV === 'development'
        ? isNgrok
            ? `${window.location.origin}/.netlify/functions` // Use the ngrok URL
            : 'http://localhost:8888/.netlify/functions'     // Use Netlify Dev port for local development
        : `${window.location.origin}/.netlify/functions`     // Use the actual host in production
);

export default API_URL; 