import { Link } from "react-router-dom";
import { FaInstagram,FaTiktok,FaXTwitter,FaFacebook,FaLinkedin,FaSpotify } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-black text-white text-center py-6 mt-12">
            <div className="flex justify-center gap-6 mb-4">
                {/* Social Media Links with Icons */}
                <a href="https://www.instagram.com/pwrplayofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                    <FaInstagram className="text-2xl" />
                </a>
                <a href="https://www.tiktok.com/@pwrplayofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <FaTiktok className="text-2xl" />
                </a>
                <a href="https://x.com/pwrplayofficial" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    <FaXTwitter className="text-2xl" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61573023322110" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    <FaFacebook className="text-2xl" />
                </a>
                <a href="https://www.linkedin.com/company/pwrplaycreations/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    <FaLinkedin className="text-2xl" />
                </a>
                <a href="https://open.spotify.com/user/31jzakcd3goacdn6unwpyceoseai" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                    <FaSpotify className="text-2xl" />
                </a>
            </div>

            <p className="text-sm opacity-80 font-body font-light">
                &copy; {new Date().getFullYear()} PWRPLAY Creations. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="text-sm mt-2">
                <Link to="/terms" className="hover:underline">Terms of Use</Link> |
                <Link to="/privacy" className="hover:underline"> Privacy Policy</Link>
            </div>
        </footer>
    );
}

export default Footer;
