import React,{ useState,useEffect } from 'react';
import { FaTimes,FaEnvelope,FaTag } from 'react-icons/fa';
import API_URL from '../config/api';
import { trackEvent } from '../config/analytics';

function NotificationPopup({ onClose,onSubmit }) {
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [attempts,setAttempts] = useState(0);
  const [isSuccess,setIsSuccess] = useState(false);
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [showCouponCode,setShowCouponCode] = useState(false);
  const MAX_ATTEMPTS = 3;
  const DISCOUNT_CODE = "CHAOS25";

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

      // Even if the user is already subscribed, we want to show them the discount code
      if (data.success) {
        // Track successful newsletter interaction
        trackEvent('Newsletter','Popup Signup','Discount Code Popup');

        // Track discount code shown as a conversion event
        trackEvent('Conversion','Discount Code Shown','CHAOS25');

        setEmail('');
        setIsSuccess(true);
        setAttempts(0);
        setFormSubmitted(true);
        setShowCouponCode(true);

        if (data.alreadySubscribed) {
          setMessage("Welcome back! Here's your discount code:");
        } else {
          setMessage("Thanks for joining our community! Here's your discount code:");
        }
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
      <div className="bg-zinc-900 border-2 border-red-600 rounded-lg shadow-lg shadow-red-500/40 max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={formSubmitted ? onSubmit : onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close popup"
        >
          <FaTimes className="text-xl" />
        </button>

        {formSubmitted ? (
          // Success state with discount code display
          <div className="flex flex-col items-center justify-center py-4">
            {/* Discount tag icon */}
            <div className="mb-6 animate-bounce">
              <FaTag className="w-16 h-16 text-red-600" />
            </div>

            {/* Success message */}
            <p className="text-center text-xl sm:text-2xl font-headers font-bold tracking-wide text-white">
              {message}
            </p>

            {/* Discount code */}
            <div className="mt-6 bg-black p-4 rounded-lg border-2 border-red-600 w-full max-w-[250px] relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600/20 animate-pulse rounded-lg"></div>
              <div className="flex items-center justify-center relative z-10">
                <p className="text-center text-3xl font-bold tracking-wide font-headers text-white glow-text">
                  {DISCOUNT_CODE}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(DISCOUNT_CODE);

                    // Toggle between copy and check icons
                    const copyIcon = document.getElementById('copy-icon');
                    const checkIcon = document.getElementById('check-icon');

                    // Hide copy icon, show check icon
                    copyIcon.classList.add('hidden');
                    checkIcon.classList.remove('hidden');

                    // Change button color to green for success
                    const button = event.currentTarget;
                    button.classList.add('text-green-400');
                    button.classList.remove('hover:text-red-400');

                    // Revert back after 1 second
                    setTimeout(() => {
                      copyIcon.classList.remove('hidden');
                      checkIcon.classList.add('hidden');
                      button.classList.remove('text-green-400');
                      button.classList.add('hover:text-red-400');
                    },1000);
                  }}
                  className="ml-2 text-white hover:text-red-400 transition-colors duration-200"
                  title="Copy discount code"
                >
                  {/* Copy Icon */}
                  <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>

                  {/* Check Icon (hidden by default) */}
                  <svg id="check-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-base sm:text-lg font-semibold text-gray-300">
              Apply this code at checkout before finalizing your purchase.
            </p>

            {/* Added a manual close button */}
            <button
              onClick={onSubmit}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Got it!
            </button>
          </div>
        ) : (
          // Normal form state
          <>
            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-white mb-1 text-base sm:text-lg font-semibold">
                Sign up for our mailing list and receive a discount!
              </p>
              <p className="text-center text-3xl font-bold tracking-wide font-headers mb-1 relative z-10 text-white glow-text">
                25% OFF
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
                <div className="mb-4 text-center font-headers font-bold text-sm sm:text-base text-red-500">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || attempts >= MAX_ATTEMPTS}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 ${loading || attempts >= MAX_ATTEMPTS ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'GET MY DISCOUNT'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Add CSS for glowing effect */}
      <style jsx="true">{`
        .glow-text {
          text-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 
                       0 0 20px rgba(239, 68, 68, 0.5), 
                       0 0 30px rgba(239, 68, 68, 0.3);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            text-shadow: 0 0 10px rgba(239, 68, 68, 0.7),
                         0 0 20px rgba(239, 68, 68, 0.5),
                         0 0 30px rgba(239, 68, 68, 0.3);
          }
          50% {
            text-shadow: 0 0 15px rgba(239, 68, 68, 0.9),
                         0 0 25px rgba(239, 68, 68, 0.7),
                         0 0 35px rgba(239, 68, 68, 0.5);
          }
          100% {
            text-shadow: 0 0 10px rgba(239, 68, 68, 0.7),
                         0 0 20px rgba(239, 68, 68, 0.5),
                         0 0 30px rgba(239, 68, 68, 0.3);
          }
        }
      `}</style>
    </div>
  );
}

export default NotificationPopup; 