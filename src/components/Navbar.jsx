import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-primary text-white py-4 px-8 flex justify-between">
            <h1 className="text-2xl font-bold">PWRPLAY</h1>
            <div className="flex gap-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/buy" className="hover:underline">Buy Now</Link>
            </div>
        </nav>
    );
}

export default Navbar;
