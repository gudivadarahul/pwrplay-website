import { FaShuffle,FaPlay,FaTrophy } from "react-icons/fa6";

function ControlledChaos() {
    return (
        <div className="pt-24 p-8 text-white min-h-screen bg-black">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center fade-in">
                Controlled Chaos™
            </h1>
            <p className="text-xl opacity-80 text-center mb-12 slide-up">
                The ultimate <strong className="text-red-600">party drinking game</strong> where every round is <strong>unpredictable, competitive, and hilarious</strong>.
            </p>

            {/* How to Play Section */}
            <section className="bg-black text-white py-16 px-6 text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">
                    A fast, fun, and unpredictable game for any party! Just shuffle, draw, and play!
                </p>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Step 1: Shuffle */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaShuffle className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-bold">Step 1: Shuffle</h3>
                        <p className="mt-2 opacity-80">
                            Mix the deck and place it in the center.
                        </p>
                    </div>

                    {/* Step 2: Draw & Play */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaPlay className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-bold">Step 2: Draw & Play</h3>
                        <p className="mt-2 opacity-80">
                            Each player takes turns drawing a card and following the instructions.
                        </p>
                    </div>

                    {/* Step 3: Win & Celebrate */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaTrophy className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-bold">Step 3: Win & Celebrate</h3>
                        <p className="mt-2 opacity-80">
                            Complete the card challenges, outplay your friends, and embrace the chaos!
                        </p>
                    </div>
                </div>

                {/* Optional Video Embed */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6">Watch How It <span className="text-red-600">Works</span></h3>
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

            {/* What's in the Box */}
            <section className="mb-16">
                <h2 className="text-4xl font-extrabold mb-8 text-center">What's <span className="text-red-600">Inside?</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-bold text-lg">150 Challenge & Strategy Cards</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-bold text-lg">Special Drinking Cards</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-bold text-lg">Wild Cards for Unpredictable Twists</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-bold text-lg">Easy-to-Follow Rulebook</span>
                    </div>
                </div>
            </section>

            {/* Buy Now Section */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                <a
                    href="https://www.amazon.com/dp/YOUR_PRODUCT_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                    Buy Now (Amazon U.S.)
                </a>
                <a
                    href="https://www.amazon.ca/dp/YOUR_PRODUCT_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold 
                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                    Buy Now (Amazon Canada)
                </a>
            </div>
        </div>
    );
}

export default ControlledChaos;
