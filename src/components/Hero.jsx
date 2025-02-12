import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-black text-white h-[90vh] flex flex-col items-center justify-center text-center p-8">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight">
          The Ultimate Party Drinking Card Game!
        </h1>
        <p className="text-lg mt-4 opacity-80">
          Bring Controlled Chaos™ to your next game night and turn any party into an unforgettable experience.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/buy" className="border-2 border-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-white hover:text-black transition">
            Buy Now
          </Link>
          <Link to="/join-chaos" className="border-2 border-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-white hover:text-black transition">
            Join the Chaos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
