import { useState } from 'react';

function Retailers() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:',formData);
        // Add your form submission logic here
    };

    const handleChange = (e) => {
        const { name,value,type,checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="pt-32 px-6 min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-headers mb-6">
                        Become A <span className="text-red-600">PWRPLAY</span> Retailer
                    </h1>
                    <p className="text-xl font-body font-medium">
                        Please complete the form below and we will get back to you soon! If you are having problems submitting your application, email us directly at{' '}
                        <a href="mailto:contact@pwrplaycreations.com" className="text-red-600 hover:text-red-500 transition-colors">
                            contact@pwrplaycreations.com
                        </a>
                    </p>
                </div>

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
                                className="w-full px-4 py-3 bg-black/50 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
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
                        className="w-full bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                        hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        SUBMIT YOUR APPLICATION
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Retailers; 