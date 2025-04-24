// Detect if we're running through ngrok
const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok');

// Use the current window's origin by default to ensure the API calls work for all users
const API_URL = process.env.VITE_API_URL ||
    ((typeof window !== 'undefined') ?
        `${window.location.origin}/.netlify/functions` :
        'http://localhost:8888/.netlify/functions');

export default API_URL; 