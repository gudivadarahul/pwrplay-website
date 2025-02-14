import { Link } from "react-router-dom";
import "../assets/Hero.css";

function Hero() {
  return (
    <section className="relative bg-black text-white py-24 px-6 text-center overflow-hidden">
      {/* Logo in top-left */}
      <div className="absolute -top-12 -left-3 z-[200]">
        <img
          src="/pwrplay-logo.png"
          alt="PWRPLAY Logo"
          className="w-72 h-auto"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2 mt-12">
          <h1 className="text-5xl md:text-7xl font-headers leading-tight mb-6 fade-in">
            Reinventing the Way You{" "}
            <span className="text-red-600">Connect.</span>
          </h1>

          {/* New Message */}
          <p className="text-3xl mb-4 font-subheaders font-light opacity-80">
            Controlled Chaos™ Coming Soon!
          </p>

          <p className="text-xl mb-12 leading-relaxed slide-up">
          </p>

          {/* CTA Buttons */}
          <div className="button-fade">
            <Link
              to="/controlled-chaos"
              className="mt-8 inline-block border-2 border-red-600 bg-black text-white px-12 py-6 rounded-lg text-2xl font-subheaders 
              shadow-lg transform hover:scale-105 transition-all duration-300 
              hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect [&:hover]:animation-none"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-3/5 mt-10 md:mt-0 slide-up">
          <img
            src="/box-top-view.png"
            alt="Controlled Chaos™ Party Game"
            className="w-[180%] max-w-none object-contain transition-transform duration-300 -ml-30"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
