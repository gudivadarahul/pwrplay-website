function Footer() {
    return (
        <footer className="bg-black text-white text-center py-6 mt-12">
            <div className="flex justify-center gap-6 mb-4">
                {/* Social Media Links */}
                <a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://tiktok.com/@YOUR_HANDLE" target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href="https://twitter.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                <a href="https://facebook.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://linkedin.com/company/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>

            <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} PWRPLAY Creations. All rights reserved.</p>

            {/* Legal Links */}
            <div className="text-sm mt-2">
                <a href="/terms" className="hover:underline">Terms of Use</a> |
                <a href="/privacy" className="hover:underline"> Privacy Policy</a>
            </div>
        </footer>
    );
}

export default Footer;
