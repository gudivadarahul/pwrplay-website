import { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import "../assets/Hero.css";

function Hero() {
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.location.reload();
    }
  };

  // Add countdown timer state and logic
  const [timeLeft,setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set your target date to April 11th, 2025 at 12:00 PM
    const targetDate = new Date("2025-04-11T12:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0,hours: 0,minutes: 0,seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days,hours,minutes,seconds });
    },1000);

    // Do an initial check for the mobile menu
    const mobileMenu = document.querySelector('[data-mobile-menu-open="true"]');
    setIsMobileMenuOpen(!!mobileMenu);

    // Function to handle the custom event
    const handleMenuToggle = (event) => {
      setIsMobileMenuOpen(event.detail.isOpen);
    };

    // Add event listener for the custom event
    window.addEventListener('mobileMenuToggle',handleMenuToggle);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mobileMenuToggle',handleMenuToggle);
    };
  },[]);

  return (
    <section
      className="relative text-white h-[50vh] sm:h-[60vh] md:h-screen flex items-center px-4 sm:px-6 text-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/hero-bg3.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Logo in top-left - hide when mobile menu is open */}
      <div className={`absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-16 -left-1 sm:-left-2 md:-left-3 z-[201] ${isMobileMenuOpen ? 'lg:block hidden' : 'block'}`}>
        <Link to="/" onClick={() => handleNavClick('/')} className="block">
          <img
            src="/pwrplay-logo.png"
            alt="PWRPLAY Logo"
            className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-80 h-auto cursor-pointer"
          />
        </Link>
      </div>



      {/* Launch Announcement Banner - positioned above content area */}
      <div className="absolute top-28 sm:top-32 md:top-42 lg:top-80 left-1/2 transform -translate-x-1/2 z-[199]">
        <Link
          to="/buy"
          className="inline-block text-white 
          text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
          font-subheaders font-bold 
          transform hover:scale-105 transition-all duration-300 
          animate-pulse hover:animate-none
          cursor-pointer"
          style={{
            textShadow: '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626, 0 0 40px #dc2626'
          }}
        >
          GAME IS LIVE NOW - BUY TODAY!
        </Link>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Text Content */}
        <div className="w-full flex flex-col justify-center mt-2 sm:mt-8 md:mt-12 lg:mt-60 relative">

          {/* Top line animation - hidden on mobile */}
          <div className="absolute w-full overflow-visible -top-6 sm:-top-8 md:-top-12 lg:-top-16 left-0 right-0 hidden sm:flex justify-end pr-4 sm:pr-8 md:pr-12 z-20">
            <img
              src="/top_line.png"
              alt=""
              className="line-animation-right w-2/5 md:w-1/3"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-headers leading-tight sm:mt-4 md:mt-0 lg:-mt-12 relative z-10">
            <span className="inline-block reveal-text-1">Reinventing</span>{" "}
            <span className="inline-block reveal-text-2">the Way</span>{" "}
            <span className="inline-block reveal-text-3">You</span>{" "}
            <span className="inline-block reveal-text-4 text-red-600">Connect.</span>
          </h1>

          {/* Bottom line animation - hidden on mobile */}
          <div className="absolute w-full overflow-visible top-4 sm:top-6 md:top-10 lg:top-14 left-0 right-0 hidden sm:flex justify-start pl-4 sm:pl-8 md:pl-12 z-20">
            <img
              src="/bottom_line.png"
              alt=""
              className="line-animation-left w-2/5 md:w-1/3"
            />
          </div>

          <div className="button-fade absolute top-18 sm:top-32 md:top-40 lg:top-60 xl:top-56 left-0 right-0 reveal-button">
            <Link
              to="/controlled-chaos"
              className="inline-block border-2 border-red-600 bg-black text-white 
              px-3 sm:px-4 md:px-5 lg:px-8 
              py-1.5 sm:py-2 md:py-2.5 lg:py-4 
              rounded-lg lg:rounded-xl
              text-sm sm:text-base md:text-lg lg:text-2xl
              font-subheaders font-semibold 
              shadow-lg transform hover:scale-105 transition-all duration-300 
              hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect [&:hover]:animation-none"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
