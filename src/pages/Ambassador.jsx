import { useState,useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import API_URL from '../config/api';

function Ambassador() {
    const location = useLocation();
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        instagram: '',
        tiktok: '',
        followers: '',
        role: '',
        amazon: '',
        payment: '',
        agreeToTerms: false
    });

    const [loading,setLoading] = useState(false);
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:',formData);

        // Clear any previous error messages
        setErrorMessage('');

        // Client-side validation
        if (!isValidEmail(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/mailchimp`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'ambassador',
                    data: formData
                })
            });

            console.log('Server response status:',response.status);
            const data = await response.json();
            console.log('Server response data:',data);

            if (data.success) {
                setIsSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    instagram: '',
                    tiktok: '',
                    followers: '',
                    role: '',
                    amazon: '',
                    payment: '',
                    agreeToTerms: false
                });
            } else {
                // Display the error message from the server
                setErrorMessage(data.error || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:',error);
            setErrorMessage('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });

        // Clear error message when user starts typing
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    useEffect(() => {
        // Function to fix autofill styling
        const fixAutofillStyling = () => {
            const inputs = document.querySelectorAll('input, select');

            inputs.forEach(input => {
                // Apply direct style overrides
                input.setAttribute('style','background-color: transparent !important; color: white !important;');

                // Add event listener to catch the moment Chrome applies autofill
                input.addEventListener('animationstart',(e) => {
                    if (e.animationName === 'autofill') {
                        e.target.setAttribute('style','background-color: transparent !important; color: white !important;');
                    }
                });
            });
        };

        // Run immediately and after a short delay to catch Chrome's autofill
        fixAutofillStyling();
        setTimeout(fixAutofillStyling,100);

        // Also add a style element to detect autofill
        const styleElem = document.createElement('style');
        styleElem.innerHTML = `
            @keyframes autofill {
                from {/**/}
                to {/**/}
            }
            
            input:-webkit-autofill {
                animation-name: autofill;
                animation-fill-mode: both;
            }
        `;
        document.head.appendChild(styleElem);

        return () => {
            document.head.removeChild(styleElem);
        };
    },[]);

    return (
        <div className="pt-24 sm:pt-32 px-6 min-h-screen bg-black text-white">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-16">
                    <h1 className="text-5xl md:text-7xl font-headers mb-4 sm:mb-6">
                        Become an <span className="text-red-600">Ambassador</span>
                    </h1>
                </div>

                {/* Application Form */}
                <div className="bg-black/50 p-4 sm:p-8 rounded-xl border-3 border-red-600 mb-8 sm:mb-16">
                    <h2 className="text-4xl sm:text-6xl font-headers mb-4 sm:mb-8 text-center">Apply Now</h2>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                            <div className="space-y-3 sm:space-y-4">
                                {/* Name field */}
                                <div>
                                    <label htmlFor="name" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="First Name, Last Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                {/* Email field */}
                                <div>
                                    <label htmlFor="email" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="email"
                                    />
                                </div>

                                {/* Phone field */}
                                <div>
                                    <label htmlFor="phone" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="tel"
                                    />
                                </div>

                                {/* Social Media Fields */}
                                <div>
                                    <label htmlFor="tiktok" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">TikTok</label>
                                    <input
                                        type="text"
                                        id="tiktok"
                                        name="tiktok"
                                        placeholder="@username"
                                        value={formData.tiktok}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="text"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="instagram" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Instagram</label>
                                    <input
                                        type="text"
                                        id="instagram"
                                        name="instagram"
                                        placeholder="@username"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="text"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="followers" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Total Followers</label>
                                    <input
                                        type="number"
                                        id="followers"
                                        name="followers"
                                        placeholder="Combined followers across platforms"
                                        value={formData.followers}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        required
                                        autocomplete="off"
                                        data-form-type="number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base text-gray-400"
                                        required
                                        autocomplete="off"
                                        data-form-type="select"
                                    >
                                        <option value="" className="text-gray-400">I want to be a</option>
                                        <option value="Content Creator" className="text-white">Content Creator</option>
                                        <option value="Influencer" className="text-white">Game Tester</option>
                                        <option value="Streamer" className="text-white">Both</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="amazon" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Do you have an Amazon account?</label>
                                    <select
                                        id="amazon"
                                        name="amazon"
                                        value={formData.amazon}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base text-gray-400"
                                        required
                                        autocomplete="off"
                                        data-form-type="select"
                                    >
                                        <option value="" className="text-gray-400">Select an option</option>
                                        <option value="Yes" className="text-white">Yes</option>
                                        <option value="No" className="text-white">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="payment" className="block mb-1 sm:mb-2 font-body font-bold text-base sm:text-xl text-red-600">Preferred Payment Method</label>
                                    <select
                                        id="payment"
                                        name="payment"
                                        value={formData.payment}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-sm sm:text-base text-gray-400"
                                        required
                                        autocomplete="off"
                                        data-form-type="select"
                                    >
                                        <option value="" className="text-gray-400">Select payment method</option>
                                        <option value="PayPal" className="text-white">PayPal</option>
                                        <option value="Venmo" className="text-white">Venmo</option>
                                        <option value="Direct Deposit" className="text-white">Zelle</option>
                                        <option value="Other" className="text-white">e-Transfer</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold 
                                hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'SUBMITTING...' : 'SUBMIT YOUR APPLICATION'}
                            </button>

                            {/* Error message display */}
                            {errorMessage && (
                                <div className="mt-4 p-4 bg-red-600/20 border-2 border-red-600 rounded-lg animate-pulse">
                                    <p className="text-center text-white font-medium">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="text-center py-8 sm:py-12">
                            <svg
                                className="w-16 h-16 sm:w-24 sm:h-24 text-red-600 mx-auto mb-4 sm:mb-6 animate-bounce"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <h3 className="text-2xl sm:text-3xl font-subheaders mb-2 sm:mb-4">Application Submitted!</h3>
                            <p className="font-body font-medium text-base sm:text-xl">
                                Thank you for your interest in becoming a PWRPLAY ambassador. We'll review your application and get back to you soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Ambassador; 