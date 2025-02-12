import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaXmark,FaChevronDown } from "react-icons/fa6";

function Navbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [gamesDropdown,setGamesDropdown] = useState(false);

    return (
        <nav className="bg-black/95 backdrop-blur-sm text-white py-4 px-8 flex justify-between items-center fixed top-0 w-full z-50 
            shadow-lg">
            {/* Logo */}
            <Link to="/" className="h-9 transition-all duration-300 hover:scale-105 hover:brightness-125 outline-none">
                <img
                    src="/pwrplay-logo.png"
                    alt="PWRPLAY Creations"
                    className="h-full scale-[3] transform-gpu origin-left"
                />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12 text-lg font-bold">
                <div className="relative group">
                    {/* Games Dropdown */}
                    <div className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-bold">
                        Games <FaChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    {/* Added invisible bridge */}
                    <div className="absolute w-full h-0.5 bg-transparent"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 mt-0.5 bg-black/95 backdrop-blur-sm text-white rounded-lg shadow-xl hidden group-hover:block min-w-[220px] whitespace-nowrap transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-[-10px]border border-gray-800 overflow-hidden">
                        <Link to="/controlled-chaos" className="block px-4 py-2 hover:text-red-500 transition-all duration-300 hover:pl-6 outline-none">
                            Controlled Chaos™
                        </Link>
                    </div>
                </div>

                <Link to="/about" className="transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-bold">
                    About
                </Link>
                <Link to="/faq" className="transition-all duration-300 hover:text-red-500 py-2 px-3 rounded-lg outline-none text-lg font-bold">
                    FAQs
                </Link>
                <a
                    href="https://www.amazon.com/dp/YOUR_PRODUCT_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-red-600 transition-all duration-300 rounded-lg text-lg font-bold
                        hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 outline-none hover:box-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                >
                    Buy Now
                </a>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden hover:text-red-500 transition-all duration-300 p-2 hover:bg-gray-800/30 rounded-lg outline-none"
            >
                {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-black/95 backdrop-blur-sm text-white flex flex-col items-center py-6 
                    space-y-4 shadow-xl animate-fadeIn">
                    <Link to="/" className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none">
                        Home
                    </Link>
                    <button
                        onClick={() => setGamesDropdown(!gamesDropdown)}
                        className="flex items-center justify-center gap-2 py-2 px-4 hover:text-red-500 transition-all duration-300 
                            hover:bg-gray-800/30 rounded-lg w-[90%] outline-none"
                    >
                        Games <FaChevronDown className={`transition-transform duration-300 ${gamesDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {gamesDropdown && (
                        <div className="bg-black/95 backdrop-blur-sm text-white py-2 rounded-lg shadow-lg w-[90%] max-w-[300px] border border-gray-800/50 animate-slideDown">
                            <Link to="/controlled-chaos" className="block px-6 py-3 hover:text-red-500 transition-all duration-300 hover:pl-8 outline-none">
                                Controlled Chaos™
                            </Link>
                        </div>
                    )}
                    <Link to="/about" className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none">
                        About
                    </Link>
                    <Link to="/faq" className="py-2 px-4 hover:text-red-500 transition-all duration-300 rounded-lg w-[90%] text-center outline-none">
                        FAQs
                    </Link>
                    <a
                        href="https://www.amazon.com/dp/YOUR_PRODUCT_ID"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-red-600 transition-all duration-300 rounded-lg text-lg font-bold
                            hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 outline-none hover:box-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                    >
                        Buy Now
                    </a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
