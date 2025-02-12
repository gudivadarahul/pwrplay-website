import { FaShuffle, FaPlay, FaTrophy } from 'react-icons/fa6';

function HowToPlay() {
  return (
    <section className="bg-gray-900 text-white py-16 px-6 text-center">
      <h2 className="text-4xl font-extrabold mb-6">How to Play</h2>
      <p className="text-lg opacity-80 mb-12">
        A fast, fun, and unpredictable game for any party! Just **shuffle, draw, and play!**
      </p>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Step 1: Shuffle */}
        <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaShuffle className="text-primary text-5xl mb-4" />
          <h3 className="text-2xl font-bold">Step 1: Shuffle</h3>
          <p className="mt-2 opacity-80">
            Mix the deck and place it in the center.
          </p>
        </div>

        {/* Step 2: Draw & Play */}
        <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaPlay className="text-primary text-5xl mb-4" />
          <h3 className="text-2xl font-bold">Step 2: Draw & Play</h3>
          <p className="mt-2 opacity-80">
            Each player takes turns drawing a card and following the instructions.
          </p>
        </div>

        {/* Step 3: Win & Celebrate */}
        <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaTrophy className="text-primary text-5xl mb-4" />
          <h3 className="text-2xl font-bold">Step 3: Win & Celebrate</h3>
          <p className="mt-2 opacity-80">
            Complete the card challenges, outplay your friends, and embrace the chaos!
          </p>
        </div>
      </div>

      {/* Optional Video Embed */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Watch How It Works</h3>
        <div className="relative w-full max-w-3xl mx-auto aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="How to Play Controlled Chaos™"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default HowToPlay;
