import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-black text-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-lg">
            {/* Logo */}
            <h1 className="text-2xl font-bold">PWRPLAY</h1>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-6">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/buy" className="hover:underline">Buy Now</Link>
                <Link to="/faq" className="hover:underline">FAQs</Link>
            </div>

            {/* Mobile Menu (Optional) */}
            <div className="md:hidden">
                <button className="text-xl">&#9776;</button> {/* Simple menu icon */}
            </div>
        </nav>
    );
}

export default Navbar
