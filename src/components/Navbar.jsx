import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaXmark,FaChevronDown,FaInstagram,FaTiktok,FaLinkedin,FaTwitter,FaFacebook,FaSpotify } from "react-icons/fa6";
import "../styles/navbar.css";

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [gamesDropdown,setGamesDropdown] = useState(false);
    const [aboutDropdown,setAboutDropdown] = useState(false);
    const [showConnectDialog,setShowConnectDialog] = useState(false);
    const [isScrolled,setIsScrolled] = useState(false);
    const [connectDropdown,setConnectDropdown] = useState(false);

    const socialLinks = [
        {
            name: 'Instagram',
            icon: <FaInstagram className="text-2xl" />,
            url: 'https://instagram.com/pwrplayofficial/',
        },
        {
            name: 'TikTok',
            icon: <FaTiktok className="text-2xl" />,
            url: 'https://www.tiktok.com/@pwrplayofficial',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="text-2xl" />,
            url: 'https://www.linkedin.com/company/pwrplaycreations/',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="text-2xl" />,
            url: 'https://x.com/pwrplayofficial',
        },
        {
            name: 'Spotify',
            icon: <FaSpotify className="text-2xl" />,
            url: 'https://open.spotify.com/user/31jzakcd3goacdn6unwpyceoseai',
        },
        {
            name: 'Facebook',
            icon: <FaFacebook className="text-2xl" />,
            url: 'https://www.facebook.com/profile.php?id=61573023322110',
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    },[]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Dispatch a custom event for Hero component to listen to
        window.dispatchEvent(new CustomEvent('mobileMenuToggle',{
            detail: { isOpen }
        }));

        return () => {
            document.body.style.overflow = 'auto';
        };
    },[isOpen]);

    const handleNavClick = (path) => {
        if (window.location.pathname === path) {
            window.location.reload();
        }
        setIsOpen(false); // Close mobile menu if open
    };

    return (
        <nav className={`fixed w-full z-[200] transition-colors duration-300 h-16 sm:h-18 md:h-20 ${isScrolled
            ? 'bg-black border-b-2 border-red-600'
            : 'bg-transparent border-b-0 lg:border-b-2 lg:border-transparent'
            }`}>
            <div className="max-w-8xl pr-6 flex justify-between items-center h-full">
                {/* Left side - Logo */}
                <div className="flex items-center -ml-2">
                    {/* Mobile Logo - Only visible when scrolled */}
                    <div className={`block lg:hidden transition-all duration-500 absolute -top-6 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}>
                        <Link to="/" onClick={() => handleNavClick('/')} className="block">
                            <img
                                src="/pwrplay-logo.png"
                                alt="PWRPLAY Logo"
                                className="h-30 sm:h-34 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Logo */}
                    <div className={`hidden lg:block transition-all duration-500 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                        }`}>
                        <Link to="/" onClick={() => handleNavClick('/')} className="block h-16 lg:h-18 xl:h-20 overflow-hidden">
                            <img
                                src="/pwrplay-logo.png"
                                alt="PWRPLAY Logo"
                                className="h-20 lg:h-24 xl:h-45 w-auto object-contain -mt-12"
                            />
                        </Link>
                    </div>
                </div>

                {/* Center/Right side - Navigation */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-8 ml-auto lg:ml-8 xl:ml-16">
                    {/* Games Dropdown */}
                    <div className="relative group">
                        <h3 className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 
                            py-2 px-3 rounded-lg outline-none text-xl lg:text-2xl xl:text-4xl font-headers uppercase">
                            Games <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                        </h3>
                        <div className="nav-dropdown absolute top-[calc(100%-20px)] left-0">
                            <div className="bg-black/95 backdrop-blur-sm py-2 rounded-lg shadow-lg min-w-[200px]">
                                <h3>
                                    <Link to="/controlled-chaos" onClick={() => handleNavClick('/controlled-chaos')} className="nav-link">
                                        Controlled Chaos™
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* About Dropdown */}
                    <div className="relative group">
                        <h3 className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 
                            py-2 px-3 rounded-lg outline-none text-xl lg:text-2xl xl:text-4xl font-headers uppercase">
                            About <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                        </h3>
                        <div className="nav-dropdown absolute top-[calc(100%-20px)] left-0">
                            <div className="bg-black/95 backdrop-blur-sm py-2 rounded-lg shadow-lg min-w-[200px]">
                                <h3>
                                    <Link to="/about" onClick={() => handleNavClick('/about')} className="nav-link">
                                        Our Story
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/about/timeline" onClick={() => handleNavClick('/about/timeline')} className="nav-link">
                                        Timeline
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Connect Dropdown */}
                    <div className="relative group">
                        <h3 className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 
                            py-2 px-3 rounded-lg outline-none text-xl lg:text-2xl xl:text-4xl font-headers uppercase">
                            Connect <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                        </h3>
                        <div className="nav-dropdown absolute top-[calc(100%-20px)] left-0">
                            <div className="bg-black/95 backdrop-blur-sm py-2 rounded-lg shadow-lg min-w-[200px]">
                                <h3>
                                    <Link to="/contact" onClick={() => handleNavClick('/contact')} className="nav-link">
                                        Contact Us
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/ambassador" onClick={() => handleNavClick('/ambassador')} className="nav-link">
                                        Ambassadors
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/connect/retailers" onClick={() => handleNavClick('/connect/retailers')} className="nav-link">
                                        Retailers
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/faq" onClick={() => handleNavClick('/faq')} className="nav-link">
                                        FAQ
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <h3>
                        <Link
                            to="/products"
                            onClick={() => handleNavClick('/products')}
                            className="px-4 py-2 bg-red-600 rounded-lg 
                                text-xl lg:text-2xl xl:text-4xl font-headers 
                                uppercase"
                        >
                            Shop
                        </Link>
                    </h3>
                </div>

                {/* Mobile Menu Button - positioned absolutely on mobile */}
                <div className={`lg:hidden absolute ${isOpen ? 'top-3.5' : 'top-1.5'} right-1.5 z-[500]`}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:text-red-500 transition-all duration-300 p-3
                            hover:bg-red-600/10 rounded-full outline-none z-[500]"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ?
                            <FaXmark size={36} className="text-red-500" /> :
                            <FaBars size={28} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black
                    text-white flex flex-col items-center py-8 shadow-xl animate-fadeIn lg:hidden
                    overflow-y-auto z-[300] pt-32" data-mobile-menu-open="true">

                    {/* Logo in mobile menu */}
                    <div className="absolute -top-4 left-0 z-[350]">
                        <Link to="/" onClick={() => handleNavClick('/')}>
                            <img
                                src="/pwrplay-logo.png"
                                alt="PWRPLAY Logo"
                                className="h-32 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="w-[90%]">
                        <button
                            onClick={() => setGamesDropdown(!gamesDropdown)}
                            className="flex items-center justify-between gap-2 py-4 px-6 hover:bg-red-600/20 hover:text-red-500 
                                    transition-all duration-300 rounded-xl w-full outline-none uppercase font-medium tracking-wide text-2xl"
                        >
                            Games <FaChevronDown className={`transition-transform duration-300 ${gamesDropdown ? 'rotate-180 text-red-500' : ''}`} />
                        </button>
                        {gamesDropdown && (
                            <div className="bg-black border border-gray-800 text-white py-2 rounded-xl shadow-lg w-[95%] mx-auto mt-2
                                border-l-2 border-red-600 animate-slideDown">
                                <h3>
                                    <Link to="/controlled-chaos" onClick={() => handleNavClick('/controlled-chaos')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Controlled Chaos™
                                    </Link>
                                </h3>
                            </div>
                        )}
                    </div>

                    {/* Red border separator */}
                    <div className="w-[90%] border-b-4 border-red-600 my-6"></div>

                    {/* About Dropdown Mobile */}
                    <div className="w-[90%]">
                        <button
                            onClick={() => setAboutDropdown(!aboutDropdown)}
                            className="flex items-center justify-between gap-2 py-4 px-6 hover:bg-red-600/20 hover:text-red-500 
                                    transition-all duration-300 rounded-xl w-full outline-none uppercase font-medium tracking-wide text-2xl"
                        >
                            About <FaChevronDown className={`transition-transform duration-300 ${aboutDropdown ? 'rotate-180 text-red-500' : ''}`} />
                        </button>
                        {aboutDropdown && (
                            <div className="bg-black border border-gray-800 text-white py-2 rounded-xl shadow-lg w-[95%] mx-auto mt-2
                                border-l-2 border-red-600 animate-slideDown">
                                <h3>
                                    <Link to="/about" onClick={() => handleNavClick('/about')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Team
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/about/timeline" onClick={() => handleNavClick('/about/timeline')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Timeline
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/faq" onClick={() => handleNavClick('/faq')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        FAQ
                                    </Link>
                                </h3>
                            </div>
                        )}
                    </div>

                    {/* Red border separator */}
                    <div className="w-[90%] border-b-4 border-red-600 my-6"></div>

                    {/* Connect Dropdown Mobile */}
                    <div className="w-[90%]">
                        <button
                            onClick={() => setConnectDropdown(!connectDropdown)}
                            className="flex items-center justify-between gap-2 py-4 px-6 hover:bg-red-600/20 hover:text-red-500 
                                    transition-all duration-300 rounded-xl w-full outline-none uppercase font-medium tracking-wide text-2xl"
                        >
                            Connect <FaChevronDown className={`transition-transform duration-300 ${connectDropdown ? 'rotate-180 text-red-500' : ''}`} />
                        </button>
                        {connectDropdown && (
                            <div className="bg-black border border-gray-800 text-white py-2 rounded-xl shadow-lg w-[95%] mx-auto mt-2
                                border-l-2 border-red-600 animate-slideDown">
                                <h3>
                                    <Link to="/contact" onClick={() => handleNavClick('/contact')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Contact Us
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/ambassador" onClick={() => handleNavClick('/ambassador')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Ambassadors
                                    </Link>
                                </h3>
                                <h3>
                                    <Link to="/connect/retailers" onClick={() => handleNavClick('/connect/retailers')}
                                        className="block px-6 py-4 hover:text-red-500 transition-all duration-300 
                                        hover:bg-red-600/10 hover:pl-8 outline-none font-headers text-xl uppercase">
                                        Retailers
                                    </Link>
                                </h3>
                            </div>
                        )}
                    </div>

                    {/* Red border separator */}
                    <div className="w-[90%] border-b-4 border-red-600 my-6"></div>

                    <div className="w-[90%] mt-2">
                        <Link
                            to="/products"
                            onClick={() => handleNavClick('/products')}
                            className="block w-full text-center px-6 py-4 bg-gradient-to-r from-red-700 to-red-600 
                                transition-all duration-300 rounded-xl text-2xl font-bold uppercase tracking-wider
                                shadow-lg shadow-red-600/20 hover:shadow-red-500/40 hover:scale-105 outline-none"
                        >
                            Shop Now
                        </Link>
                    </div>

                    {/* Social media icons */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8 pt-4 border-t border-gray-700/50 w-[90%] pb-8">
                        {socialLinks.map((social,index) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 rounded-full bg-black`}
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            )}

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
                            <h2 className="text-4xl font-bold text-white uppercase">Connect With Us!</h2>
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
        </nav>
    );
};

export default Navbar;
