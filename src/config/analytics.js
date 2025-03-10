import ReactGA from 'react-ga4';
import { useEffect } from 'react';

// Initialize Google Analytics
export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track events
export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track timing
export const trackTiming = (category, variable, value, label) => {
  ReactGA.timing({
    category,
    variable,
    value,
    label
  });
};

// Measure how long content takes to load
const startTime = performance.now();
// ... load content
const endTime = performance.now();
trackTiming('Content', 'Load Time', endTime - startTime, 'Home Page Hero');

// Add to your analytics.js
export const setUserProperty = (name, value) => {
  ReactGA.set({ [name]: value });
};

// After user logs in or sets preferences
setUserProperty('userType', 'premium');
setUserProperty('theme', 'dark');

// Add to your analytics.js
export const trackException = (description, fatal = false) => {
  ReactGA.exception({
    description,
    fatal
  });
};

// Add to your analytics.js
export const initScrollTracking = () => {
  let scrollDepths = [25, 50, 75, 90];
  let scrollDepthTriggered = {};
  
  window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    
    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !scrollDepthTriggered[depth]) {
        trackEvent('Scroll', 'Depth', `Scrolled ${depth}%`);
        scrollDepthTriggered[depth] = true;
      }
    });
  });
};

// Then call this in your App.jsx after initializing GA
useEffect(() => {
  initGA('G-GED2BCB4MJ');
  initScrollTracking();
}, []); 