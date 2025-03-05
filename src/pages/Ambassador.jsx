import { useState,useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';

function Ambassador() {
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
        phone: '',
        email: '',
        tiktok: '',
        instagram: '',
        followers: '',
        role: '',
        prime: '',
        gameNight: '',
        payment: ''
    });

    const [isSubmitted,setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:',formData);
        setIsSubmitted(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="pt-32 px-6 min-h-screen bg-black text-white">
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

            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-headers mb-6">
                        Join Our <span className="text-red-600">Ambassador</span> Program
                    </h1>
                    <p className="text-2xl max-w-3xl mx-auto font-body font-medium">
                        Be part of something special!
                        <br />
                        Join our community of creators and game enthusiasts.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                        <h3 className="text-3xl font-subheaders mb-4">Test Games First</h3>
                        <p className="font-body font-medium">Be among the first to play and test our new games before they launch!</p>
                    </div>

                    <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                        <h3 className="text-3xl font-subheaders mb-4">Create Content</h3>
                        <p className="font-body font-medium">Share your experience through TikToks and Instagram reels!</p>
                    </div>

                    <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                        <h3 className="text-3xl font-subheaders mb-4">Join Our Community</h3>
                        <p className="font-body font-medium">Connect with like-minded creators and game enthusiasts!</p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-black/50 p-8 rounded-xl border-3 border-red-600 mb-16">
                        <h2 className="text-6xl font-headers mb-8 text-center">Apply Now</h2>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-body font-bold text-red-600 text-xl">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 font-body font-bold text-red-600 text-xl">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 font-body font-bold text-red-600 text-xl">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="tiktok" className="block mb-2 font-body font-bold text-red-600 text-xl">@TikTok</label>
                                        <input
                                            type="text"
                                            id="tiktok"
                                            name="tiktok"
                                            value={formData.tiktok}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="instagram" className="block mb-2 font-body font-bold text-red-600 text-xl">@Instagram</label>
                                        <input
                                            type="text"
                                            id="instagram"
                                            name="instagram"
                                            value={formData.instagram}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="followers" className="block mb-2 font-body font-bold text-red-600 text-xl">Total Followers</label>
                                    <input
                                        type="number"
                                        id="followers"
                                        name="followers"
                                        value={formData.followers}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-body font-bold text-red-600 text-xl">I want to be a</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['Content Creator','Game Tester','Both'].map((option) => (
                                            <div key={option} className="relative">
                                                <input
                                                    type="radio"
                                                    id={option.toLowerCase().replace(' ','-')}
                                                    name="role"
                                                    value={option}
                                                    onChange={handleChange}
                                                    className="peer absolute opacity-0 [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                                    required
                                                />
                                                <label
                                                    htmlFor={option.toLowerCase().replace(' ','-')}
                                                    className="block w-full p-4 text-center border-2 border-white rounded-lg cursor-pointer
                                                    transition-all duration-300 font-body
                                                    peer-checked:border-red-600 peer-checked:text-red-600
                                                    hover:border-red-600 hover:text-red-600"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-body font-bold text-red-600 text-xl">Do you have an Amazon account?</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Yes','No'].map((option) => (
                                            <div key={option} className="relative">
                                                <input
                                                    type="radio"
                                                    id={`prime-${option.toLowerCase()}`}
                                                    name="prime"
                                                    value={option}
                                                    onChange={handleChange}
                                                    className="peer absolute opacity-0 [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                                    required
                                                />
                                                <label
                                                    htmlFor={`prime-${option.toLowerCase()}`}
                                                    className="block w-full p-4 text-center border-2 border-white rounded-lg cursor-pointer
                                                    transition-all duration-300 font-body
                                                    peer-checked:border-red-600 peer-checked:text-red-600
                                                    hover:border-red-600 hover:text-red-600"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="gameNight" className="block mb-2 font-body font-bold text-red-600 text-xl">When can you schedule your next game night?</label>
                                    <input
                                        type="date"
                                        id="gameNight"
                                        name="gameNight"
                                        value={formData.gameNight}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-body font-bold text-red-600 text-xl">Perferred Payment Method</label>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {['Zelle','Paypal','Venmo','e-Transfer'].map((option) => (
                                            <div key={option} className="relative">
                                                <input
                                                    type="radio"
                                                    id={option.toLowerCase()}
                                                    name="payment"
                                                    value={option}
                                                    onChange={handleChange}
                                                    className="peer absolute opacity-0 [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                                    required
                                                />
                                                <label
                                                    htmlFor={option.toLowerCase()}
                                                    className="block w-full p-4 text-center border-2 border-white rounded-lg cursor-pointer
                                                    transition-all duration-300 font-body
                                                    peer-checked:border-red-600 peer-checked:text-red-600
                                                    hover:border-red-600 hover:text-red-600"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Submit Application
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-3xl font-subheaders mb-4">Application Submitted!</h3>
                                <p className="font-body font-medium text-xl">
                                    Thank you for applying to our Ambassador Program. We'll review your application and get back to you soon!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ambassador; 