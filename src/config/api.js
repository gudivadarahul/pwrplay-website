// Detect if we're running through ngrok
const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok');

// Use the production domain for the main site, but allow for preview deployments
const getApiUrl = () => {
    // If an environment variable is set, use that first
    if (process.env.VITE_API_URL) {
        return process.env.VITE_API_URL;
    }

    // If we're on the server, use a default
    if (typeof window === 'undefined') {
        return 'http://localhost:8888/.netlify/functions';
    }

    // For production domain, hardcode the URL
    if (window.location.hostname === 'pwrplaycreations.com') {
        return 'https://pwrplaycreations.com/.netlify/functions';
    }

    // For Netlify preview deployments and other environments, use the current origin
    return `${window.location.origin}/.netlify/functions`;
};

const API_URL = getApiUrl();

export default API_URL; 