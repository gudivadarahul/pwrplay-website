import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import API_URL from '../config/api';

function Retailers() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        storeName: '',
        website: '',
        locationCount: '',
        primaryLocation: '',
        hearAboutUs: '',
        agreeToTerms: false
    });

    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Format website URL if needed
    const formatWebsite = (url) => {
        if (!url) return '';
        
        // If URL doesn't start with http:// or https://, add http://
        if (!url.match(/^https?:\/\//i)) {
            return `http://${url}`;
        }
        return url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        
        // Clear any previous error messages
        setErrorMessage('');
        
        // Client-side validation
        if (!isValidEmail(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        
        setLoading(true);
        try {
            // Format the website URL before sending
            const formattedData = {
                ...formData,
                website: formatWebsite(formData.website)
            };
            
            const response = await fetch(`${API_URL}/mailchimp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'retailer',
                    data: formattedData
                })
            });
            
            console.log('Server response status:', response.status);
            const data = await response.json();
            console.log('Server response data:', data);
            
            if (data.success) {
                setIsSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    storeName: '',
                    website: '',
                    locationCount: '',
                    primaryLocation: '',
                    hearAboutUs: '',
                    agreeToTerms: false
                });
            } else {
                // Display the error message from the server
                setErrorMessage(data.error || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
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

    // Add the useEffect hook for fixing autofill styling
    useEffect(() => {
        // Function to fix autofill styling
        const fixAutofillStyling = () => {
            const inputs = document.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                // Apply direct style overrides
                input.setAttribute('style', 'background-color: transparent !important; color: white !important;');
                
                // Add event listener to catch the moment Chrome applies autofill
                input.addEventListener('animationstart', (e) => {
                    if (e.animationName === 'autofill') {
                        e.target.setAttribute('style', 'background-color: transparent !important; color: white !important;');
                    }
                });
            });
        };
        
        // Run immediately and after a short delay to catch Chrome's autofill
        fixAutofillStyling();
        setTimeout(fixAutofillStyling, 100);
        
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
    }, []);

    return (
        <div className="pt-24 sm:pt-32 px-6 min-h-screen bg-black text-white">
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
                <div className="text-center mb-8 sm:mb-16">
                    <h1 className="text-5xl md:text-7xl font-headers mb-4 sm:mb-6">
                        Become a <span className="text-red-600">Retailer</span>
                    </h1>
                </div>

                <div className="bg-black/50 p-4 sm:p-8 rounded-xl border-3 border-red-600 mb-8 sm:mb-16">
                    <h2 className="text-4xl sm:text-6xl font-headers mb-4 sm:mb-8 text-center">Apply Now</h2>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label htmlFor="name" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Store Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your store name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="storeName" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Store Name</label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        name="storeName"
                                        placeholder="The name of your store"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="website" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Website (optional)</label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        placeholder="https://www.example.com"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="locationCount" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Location Count</label>
                                    <input
                                        type="number"
                                        id="locationCount"
                                        name="locationCount"
                                        placeholder="#"
                                        value={formData.locationCount}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="primaryLocation" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">Primary Location</label>
                                    <input
                                        type="text"
                                        id="primaryLocation"
                                        name="primaryLocation"
                                        placeholder="Street, City, State, Zip"
                                        value={formData.primaryLocation}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        required
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="hearAboutUs" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-base sm:text-xl">How did you hear about us?</label>
                                    <textarea
                                        id="hearAboutUs"
                                        name="hearAboutUs"
                                        placeholder="(Optional)"
                                        value={formData.hearAboutUs}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors text-white text-sm sm:text-base"
                                        autocomplete="off"
                                        data-form-type="other"
                                    />
                                </div>

                                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                                    <div className="relative flex items-center flex-shrink-0 mt-1 sm:mt-0">
                                        <input
                                            type="checkbox"
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            className="peer appearance-none h-4 w-4 sm:h-5 sm:w-5 border-2 border-red-600 rounded bg-black/50 checked:bg-red-600 
                                            hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-200"
                                            required
                                            autocomplete="off"
                                            data-form-type="other"
                                        />
                                        <svg
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 sm:w-3 h-2 sm:h-3 pointer-events-none 
                                            text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                            viewBox="0 0 17 12"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        >
                                            <path d="M1 5.5L6 10.5L15.5 1" />
                                        </svg>
                                    </div>
                                    <label htmlFor="agreeToTerms" className="font-body font-light text-xs sm:text-base">
                                    The product ordered will be sold exclusively at the retailer's store(s) and/or on the retailer's website. Sales to third-party sellers are not permitted.
                                    </label>
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
                                Thank you for your interest in becoming a PWRPLAY retailer. We'll review your application and get back to you soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Retailers; 