// Detect if we're running through ngrok
const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok');

const API_URL = process.env.NODE_ENV === 'development'
    ? isNgrok 
        ? `${window.location.origin}/.netlify/functions` // Use the ngrok URL
        : 'http://localhost:8888/.netlify/functions'     // Use localhost for local development
    : 'https://pwrplaycreations.com/.netlify/functions'; // Use production URL in production

// Original code
// const API_URL = process.env.NODE_ENV === 'development'
//     ? 'http://localhost:8888/.netlify/functions'
//     : 'https://pwrplaycreations.com/.netlify/functions';

export default API_URL; 