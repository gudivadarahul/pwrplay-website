import { FaShuffle,FaPlay,FaTrophy } from "react-icons/fa6";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ControlledChaos() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#buy-section') {
            const element = document.getElementById('buy-section');
            if (element) {
                const start = window.pageYOffset;
                const target = element.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 3);
                const distance = target - start;
                const duration = 1000; // 1 second duration
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration,1);

                    // Easing function for smooth animation
                    const easeInOutCubic = progress => {
                        return progress < 0.5
                            ? 4 * progress * progress * progress
                            : 1 - Math.pow(-2 * progress + 2,3) / 2;
                    };

                    window.scrollTo(0,start + (distance * easeInOutCubic(progress)));

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        }
    },[location]);

    return (
        <div className="pt-24 p-8 text-white min-h-screen bg-black">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-headers mb-6 text-center fade-in">
                Controlled Chaos™
            </h1>

            {/* Main Description */}
            <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <p className="text-xl opacity-90 text-center leading-relaxed slide-up font-body font-light">
                    Tired of the same old games with predictable cards and outcomes?
                    <span className="text-red-600 font-bold"> So are we!</span> That's why we created Controlled Chaos™—a party game that
                    guarantees fresh excitement through unpredictable gameplay, endless surprises, and unforgettable moments every time you play.
                </p>

                <p className="text-xl opacity-90 text-center leading-relaxed slide-up font-body font-light">
                    But Controlled Chaos™ is more than just laughs and challenges (though there's plenty of that).
                    It's about <span className="font-bold">forging connections, sharing personal stories, uncovering hilarious truths,</span> and
                    discovering unexpected sides of your friends. Each spin brings unforgettable moments, sparking the
                    kind of fun that makes game night the highlight of the week.
                </p>

                <p className="text-xl opacity-90 text-center leading-relaxed font-body font-light">
                    Say goodbye to boring game nights.
                    <span className="text-red-600 font-bold"> Spin. Play. Sip. Repeat. </span>
                    Join us in reinventing the way we connect—one story, one laugh, and one sip at a time.
                </p>
            </div>

            {/* How to Play Section */}
            <section className="bg-black text-white py-16 px-6 text-center mb-12">
                <h2 className="text-4xl font-headers mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto font-body font-light">
                    A fast, fun, and unpredictable game for any party! Just shuffle, draw, and play!
                </p>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Step 1: Shuffle */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaShuffle className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-subheaders">Step 1: Shuffle</h3>
                        <p className="mt-2 opacity-80 font-body font-light">
                            Mix the deck and place it in the center.
                        </p>
                    </div>

                    {/* Step 2: Draw & Play */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaPlay className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-subheaders">Step 2: Draw & Play</h3>
                        <p className="mt-2 opacity-80 font-body font-light">
                            Each player takes turns drawing a card and following the instructions.
                        </p>
                    </div>

                    {/* Step 3: Win & Celebrate */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <FaTrophy className="text-red-600 text-5xl mb-4" />
                        <h3 className="text-2xl font-subheaders">Step 3: Win & Celebrate</h3>
                        <p className="mt-2 opacity-80 font-body font-light">
                            Complete the card challenges, outplay your friends, and embrace the chaos!
                        </p>
                    </div>
                </div>

                {/* Optional Video Embed */}
                <div className="mt-16">
                    <h3 className="text-2xl font-headers mb-6">Watch How It <span className="text-red-600">Works</span></h3>
                    <div className="relative w-full max-w-3xl mx-auto aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg"
                            src="https://www.youtube.com/watch?v=exubwWDXiXY"
                            title="Controlled Chaos Promo Video"
                            frameBorder="0"
                            referrerPolicy="no-referrer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* What's in the Box */}
            <section className="mb-16">
                <h2 className="text-4xl font-headers mb-8 text-center">What's <span className="text-red-600">Inside?</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-subheaders">150 Challenge & Strategy Cards</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-subheaders">Special Drinking Cards</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-subheaders">Wild Cards for Unpredictable Twists</span>
                    </div>
                    <div className="bg-black p-6 rounded-lg border-2 border-red-600/20 hover:border-red-600 transition-colors">
                        <span className="block font-subheaders">Easy-to-Follow Rulebook</span>
                    </div>
                </div>
            </section>

            {/* Buy Now Section */}
            <div id="buy-section" className="flex flex-col md:flex-row justify-center gap-6 mb-12">
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
