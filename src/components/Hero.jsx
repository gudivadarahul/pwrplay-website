import { Link } from "react-router-dom";
import "../assets/Hero.css";

function Hero() {
  return (
    <section className="relative bg-black text-white h-[40vh] md:h-screen flex items-center px-4 sm:px-6 text-center overflow-hidden">
      {/* Logo in top-left */}
      <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[30]">
        <img
          src="/pwrplay-logo.png"
          alt="PWRPLAY Logo"
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Mobile Layout */}
        <div className="w-full md:hidden flex flex-col mt-4">
          {/* Text and Image Row Container */}
          <div className="flex flex-row items-center justify-between">
            {/* Text Content for Mobile */}
            <div className="w-[45%] text-left">
              <h1 className="text-3xl sm:text-4xl font-headers leading-tight fade-in">
                Reinventing <br />
                the Way You{" "}
                <span className="text-red-600">Connect.</span>
              </h1>
            </div>

            {/* Hero Image for Mobile */}
            <div className="w-[55%] slide-up flex items-center justify-center">
              <div className="relative w-full">
                <img
                  src="/box-top-view1.png"
                  alt="Controlled Chaos™ Party Game"
                  className="w-[150%] sm:w-[160%] max-w-none object-contain transition-transform duration-300 -ml-8"
                />
              </div>
            </div>
          </div>

          {/* Centered Button Container */}
          <div className="button-fade text-center mt-[-4rem]">
            <Link
              to="/controlled-chaos"
              className="inline-block border-2 border-red-600 bg-black text-white 
              px-4 py-1.5
              rounded-lg 
              text-base
              font-subheaders font-semibold 
              shadow-lg transform hover:scale-105 transition-all duration-300 
              hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect [&:hover]:animation-none"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row md:w-full items-center">
          {/* Text Content */}
          <div className="md:w-2/5 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headers leading-tight mb-8 sm:mb-10 md:mb-12 fade-in">
              Reinventing the Way You{" "}
              <span className="text-red-600">Connect.</span>
            </h1>

            <div className="button-fade">
              <Link
                to="/controlled-chaos"
                className="inline-block border-2 border-red-600 bg-black text-white 
                px-8 sm:px-10 md:px-12 
                py-4 sm:py-5 md:py-6 
                rounded-lg 
                text-xl sm:text-2xl 
                font-subheaders font-semibold 
                shadow-lg transform hover:scale-105 transition-all duration-300 
                hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect [&:hover]:animation-none"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image Container */}
          <div className="md:w-3/5 slide-up flex flex-col items-center justify-center">
            <div className="relative w-full">
              <img
                src="/box-top-view1.png"
                alt="Controlled Chaos™ Party Game"
                className="w-[140%] sm:w-[150%] md:w-[160%] max-w-none object-contain transition-transform duration-300 
                -ml-12 sm:-ml-16 md:-ml-20 lg:-ml-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
