import { useState, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import API_URL from '../config/api';
import { trackEvent } from '../config/analytics';

function JoinTheChaos() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiOpacity, setConfettiOpacity] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formContainerRef = useRef(null);
    const MAX_ATTEMPTS = 3;

    // Basic email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Effect to fade out confetti naturally
    useEffect(() => {
        let fadeTimer;
        let hideTimer;
        
        if (showConfetti) {
            // Start fading out after 2.5 seconds
            fadeTimer = setTimeout(() => {
                // Gradually reduce opacity over 1.5 seconds
                const fadeInterval = setInterval(() => {
                    setConfettiOpacity(prev => {
                        const newOpacity = prev - 0.05;
                        if (newOpacity <= 0) {
                            clearInterval(fadeInterval);
                            return 0;
                        }
                        return newOpacity;
                    });
                }, 50);
            }, 2500);
            
            // Completely hide confetti after 4 seconds
            hideTimer = setTimeout(() => {
                setShowConfetti(false);
                setConfettiOpacity(1); // Reset opacity for next time
            }, 4000);
        }
        
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, [showConfetti]);

    // Add a new useEffect
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (email && !formSubmitted) {
                trackEvent('Newsletter', 'Form Abandoned', 'Mailchimp Form');
            }
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [email, formSubmitted]);

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
        setMessage("");
        setAttempts(prev => prev + 1);

        try {
            const response = await fetch(`${API_URL}/mailchimp`, {
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
                trackEvent('Newsletter', 'Signup', 'Mailchimp Subscription');
                
                // Always use the message from the API response
                setMessage(data.message);
                setEmail("");
                setIsSuccess(true);
                // Show confetti and transform the form
                setShowConfetti(true);
                setFormSubmitted(true);
                // Reset attempts on successful subscription
                setAttempts(0);
            } else {
                // Display the error message from the server
                setMessage(data.error || "Something went wrong. Please try again.");
                setIsSuccess(false);
                // Track failed signup
                trackEvent('Newsletter', 'Signup Failed', data.error || 'Unknown Error');
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-4 md:mt-24">
            <div 
                ref={formContainerRef}
                className="bg-black/50 p-4 sm:p-8 rounded-xl border-3 border-red-600 w-full mx-auto relative overflow-hidden"
            >
                {/* Confetti limited to the container but spread wider */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: confettiOpacity }}>
                        <ReactConfetti
                            width={formContainerRef.current?.offsetWidth || 500}
                            height={formContainerRef.current?.offsetHeight || 300}
                            recycle={false}
                            numberOfPieces={250}
                            gravity={0.12}
                            initialVelocityX={12} // Spread horizontally more
                            initialVelocityY={20} // Initial upward velocity
                            colors={['#ef4444', '#dc2626', '#b91c1c', '#ffffff', '#f9fafb', '#f3f4f6']} // Red and white variations
                            confettiSource={{
                                x: (formContainerRef.current?.offsetWidth || 500) / 2,
                                y: (formContainerRef.current?.offsetHeight || 300) / 2,
                                w: (formContainerRef.current?.offsetWidth || 500) * 0.7, // Wider source
                                h: 0
                            }}
                        />
                    </div>
                )}
                
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
                        <h2 className="text-3xl sm:text-5xl font-headers text-center">
                            Join the <span className="text-red-600 leading-relaxed align-baseline">pwrplay</span> community
                        </h2>
                        <p className="text-sm sm:text-lg mb-4 sm:mb-8 text-center font-body font-medium">
                            Be the first to hear about exclusive deals, expansions & new games!
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading || attempts >= MAX_ATTEMPTS}
                                className="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-black/50 text-white border-2 border-white rounded-lg 
                                focus:border-red-600 focus:outline-none transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={loading || attempts >= MAX_ATTEMPTS}
                                className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white rounded-lg text-base sm:text-lg font-bold
                                hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 
                                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "SIGNING UP..." : "SIGN UP"}
                            </button>
                        </form>

                        {message && !isSuccess && (
                            <p className="mt-3 sm:mt-4 text-center text-base sm:text-xl font-body font-medium text-yellow-500">
                                {message}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default JoinTheChaos;
