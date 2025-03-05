import { useState,useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';

function Retailers() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    const [formData,setFormData] = useState({
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

    const [loading,setLoading] = useState(false);
    const [isSubmitted,setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:',formData);

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/retailer',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    storeName: formData.storeName,
                    website: formData.website,
                    locationCount: formData.locationCount,
                    primaryLocation: formData.primaryLocation,
                    hearAboutUs: formData.hearAboutUs
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
                    storeName: '',
                    website: '',
                    locationCount: '',
                    primaryLocation: '',
                    hearAboutUs: '',
                    agreeToTerms: false
                });
            } else {
                alert(data.error || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:',error);
            alert('Failed to submit application. Please try again.');
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
    };

    return (
        <div className="pt-80 px-6 min-h-screen bg-black text-white">
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
                <div className="bg-black/50 p-8 rounded-xl border-3 border-red-600 mb-16">
                    <h2 className="text-6xl font-headers mb-8 text-center">Apply Now</h2>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-body font-bold text-xl">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="First name Last name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 font-body font-bold text-xl">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2 font-body font-bold text-xl">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="xxx-xxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="storeName" className="block mb-2 font-body font-bold text-xl">Store Name</label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        name="storeName"
                                        placeholder="The name of your store"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="website" className="block mb-2 font-body font-bold text-xl">Store Website</label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        placeholder="http://"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="locationCount" className="block mb-2 font-body font-bold text-xl">Location Count</label>
                                    <input
                                        type="number"
                                        id="locationCount"
                                        name="locationCount"
                                        placeholder="#"
                                        value={formData.locationCount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="primaryLocation" className="block mb-2 font-body font-bold text-xl">Primary Location</label>
                                    <input
                                        type="text"
                                        id="primaryLocation"
                                        name="primaryLocation"
                                        placeholder="Street, City, State, Zip"
                                        value={formData.primaryLocation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="hearAboutUs" className="block mb-2 font-body font-bold text-xl">How did you hear about us?</label>
                                    <textarea
                                        id="hearAboutUs"
                                        name="hearAboutUs"
                                        placeholder="(Optional)"
                                        value={formData.hearAboutUs}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="mt-1.5"
                                        required
                                    />
                                    <label htmlFor="agreeToTerms" className="font-body font-light">
                                        Product ordered will be sold exclusively at retailer's store(s) and/or retailer's website. No sales to third party sellers are permitted
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                                hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'SUBMITTING...' : 'SUBMIT YOUR APPLICATION'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="w-24 h-24 text-red-600 mx-auto mb-6 animate-bounce"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <h3 className="text-3xl font-subheaders mb-4">Application Submitted!</h3>
                            <p className="font-body font-medium text-xl">
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