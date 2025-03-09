import { useState,useEffect } from 'react';
import { FaEnvelope,FaLocationDot,FaInstagram,FaTiktok,FaXTwitter,FaFacebook,FaLinkedin,FaSpotify,FaClock } from 'react-icons/fa6';
import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import JoinTheChaos from '../components/Join';

function Contact() {
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
        subject: '',
        message: ''
    });

    const [isSubmitted,setIsSubmitted] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending data:',formData);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/contact',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    subject: formData.subject,
                    message: formData.message
                })
            });

            const data = await response.json();
            console.log('Response:',data);

            if (data.success) {
                setIsSubmitted(true);
                setFormData({ name: '',email: '',subject: '',message: '' });
            } else {
                alert(data.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:',error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
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
                <div className="text-center mb-8 sm:mb-16 -mt-8 sm:mt-0">
                    <h1 className="text-5xl md:text-7xl font-headers mb-4 sm:mb-6">
                        Let's <span className="text-red-600">Connect</span>
                    </h1>
                </div>

                {/* Social Media Links - Mobile/Tablet */}
                <div className="lg:hidden grid grid-cols-3 gap-x-4 gap-y-6 justify-items-center mb-12 max-w-md mx-auto">
                    {socialLinks.map((social) => (
                        <a
                            key={`mobile-${social.name}`}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 group text-center"
                        >
                            <span className="transform group-hover:scale-110 transition-transform duration-300 text-red-600">
                                {React.cloneElement(social.icon, { className: "text-2xl sm:text-3xl" })}
                            </span>
                            <span className="font-body font-medium text-sm sm:text-base text-white hover:text-red-600 transition-all duration-300">
                                {social.name}
                            </span>
                        </a>
                    ))}
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

                {/* Contact Info Cards - Desktop */}
                <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16 relative">
                    <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaLocationDot className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Based In</h3>
                        <p className="font-body font-medium text-base">Toronto</p>
                        <p className="font-body font-medium text-base">Chicago</p>
                    </div>

                    <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaEnvelope className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Email Us</h3>
                        <p className="font-body font-medium text-base break-words">
                            contact@pwrplaycreations.com
                        </p>
                    </div>

                    {/* Desktop Dividers */}
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-red-600"></div>
                    <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-red-600"></div>

                    <div className="bg-black p-8 rounded-xl transition-all duration-300 text-center">
                        <FaClock className="text-red-600 text-6xl mx-auto mb-4" />
                        <h3 className="text-3xl font-subheaders mb-2">Business Hours</h3>
                        <p className="font-body font-medium text-base">Monday - Friday</p>
                        <p className="font-body font-medium text-base">9:00 AM - 5:00 PM EST</p>
                    </div>
                </div>

                {/* Contact Info Cards - Mobile */}
                <div className="md:hidden flex flex-col space-y-6 mb-12 p-4 rounded-xl border-3 border-red-600 bg-black/50">
                    {/* Location */}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <FaLocationDot className="text-red-600 text-xl mr-2" />
                            <span className="font-subheaders text-lg font-medium text-red-600">Based In</span>
                        </div>
                        <span className="font-body font-medium text-base">Toronto & Chicago</span>
                    </div>
                    
                    {/* Email */}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <FaEnvelope className="text-red-600 text-xl mr-2" />
                            <span className="font-subheaders text-lg font-medium text-red-600">Email Us</span>
                        </div>
                        <span className="font-body font-medium text-base break-words">contact@pwrplaycreations.com</span>
                    </div>
                    
                    {/* Hours */}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <FaClock className="text-red-600 text-xl mr-2" />
                            <span className="font-subheaders text-lg font-medium text-red-600">Business Hours</span>
                        </div>
                        <span className="font-body font-medium text-base">Mon-Fri, 9:00 AM - 5:00 PM EST</span>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="max-w-2xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-black/50 p-4 sm:p-8 rounded-xl border-3 border-red-600 mb-8 md:mb-16">
                        <h2 className="text-4xl sm:text-6xl font-headers mb-4 sm:mb-8 text-center">Send Us a Message</h2>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-sm sm:text-base">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium placeholder:text-sm sm:placeholder:text-base [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-sm sm:text-base">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium placeholder:text-sm sm:placeholder:text-base [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-sm sm:text-base">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium placeholder:text-sm sm:placeholder:text-base [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-1 sm:mb-2 font-body font-bold text-red-600 text-sm sm:text-base">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black text-white border-2 border-white rounded-lg focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium placeholder:text-sm sm:placeholder:text-base [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold 
                                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 
                                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8 sm:py-12">
                                <FaEnvelope className="text-red-600 text-4xl sm:text-6xl mx-auto mb-4 sm:mb-6 animate-bounce" />
                                <h3 className="text-2xl sm:text-3xl font-subheaders mb-2 sm:mb-4">Message Sent!</h3>
                                <p className="font-body font-medium text-base sm:text-xl">
                                    Thank you for reaching out. We'll get back to you as soon as possible!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Newsletter Section */}
                <JoinTheChaos />
            </div>
        </div>
    );
}

export default Contact; 