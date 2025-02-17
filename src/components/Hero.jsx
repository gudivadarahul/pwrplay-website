import { Link } from "react-router-dom";
import "../assets/Hero.css";

function Hero() {
  return (
    <section className="relative bg-black text-white py-32 px-6 text-center overflow-hidden">
      {/* Logo in top-left */}
      <div className="absolute -top-12 -left-3 z-[200]">
        <img
          src="/pwrplay-logo.png"
          alt="PWRPLAY Logo"
          className="w-72 h-auto"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-2/5 mt-8">
          <h1 className="text-5xl md:text-7xl font-headers leading-tight mb-12 fade-in">
            Reinventing the Way You{" "}
            <span className="text-red-600">Connect.</span>
          </h1>

          <div className="button-fade">
            <Link
              to="/controlled-chaos"
              className="inline-block border-2 border-red-600 bg-black text-white px-12 py-6 rounded-lg text-2xl font-subheaders font-semibold 
              shadow-lg transform hover:scale-105 transition-all duration-300 
              hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect [&:hover]:animation-none"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="md:w-3/5 mt-16 md:mt-0 slide-up flex flex-col items-center justify-center">
          <div className="relative w-full">
            <img
              src="/box-top-view.png"
              alt="Controlled Chaos™ Party Game"
              className="w-[160%] max-w-none object-contain transition-transform duration-300 -ml-24"
            />
          </div>
          {/* <h3 className="text-7xl mt-8 font-subheaders font-semibold text-center ml-24 !font-[Rajdhani]">
            <span className="text-red-600">COMING SOON!</span>
          </h3> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
