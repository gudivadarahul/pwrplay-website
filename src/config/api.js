// Detect if we're running through ngrok
const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok');

// Simplify the API URL configuration to ensure it works on production
const getApiUrl = () => {
    // For debugging - log the current hostname
    if (typeof window !== 'undefined') {
        console.log('Current hostname:',window.location.hostname);
    }

    // If we're on the server, use a default
    if (typeof window === 'undefined') {
        return 'http://localhost:8888/.netlify/functions';
    }

    // For development, use the local environment with Netlify Dev
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:8888/.netlify/functions';
    }

    // For ngrok, use the ngrok URL
    if (isNgrok) {
        return `${window.location.origin}/.netlify/functions`;
    }

    // For all other cases (including production), use the production URL
    return 'https://pwrplaycreations.com/.netlify/functions';
};

const API_URL = getApiUrl();

console.log('API URL configured as:',API_URL);

export default API_URL; 