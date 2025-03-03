import { useState } from 'react';
import { FaEnvelope,FaLocationDot,FaInstagram,FaTiktok,FaXTwitter,FaFacebook,FaLinkedin,FaSpotify,FaClock } from 'react-icons/fa6';
import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [newsletter,setNewsletter] = useState({
        email: '',
        submitted: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:',formData);
        setIsSubmitted(true);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setNewsletter(prev => ({ ...prev,submitted: true }));
        setTimeout(() => {
            setNewsletter({ email: '',submitted: false });
        },3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const socialLinks = [
        {
            name: 'Instagram',
            icon: <FaInstagram className="text-2xl" />,
            url: 'https://www.instagram.com/pwrplayofficial/',
        },
        {
            name: 'TikTok',
            icon: <FaTiktok className="text-2xl" />,
            url: 'https://www.tiktok.com/@pwrplayofficial',
        },
        {
            name: 'Twitter',
            icon: <FaXTwitter className="text-2xl" />,
            url: 'https://x.com/pwrplayofficial',
        },
        {
            name: 'Facebook',
            icon: <FaFacebook className="text-2xl" />,
            url: 'https://www.facebook.com/profile.php?id=61573023322110',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="text-2xl" />,
            url: 'https://www.linkedin.com/company/pwrplaycreations/',
        },
        {
            name: 'Spotify',
            icon: <FaSpotify className="text-2xl" />,
            url: 'https://open.spotify.com/user/31jzakcd3goacdn6unwpyceoseai',
        }
    ];

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
                        Let's <span className="text-red-600">Connect</span>
                    </h1>
                    <p className="text-2xl max-w-3xl mx-auto font-body font-medium">
                        Have questions about our games?
                        We'd love to hear from you!
                    </p>
                </div>

                {/* Social Media Links - Desktop */}
                <div className="hidden lg:flex flex-wrap justify-center gap-8 mb-16">
                    {socialLinks.map((social) => (
                        <a
                            key={`desktop-${social.name}`}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 group whitespace-nowrap"
                        >
                            <span className="transform group-hover:scale-110 transition-transform duration-300 text-red-600">
                                {React.cloneElement(social.icon,{ className: "text-3xl" })}
                            </span>
                            <span className="font-body font-medium text-xl text-white hover:text-red-600 transition-all duration-300">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
                <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaLocationDot className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Based In</h3>
                        <p className="font-body font-medium text-base">Toronto, Ontario</p>
                        <p className="font-body font-medium text-base">Chicago, Illinois</p>
                    </div>

                    <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaEnvelope className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Email Us</h3>
                        <p className="font-body font-medium text-base break-words">
                            contact@pwrplaycreations.com
                        </p>
                    </div>

                    {/* First Divider */}
                    <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-red-600"></div>

                    {/* Second Divider */}
                    <div className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-red-600"></div>

                    <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaClock className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Business Hours</h3>
                        <p className="font-body font-medium text-base">Monday - Friday</p>
                        <p className="font-body font-medium text-base">9:00 AM - 5:00 PM EST</p>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="max-w-2xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-black/50 p-8 rounded-xl border-3 border-red-600 mb-16">
                        <h2 className="text-6xl font-headers mb-8 text-center">Send Us a Message</h2>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 font-body font-bold text-red-600">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 font-body font-bold text-red-600">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block mb-2 font-body font-bold text-red-600">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-2 font-body font-bold text-red-600">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <FaEnvelope className="text-red-600 text-6xl mx-auto mb-6 animate-bounce" />
                                <h3 className="text-3xl font-subheaders mb-4">Message Sent!</h3>
                                <p className="font-body font-medium text-xl">
                                    Thank you for reaching out. We'll get back to you as soon as possible!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Newsletter Section */}
                    <div className="bg-black/50 p-8 rounded-xl border-3 border-red-600 mb-16">
                        <h2 className="text-6xl font-headers mb-4 text-center">Join the <span className="text-red-600">pwrplay</span> community</h2>
                        <p className="text-center mb-6 font-body font-semibold">
                            Stay updated with our latest games, events, and exclusive offers!
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={newsletter.email}
                                onChange={(e) => setNewsletter(prev => ({ ...prev,email: e.target.value }))}
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold 
                                hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                        {newsletter.submitted && (
                            <p className="text-red-600 text-center text-xl mt-4 font-body font-medium">
                                Thanks for joining our community!
                            </p>
                        )}
                    </div>
                </div>

                {/* Social Media Links - Mobile/Tablet */}
                <div className="lg:hidden flex flex-wrap justify-center gap-4 mt-8 mb-16">
                    {socialLinks.map((social) => (
                        <a
                            key={`mobile-${social.name}`}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group"
                        >
                            <span className="transform group-hover:scale-110 transition-transform duration-300 text-red-600">
                                {React.cloneElement(social.icon,{ className: "text-2xl sm:text-3xl" })}
                            </span>
                            <span className="font-body font-medium text-base sm:text-lg md:text-xl text-white hover:text-red-600 transition-all duration-300">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contact; 