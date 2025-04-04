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
        onSubmit();
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

          {message && (
            <div className={`mb-4 text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
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
      </div>
    </div>
  );
}

export default NotificationPopup; 