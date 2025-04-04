import React,{ useState,useEffect } from 'react';
import { FaTimes,FaEnvelope } from 'react-icons/fa';
import API_URL from '../config/api';
import { trackEvent } from '../config/analytics';

function NotificationPopup({ onClose,onSubmit }) {
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [attempts,setAttempts] = useState(0);
  const [isSuccess,setIsSuccess] = useState(false);
  const [formSubmitted,setFormSubmitted] = useState(false);
  const MAX_ATTEMPTS = 3;

  // Basic email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Track abandoned forms
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (email && !isSuccess) {
        trackEvent('Newsletter','Popup Form Abandoned','Mailchimp Popup Form');
      }
    };

    window.addEventListener('beforeunload',handleBeforeUnload);
    return () => window.removeEventListener('beforeunload',handleBeforeUnload);
  },[email,isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limiting
    if (attempts >= MAX_ATTEMPTS) {
      setMessage("Too many attempts. Please try again later.");
      setIsSuccess(false);
      return;
    }

    // Client-side email validation
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage('');
    setAttempts(prev => prev + 1);

    try {
      // Use the same API endpoint and request format as Join.jsx
      const response = await fetch(`${API_URL}/mailchimp`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'subscribe',
          data: { email }
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Track successful newsletter signup
        trackEvent('Newsletter','Popup Signup','Mailchimp Popup Subscription');

        // Use the message from the API response
        setMessage(data.message || "You're all set! Thanks for subscribing.");
        setEmail('');
        setIsSuccess(true);
        setAttempts(0);
        setFormSubmitted(true);
        // Call onSubmit after a delay to allow the user to see the success message
        setTimeout(() => {
          onSubmit();
        },3000);
      } else {
        // Display the error message from the server
        setMessage(data.error || "Something went wrong. Please try again.");
        setIsSuccess(false);
        trackEvent('Newsletter','Popup Signup Failed',data.error || 'Unknown Error');
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
      trackEvent('Newsletter','Popup Signup Error',error.message || 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-zinc-900 border-2 border-red-600 rounded-lg shadow-lg shadow-red-500/30 max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close popup"
        >
          <FaTimes className="text-xl" />
        </button>

        {formSubmitted ? (
          // Success state with bouncing envelope
          <div className="flex flex-col items-center justify-center py-4">
            {/* Bouncing envelope animation */}
            <div className="mb-6 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-red-600"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>

            {/* Success message */}
            <p className="text-center text-xl sm:text-2xl font-body font-medium text-red-600">
              {message}
            </p>
          </div>
        ) : (
          // Normal form state
          <>
            {/* Content */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="text-red-600 text-4xl" />
              </div>
              <h2 className="text-3xl font-headers text-white mb-2">Stay Updated</h2>
              <p className="text-gray-300 mb-4">
                Be the first to know when Controlled Chaos™ launches.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-black border-2 border-gray-700 focus:border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                  required
                  disabled={loading || attempts >= MAX_ATTEMPTS}
                />
              </div>

              {message && !isSuccess && (
                <div className="mb-4 text-sm text-red-500">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || attempts >= MAX_ATTEMPTS}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 ${loading || attempts >= MAX_ATTEMPTS ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationPopup; 