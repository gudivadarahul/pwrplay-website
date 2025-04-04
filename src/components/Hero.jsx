import { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import "../assets/Hero.css";

function Hero() {
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

    return () => clearInterval(interval);
  },[]);

  return (
    <section
      className="relative text-white h-[50vh] md:h-screen flex items-center px-4 sm:px-6 text-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/hero-bg1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Logo in top-left */}
      <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[30]">
        <Link to="/" onClick={() => handleNavClick('/')} className="block">
          <img
            src="/pwrplay-logo.png"
            alt="PWRPLAY Logo"
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Text Content */}
        <div className="w-full flex flex-col justify-center mt-16 sm:mt-20 md:mt-24 relative">
          {/* Countdown Timer - Positioned much higher */}
          <div className="absolute w-full top-[-300px] sm:top-[-320px] md:top-[-340px] left-0 right-0 z-30">
            <p className="text-xl sm:text-2xl md:text-3xl font-subheaders mb-3 sm:mb-4 font-bold text-white">PRESALE LAUNCH</p>
            <div className="flex justify-center items-center space-x-3 sm:space-x-5 md:space-x-6">
              <div className="flex flex-col items-center">
                <div className="bg-black border-2 border-red-600 rounded-lg w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
                  <span className="text-sm sm:text-base text-red-600 font-semibold">DAYS</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-black border-2 border-red-600 rounded-lg w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
                  <span className="text-sm sm:text-base text-red-600 font-semibold">HRS</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-black border-2 border-red-600 rounded-lg w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-sm sm:text-base text-red-600 font-semibold">MINS</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-black border-2 border-red-600 rounded-lg w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-sm sm:text-base text-red-600 font-semibold">SECS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top line animation - hidden on mobile */}
          <div className="absolute w-full overflow-visible -top-8 sm:-top-12 md:-top-16 left-0 right-0 hidden sm:flex justify-end pr-4 sm:pr-8 md:pr-12 z-20">
            <img
              src="/top_line.png"
              alt=""
              className="line-animation-right w-2/5 md:w-1/3"
            />
          </div>

          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-headers leading-tight -mt-12 sm:-mt-10 md:-mt-12 relative z-10">
            <span className="inline-block reveal-text-1">Reinventing</span>{" "}
            <span className="inline-block reveal-text-2">the Way</span>{" "}
            <span className="inline-block reveal-text-3">You</span>{" "}
            <span className="inline-block reveal-text-4 text-red-600">Connect.</span>
          </h1>

          {/* Bottom line animation - hidden on mobile */}
          <div className="absolute w-full overflow-visible top-6 sm:top-10 md:top-14 left-0 right-0 hidden sm:flex justify-start pl-4 sm:pl-8 md:pl-12 z-20">
            <img
              src="/bottom_line.png"
              alt=""
              className="line-animation-left w-2/5 md:w-1/3"
            />
          </div>

          <div className="button-fade absolute top-25 sm:top-48 md:top-60 lg:top-72 left-0 right-0 reveal-button">
            <Link
              to="/controlled-chaos"
              className="inline-block border-2 border-red-600 bg-black text-white 
              px-4 sm:px-5 md:px-6 lg:px-8 
              py-2 sm:py-2.5 md:py-3 lg:py-4 
              rounded-lg lg:rounded-xl
              text-base sm:text-lg md:text-xl lg:text-2xl
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
