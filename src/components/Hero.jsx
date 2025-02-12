import { Link } from "react-router-dom";
import { FaUsers,FaClock,FaUser,FaDice } from "react-icons/fa6";
import { GiCardRandom } from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import "../assets/Hero.css";

function Hero() {
  return (
    <section className="relative bg-black text-white py-24 px-6 text-center overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 fade-in">
            Welcome to{" "}
            <span className="text-red-600 hover:text-red-500 transition-colors duration-300 pulse-slow inline-block hover:animate-none">
              PWRPLAY Creations
            </span>
          </h1>

          <p className="text-xl mb-12 leading-relaxed slide-up">
            We create high-energy, unforgettable party games.
            Our first release{" "}
            <span className="font-bold text-red-600 hover:text-red-500 transition-colors duration-300">
              Controlled Chaos
            </span>{" "}
            is here to level up your game nights.
          </p>

          {/* CTA Buttons */}
          <div className="button-fade mt-4">
            <Link
              to="/controlled-chaos"
              className="border-2 border-red-600 bg-black text-white px-8 py-4 rounded-lg text-lg font-bold 
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
            className="w-[120%] mx-auto object-contain transform rotate-[5deg] hover:rotate-0 transition-transform duration-300"
          />

          {/* Game Stats Bar - Using FA icons */}
          <div className="flex justify-center space-x-8 mt-4 slide-up">
            <div className="flex items-center">
              <FaUsers className="h-6 w-6 text-red-600 mr-2" />
              <div>
                <div className="font-bold">3-8</div>
                <div className="text-sm text-gray-300">Players</div>
              </div>
            </div>

            <div className="flex items-center">
              <FaClock className="h-6 w-6 text-red-600 mr-2" />
              <div>
                <div className="font-bold">30-45</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
            </div>

            <div className="flex items-center">
              <FaUser className="h-6 w-6 text-red-600 mr-2" />
              <div>
                <div className="font-bold">16+</div>
                <div className="text-sm text-gray-300">Age</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
