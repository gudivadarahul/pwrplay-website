import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaXmark,FaChevronDown,FaInstagram,FaTiktok,FaLinkedin,FaTwitter,FaFacebook,FaSpotify } from "react-icons/fa6";

function Navbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [gamesDropdown,setGamesDropdown] = useState(false);
    const [aboutDropdown,setAboutDropdown] = useState(false);
    const [showConnectDialog,setShowConnectDialog] = useState(false);
    const [isScrolled,setIsScrolled] = useState(false);

    const socialLinks = [
        {
            name: 'Instagram',
            icon: <FaInstagram className="text-2xl" />,
            url: 'https://instagram.com/your-handle',
            color: 'hover:text-pink-500'
        },
        {
            name: 'TikTok',
            icon: <FaTiktok className="text-2xl" />,
            url: 'https://tiktok.com/@your-handle',
            color: 'hover:text-white'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="text-2xl" />,
            url: 'https://linkedin.com/company/your-company',
            color: 'hover:text-blue-500'
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="text-2xl" />,
            url: 'https://twitter.com/your-handle',
            color: 'hover:text-blue-400'
        },
        {
            name: 'Spotify',
            icon: <FaSpotify className="text-2xl" />,
            url: 'https://open.spotify.com/user/your-profile',
            color: 'hover:text-green-500'
        },
        {
            name: 'Facebook',
            icon: <FaFacebook className="text-2xl" />,
            url: 'https://facebook.com/your-page',
            color: 'hover:text-blue-600'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 100);
        };

        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    },[]);

    return (
        <nav className={`fixed w-full z-40 transition-colors duration-300 ${isScrolled ? 'bg-black py-2 border-b-2 border-red-600' : 'bg-transparent py-2 border-b-2 border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Left side - Logo */}
                <div className={`transition-all duration-500 flex-shrink-0 ${isScrolled ? 'translate-y-0' : '-translate-y-full'
                    }`}>
                    <Link to="/" className="block h-20 overflow-hidden">
                        <img
                            src="/pwrplay-logo.png"
                            alt="PWRPLAY Logo"
                            className="h-36 w-auto -mt-6"
                        />
                    </Link>
                </div>

                {/* Center/Right side - Navigation */}
                <div className="flex items-center gap-4 ml-auto">
                    <div className="relative group">
                        {/* Games Dropdown */}
                        <div className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-headers uppercase">
                            Games <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                        </div>
                        {/* Added invisible bridge */}
                        <div className="absolute w-full h-0.5 bg-transparent"></div>
                        <div className="absolute left-1/2 -translate-x-1/2 mt-0.5 bg-black/95 backdrop-blur-sm text-white rounded-lg shadow-xl hidden group-hover:block min-w-[220px] whitespace-nowrap transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-[-10px] border border-gray-800 overflow-hidden">
                            <Link to="/controlled-chaos" className="block px-4 py-2 hover:text-red-500 transition-all duration-300 hover:pl-6 outline-none font-headers uppercase">
                                Controlled Chaos™
                            </Link>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* About Dropdown */}
                        <div className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-headers uppercase">
                            About <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                        </div>
                        {/* Added invisible bridge */}
                        <div className="absolute w-full h-0.5 bg-transparent"></div>
                        <div className="absolute left-1/2 -translate-x-1/2 mt-0.5 bg-black/95 backdrop-blur-sm text-white rounded-lg shadow-xl hidden group-hover:block min-w-[220px] whitespace-nowrap transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-[-10px] border border-gray-800 overflow-hidden">
                            <Link to="/about/team" className="block px-4 py-2 hover:text-red-500 transition-all duration-300 hover:pl-6 outline-none font-headers uppercase">
                                Team
                            </Link>
                            <Link to="/about/timeline" className="block px-4 py-2 hover:text-red-500 transition-all duration-300 hover:pl-6 outline-none font-headers uppercase">
                                Timeline
                            </Link>
                        </div>
                    </div>

                    <Link to="/faq" className="transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-headers uppercase">
                        FAQs
                    </Link>

                    <button
                        onClick={() => setShowConnectDialog(true)}
                        className="transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-headers uppercase"
                    >
                        Connect
                    </button>

                    <Link
                        to="/controlled-chaos#buy-section"
                        className="px-6 py-2 bg-red-600 transition-all duration-300 rounded-lg text-lg font-headers
                                hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 outline-none hover:box-shadow-[0_0_20px_rgba(239,68,68,0.6)] uppercase"
                    >
                        Shop
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden hover:text-red-500 transition-all duration-300 p-2 hover:bg-gray-800/30 rounded-lg outline-none"
                >
                    {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
                </button>

                {/* Mobile Navigation */}
                {
                    isOpen && (
                        <div className="absolute top-[72px] left-0 w-full bg-black/95 backdrop-blur-sm text-white flex flex-col items-center py-6 
                                space-y-4 shadow-xl animate-fadeIn">
                            <Link to="/" className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none uppercase">
                                Home
                            </Link>
                            <button
                                onClick={() => setGamesDropdown(!gamesDropdown)}
                                className="flex items-center justify-center gap-2 py-2 px-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-gray-800/30 rounded-lg w-[90%] outline-none uppercase"
                            >
                                Games <FaChevronDown className={`transition-transform duration-300 ${gamesDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {gamesDropdown && (
                                <div className="bg-black/95 backdrop-blur-sm text-white py-2 rounded-lg shadow-lg w-[90%] max-w-[300px] border border-gray-800/50 animate-slideDown">
                                    <Link to="/controlled-chaos" className="block px-6 py-3 hover:text-red-500 transition-all duration-300 hover:pl-8 outline-none font-headers uppercase">
                                        Controlled Chaos™
                                    </Link>
                                </div>
                            )}

                            {/* About Dropdown Mobile */}
                            <button
                                onClick={() => setAboutDropdown(!aboutDropdown)}
                                className="flex items-center justify-center gap-2 py-2 px-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-gray-800/30 rounded-lg w-[90%] outline-none uppercase"
                            >
                                About <FaChevronDown className={`transition-transform duration-300 ${aboutDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {aboutDropdown && (
                                <div className="bg-black/95 backdrop-blur-sm text-white py-2 rounded-lg shadow-lg w-[90%] max-w-[300px] border border-gray-800/50 animate-slideDown">
                                    <Link to="/about/team" className="block px-6 py-3 hover:text-red-500 transition-all duration-300 hover:pl-8 outline-none font-headers uppercase">
                                        Team
                                    </Link>
                                    <Link to="/about/timeline" className="block px-6 py-3 hover:text-red-500 transition-all duration-300 hover:pl-8 outline-none font-headers uppercase">
                                        Timeline
                                    </Link>
                                </div>
                            )}

                            <Link to="/faq" className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none uppercase">
                                FAQs
                            </Link>

                            <button
                                onClick={() => setShowConnectDialog(true)}
                                className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none uppercase"
                            >
                                Connect
                            </button>

                            <Link
                                to="/controlled-chaos#buy-section"
                                className="px-6 py-2 bg-red-600 transition-all duration-300 rounded-lg text-lg font-headers
                                        hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 outline-none hover:box-shadow-[0_0_20px_rgba(239,68,68,0.6)] uppercase"
                            >
                                Shop
                            </Link>
                        </div>
                    )
                }

                {/* Connect Dialog */}
                {showConnectDialog && (
                    <div
                        className="fixed inset-0 flex items-start justify-center pt-[20vh] z-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowConnectDialog(false);
                            }
                        }}
                    >
                        <div className="bg-red-600 rounded-xl p-8 max-w-md w-[90%] mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white uppercase">Connect With Us!</h2>
                                <button
                                    onClick={() => setShowConnectDialog(false)}
                                    className="p-2 text-white hover:text-gray-200 transition-colors rounded-lg"
                                >
                                    <FaXmark size={24} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-3 p-4 rounded-lg bg-white text-black
                                            transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                                    >
                                        {social.icon}
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
