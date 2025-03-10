import ReactGA from 'react-ga4';

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

// Set user property
export const setUserProperty = (name, value) => {
  ReactGA.set({ [name]: value });
};

// Track exception
export const trackException = (description, fatal = false) => {
  ReactGA.exception({
    description,
    fatal
  });
};

// Initialize scroll tracking
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