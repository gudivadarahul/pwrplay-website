import { FaRotate,FaPlay,FaTrophy,FaChampagneGlasses,FaRepeat } from "react-icons/fa6";
import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

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

    useEffect(() => {
        const arrow = document.getElementById('spinner-arrow');
        const purpleCard = document.getElementById('purple-card');
        const redCard = document.getElementById('red-card');
        const orangeCard = document.getElementById('orange-card');
        const blueCard = document.getElementById('blue-card');
        let isAnimating = true;

        // Define the color configurations
        const colorConfigs = [
            { degree: 135, card: purpleCard, name: 'purple' },
            { degree: 225, card: redCard, name: 'red' },
            { degree: 315, card: orangeCard, name: 'orange' },
            { degree: 45, card: blueCard, name: 'blue' }
        ];

        const animateSpinSequence = async () => {
            while (isAnimating) {
                // Reset all cards
                colorConfigs.forEach(config => {
                    config.card.style.transform = '';
                });

                // Randomly select a color
                const randomColor = colorConfigs[Math.floor(Math.random() * colorConfigs.length)];

                // Reset arrow position to 0 before starting new spin
                arrow.style.transition = 'none';
                arrow.style.transform = 'rotate(0deg)';
                arrow.offsetHeight;

                // Spin to selected color
                arrow.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)';
                const totalRotation = 720 + randomColor.degree; // Two full rotations plus landing degree
                arrow.style.transform = `rotate(${totalRotation}deg)`;

                // Wait for spin to complete
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Flip selected card
                randomColor.card.style.transform = 'rotateY(180deg)';

                // Wait while card is shown
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Unflip card
                randomColor.card.style.transform = '';

                // Pause before next sequence
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        };

        animateSpinSequence();

        return () => {
            isAnimating = false;
        };
    }, []);

    return (
        <div className="pt-40 text-white min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-headers text-center fade-in px-8">
                <img
                    src="/cc_logo.png"
                    alt="Controlled Chaos™"
                    className="max-w-[800px] mx-auto mb-64"
                />
            </h1>

            {/* What's in the Box */}
            <section className="mb-16">
                <div className="flex justify-center items-center">
                    <div className="relative w-[800px] h-[800px] flex items-center justify-center">
                        {/* Top Left Card (Blue) */}
                        <div className="absolute top-[15%] left-[15%] w-80 h-80 transform -translate-x-1/2 -translate-y-1/2">
                            <img
                                src="/card-back-1.png"
                                alt="Blue Card"
                                className="w-full h-full object-contain transition-transform duration-500"
                                id="blue-card"
                            />
                        </div>
                        
                        {/* Top Right Card (Purple) */}
                        <div className="absolute top-[15%] right-[15%] w-80 h-80 transform translate-x-1/2 -translate-y-1/2">
                            <img
                                src="/card-back-4.png"
                                alt="Purple Card"
                                className="w-full h-full object-contain transition-transform duration-500"
                                id="purple-card"
                            />
                        </div>
                        
                        {/* Bottom Left Card (Orange) */}
                        <div className="absolute bottom-[15%] left-[15%] w-80 h-80 transform -translate-x-1/2 translate-y-1/2">
                            <img
                                src="/card-back-2.png"
                                alt="Orange Card"
                                className="w-full h-full object-contain transition-transform duration-500"
                                id="orange-card"
                            />
                        </div>
                        
                        {/* Bottom Right Card (Red) */}
                        <div className="absolute bottom-[15%] right-[15%] w-80 h-80 transform translate-x-1/2 translate-y-1/2">
                            <img
                                src="/card-back-3.png"
                                alt="Red Card"
                                className="w-full h-full object-contain transition-transform duration-500"
                                id="red-card"
                            />
                        </div>
                        
                        {/* Center Spinner */}
                        <div className="relative w-96 h-96">
                            <img
                                src="/spinner_wo_arrow.png"
                                alt="Game Spinner Base"
                                className="w-full h-full object-contain"
                            />
                            <img
                                src="/arrow.png"
                                alt="Spinner Arrow"
                                className="absolute top-0 left-0 w-full h-full object-contain origin-center"
                                id="spinner-arrow"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* How to Play Section */}
            <section className="bg-black text-white py-8 px-6 text-center mb-12">
                <h2 className="text-8xl font-headers mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-2xl mb-12 max-w-2xl mx-auto font-body font-medium">
                    Just shuffle, draw, and let the chaos unfold!
                </p>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {/* Step 1: Spin */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-3 border-white">
                        <FaRotate className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">SPIN</h3>
                    </div>

                    {/* Step 2: Draw & Play */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-3 border-white">
                        <FaPlay className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">PLAY</h3>
                    </div>

                    {/* Step 3: Follow Instructions */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-3 border-white">
                        <FaChampagneGlasses className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">SIP</h3>
                    </div>

                    {/* Step 4: Win & Celebrate */}
                    <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center border-3 border-white">
                        <FaRepeat className="text-red-600 text-6xl mb-4" />
                        <h3 className="text-5xl font-subheaders">REPEAT</h3>
                    </div>
                </div>

                {/* Optional Video Embed */}
                <div className="mt-16">
                    <div className="relative w-full max-w-3xl mx-auto aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg"
                            src="https://www.youtube.com/embed/RbkMqOEyfOE"
                            title="Controlled Chaos Promo Video"
                            frameBorder="0"
                            referrerPolicy="no-referrer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
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
