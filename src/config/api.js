const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/.netlify/functions'
    : 'https://pwrplaycreations.com/.netlify/functions';

export default API_URL; 