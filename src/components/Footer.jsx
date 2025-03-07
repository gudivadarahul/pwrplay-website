import { Link } from "react-router-dom";
import { FaInstagram,FaTiktok,FaXTwitter,FaFacebook,FaLinkedin,FaSpotify } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-black text-white text-center py-4 md:py-6 mt-4">
            <div className="flex justify-center gap-4 md:gap-8 mb-4 md:mb-6">
                {/* Social Media Links with Icons */}
                <a href="https://www.instagram.com/pwrplayofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                    <FaInstagram className="text-2xl md:text-3xl" />
                </a>
                <a href="https://www.tiktok.com/@pwrplayofficial" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0050]">
                    <FaTiktok className="text-2xl md:text-3xl" />
                </a>
                <a href="https://x.com/pwrplayofficial" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    <FaXTwitter className="text-2xl md:text-3xl" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61573023322110" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    <FaFacebook className="text-2xl md:text-3xl" />
                </a>
                <a href="https://www.linkedin.com/company/pwrplaycreations/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    <FaLinkedin className="text-2xl md:text-3xl" />
                </a>
                <a href="https://open.spotify.com/user/31jzakcd3goacdn6unwpyceoseai" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                    <FaSpotify className="text-2xl md:text-3xl" />
                </a>
            </div>

            <p className="text-sm md:text-base opacity-80 font-body font-medium">
                {new Date().getFullYear()} PWRPLAY Creations, Inc. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="text-sm md:text-base mt-2 md:mt-3 font-medium">
                <Link to="/terms" className="hover:underline hover:text-red-500">Terms of Use</Link> |
                <Link to="/privacy" className="hover:underline hover:text-red-500"> Privacy Policy</Link>
            </div>
        </footer>
    );
}

export default Footer;
