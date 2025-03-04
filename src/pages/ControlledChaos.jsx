import { FaRotate,FaPlay,FaTrophy,FaChampagneGlasses,FaRepeat } from "react-icons/fa6";
import { useEffect,useState,useRef } from 'react';
import { useLocation,Link } from 'react-router-dom';

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
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        }
    },[location]);

    useEffect(() => {
        // Initial animation for cards spreading out
        const cards = ['blue-card','purple-card','orange-card','red-card'].map(
            id => document.getElementById(id).parentElement
        );
        const spinner = document.getElementById('spinner-container');

        // Set initial styles for cards (stacked in center)
        cards.forEach(card => {
            card.style.transition = 'none';
            card.style.transform = 'translate(-50%, -50%)';
            card.style.top = '50%';
            card.style.left = '50%';
            card.style.right = 'auto';
            card.style.bottom = 'auto';
            card.style.opacity = '0'; // Start invisible
        });

        // Hide spinner initially
        if (spinner) {
            spinner.style.opacity = '0';
        }

        // Force reflow
        cards[0].offsetHeight;

        // Add transition and trigger spread animation
        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Slower, with slight overshoot
                card.style.opacity = '1'; // Fade in
            });

            // Spread cards to their positions
            cards[0].style.transform = 'translate(-50%, -50%)'; // Blue (top-left)
            cards[0].style.top = '15%';
            cards[0].style.left = '15%';

            cards[1].style.transform = 'translate(50%, -50%)'; // Purple (top-right)
            cards[1].style.top = '15%';
            cards[1].style.left = 'auto';
            cards[1].style.right = '15%';

            cards[2].style.transform = 'translate(-50%, 50%)'; // Orange (bottom-left)
            cards[2].style.top = 'auto';
            cards[2].style.bottom = '15%';
            cards[2].style.left = '15%';

            cards[3].style.transform = 'translate(50%, 50%)'; // Red (bottom-right)
            cards[3].style.top = 'auto';
            cards[3].style.bottom = '15%';
            cards[3].style.left = 'auto';
            cards[3].style.right = '15%';

            // Fade in spinner after cards spread
            setTimeout(() => {
                if (spinner) {
                    spinner.style.transition = 'opacity 1s ease-in';
                    spinner.style.opacity = '1';
                }
            },2000); // Wait for cards to spread before showing spinner
        },500);
    },[]); // This effect runs once on mount

    useEffect(() => {
        const arrow = document.getElementById('spinner-arrow');
        const purpleCard = document.getElementById('purple-card');
        const redCard = document.getElementById('red-card');
        const orangeCard = document.getElementById('orange-card');
        const blueCard = document.getElementById('blue-card');
        let isAnimating = true;

        // Define the color sequence with default and glowing classes
        const colorSequence = [
            { 
                degree: 135,
                card: purpleCard,
                name: 'purple',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]"
            },
            { 
                degree: 225,
                card: redCard,
                name: 'red',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            },
            { 
                degree: 315,
                card: orangeCard,
                name: 'orange',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            },
            { 
                degree: 45,
                card: blueCard,
                name: 'blue',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            }
        ];

        let currentIndex = 0;

        const animateSpinSequence = async () => {
            while (isAnimating) {
                // Reset all cards (remove glow and flip)
                colorSequence.forEach(config => {
                    config.card.style.transform = '';
                    const frontImage = config.card.querySelector('img:first-child');
                    const backImage = config.card.querySelector('img:last-child');
                    frontImage.className = config.defaultClass;
                    backImage.className = config.defaultClass + ' rotate-y-180';
                });

                // Get current color in sequence
                const currentColor = colorSequence[currentIndex];

                // Reset arrow position
                arrow.style.transition = 'none';
                arrow.style.transform = 'rotate(0deg)';
                arrow.offsetHeight;

                // Spin to selected color
                arrow.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)';
                const totalRotation = 720 + currentColor.degree;
                arrow.style.transform = `rotate(${totalRotation}deg)`;

                // Wait for spin to complete
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Add glow and flip selected card
                const frontImage = currentColor.card.querySelector('img:first-child');
                const backImage = currentColor.card.querySelector('img:last-child');
                frontImage.className = currentColor.glowClass;
                backImage.className = currentColor.glowClass + ' rotate-y-180';
                currentColor.card.style.transform = 'rotateY(180deg)';

                // Wait while card is shown
                await new Promise(resolve => setTimeout(resolve, 6000));

                // Remove glow and unflip card
                frontImage.className = currentColor.defaultClass;
                backImage.className = currentColor.defaultClass + ' rotate-y-180';
                currentColor.card.style.transform = '';

                // Move to next color
                currentIndex = (currentIndex + 1) % colorSequence.length;

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
                    className="max-w-[600px] mx-auto mb-24"
                />
            </h1>

            {/* What's in the Box */}
            <section className="mb-24">
                <div className="flex justify-center items-center">
                    <div className="relative w-[700px] h-[700px] flex items-center justify-center">
                        {/* Top Left Card (Blue) */}
                        <div className="absolute pointer-events-none w-72 h-72 perspective-1000">
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d" id="blue-card">
                                <img
                                    src="/card-back-1.png"
                                    alt="Blue Card Front"
                                    className="absolute backface-hidden max-w-full max-h-full m-auto inset-0"
                                />
                                <img
                                    src="/blue_card_rules.png"
                                    alt="Blue Card Back"
                                    className="absolute backface-hidden rotate-y-180 max-w-full max-h-full m-auto inset-0"
                                />
                            </div>
                        </div>

                        {/* Top Right Card (Purple) */}
                        <div className="absolute pointer-events-none w-72 h-72 perspective-1000">
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d" id="purple-card">
                                <img
                                    src="/card-back-4.png"
                                    alt="Purple Card Front"
                                    className="absolute backface-hidden max-w-full max-h-full m-auto inset-0"
                                />
                                <img
                                    src="/purple_card_rules.png"
                                    alt="Purple Card Back"
                                    className="absolute backface-hidden rotate-y-180 max-w-full max-h-full m-auto inset-0"
                                />
                            </div>
                        </div>

                        {/* Bottom Left Card (Orange) */}
                        <div className="absolute pointer-events-none w-72 h-72 perspective-1000">
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d" id="orange-card">
                                <img
                                    src="/card-back-2.png"
                                    alt="Orange Card Front"
                                    className="absolute backface-hidden max-w-full max-h-full m-auto inset-0"
                                />
                                <img
                                    src="/orange_card_rules.png"
                                    alt="Orange Card Back"
                                    className="absolute backface-hidden rotate-y-180 max-w-full max-h-full m-auto inset-0"
                                />
                            </div>
                        </div>

                        {/* Bottom Right Card (Red) */}
                        <div className="absolute pointer-events-none w-72 h-72 perspective-1000">
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d" id="red-card">
                                <img
                                    src="/card-back-3.png"
                                    alt="Red Card Front"
                                    className="absolute backface-hidden max-w-full max-h-full m-auto inset-0"
                                />
                                <img
                                    src="/red_card_rules.png"
                                    alt="Red Card Back"
                                    className="absolute backface-hidden rotate-y-180 max-w-full max-h-full m-auto inset-0"
                                />
                            </div>
                        </div>

                        {/* Center Spinner - Add id and initial opacity-0 */}
                        <div id="spinner-container" className="relative w-80 h-80">
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
