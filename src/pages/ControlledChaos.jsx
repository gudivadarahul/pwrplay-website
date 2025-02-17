import { FaRotate,FaPlay,FaTrophy,FaChampagneGlasses,FaRepeat } from "react-icons/fa6";
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
        <div className="pt-40 text-white min-h-screen bg-black">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-headers mb-6 text-center fade-in px-8">
                <img
                    src="/cc_logo.png"
                    alt="Controlled Chaos™"
                    className="max-w-[500px] mx-auto transition-transform duration-300 drop-shadow-[0_0_25px_rgba(239,68,68,1.0)]"
                />
            </h1>

            {/* Main Description */}
            <section className="w-full bg-black py-16 mb-6">
                <div className="max-w-6xl mx-auto space-y-8 px-8 border-5 border-red-600 rounded-lg p-8">
                    <p className="text-xl text-center leading-relaxed slide-up font-body text-white font-medium">
                        Tired of the same old games with predictable cards and outcomes? <span className="font-bold text-red-600">So are we!</span> That's why we created <span className="whitespace-nowrap font-bold text-red-600">Controlled Chaos™</span>—a party game that
                        guarantees fresh excitement with unpredictable gameplay, endless surprises, and unforgettable moments.
                    </p>

                    <p className="text-xl text-center leading-relaxed slide-up font-body text-white font-medium">
                        <span className="whitespace-nowrap font-bold text-red-600">Controlled Chaos™</span> is more than just laughs and challenges.
                        It's about forging connections, sharing stories, and
                        discovering unexpected sides of your friends. Each spin leads to exciting moments, sparking the
                        kind of fun that makes game night the highlight of the week.
                    </p>

                    <p className="text-xl text-center leading-relaxed font-body text-white font-medium">
                        Say goodbye to boring game nights.{' '}
                        <span className="font-bold whitespace-nowrap text-red-600">Spin. Play. Sip. Repeat.</span>{' '}
                        Join us in reinventing the way we connect - one story, one laugh, and one sip at a time.
                    </p>
                </div>
            </section>

            {/* How to Play Section */}
            <section className="bg-black text-white py-8 px-6 text-center mb-12">
                <h2 className="text-8xl font-headers mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-2xl mb-12 max-w-2xl mx-auto font-body font-medium">
                    The ultimate party game - fast, fun, and full of twists!
                </p>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {/* Step 1: Spin */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-5 border-red-600">
                        <FaRotate className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">SPIN</h3>
                    </div>

                    {/* Step 2: Draw & Play */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-5 border-red-600">
                        <FaPlay className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">PLAY</h3>
                    </div>

                    {/* Step 3: Follow Instructions */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-5 border-red-600">
                        <FaChampagneGlasses className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">SIP</h3>
                    </div>

                    {/* Step 4: Win & Celebrate */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-5 border-red-600">
                        <FaRepeat className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">REPEAT</h3>
                    </div>
                </div>

                {/* Optional Video Embed */}
                <div className="mt-16">
                    <h3 className="text-6xl font-headers mb-6">Watch How It <span className="text-red-600">Works</span></h3>
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
                <h2 className="text-6xl font-headers mb-8 text-center">What's <span className="text-red-600">Inside?</span></h2>
                <div className="flex justify-center items-center">
                    <div className="relative w-64 h-64">
                        <img
                            src="/spinner_wo_arrow.png"
                            alt="Game Spinner Base"
                            className="w-full h-full object-contain"
                        />
                        <img
                            src="/arrow.png"
                            alt="Spinner Arrow"
                            className="absolute top-0 left-0 w-full h-full object-contain origin-center spin-arrow"
                        />
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
