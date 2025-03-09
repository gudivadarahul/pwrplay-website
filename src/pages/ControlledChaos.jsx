import { FaRotate,FaPlay,FaTrophy,FaChampagneGlasses,FaRepeat, FaArrowRight, FaArrowDown, FaDice } from "react-icons/fa6";
import { BsArrowDownRight } from "react-icons/bs";
import { useEffect,useState,useRef } from 'react';
import { useLocation,Link } from 'react-router-dom';

function ControlledChaos() {
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);
    const [activeBox, setActiveBox] = useState(0); // Track which box is currently active

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

            // Get viewport width to adjust card positioning
            const isMobile = window.innerWidth < 768;
            // Position cards closer to spinner on mobile
            const positionValue = isMobile ? '10%' : '15%';
            
            // Adjust vertical offset based on screen size - reduced from 55% to 52%
            const verticalOffset = isMobile ? '52%' : '50%';
            
            // Spread cards to their positions with adjusted vertical position
            cards[0].style.transform = `translate(-50%, -${verticalOffset})`; // Blue (top-left)
            cards[0].style.top = positionValue;
            cards[0].style.left = positionValue;

            cards[1].style.transform = `translate(50%, -${verticalOffset})`; // Purple (top-right)
            cards[1].style.top = positionValue;
            cards[1].style.left = 'auto';
            cards[1].style.right = positionValue;

            cards[2].style.transform = `translate(-50%, ${verticalOffset})`; // Orange (bottom-left)
            cards[2].style.top = 'auto';
            cards[2].style.bottom = positionValue;
            cards[2].style.left = positionValue;

            cards[3].style.transform = `translate(50%, ${verticalOffset})`; // Red (bottom-right)
            cards[3].style.top = 'auto';
            cards[3].style.bottom = positionValue;
            cards[3].style.left = 'auto';
            cards[3].style.right = positionValue;

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
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_30px_rgba(168,85,247,1.0)] brightness-110 saturate-150"
            },
            { 
                degree: 225,
                card: redCard,
                name: 'red',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_30px_rgba(239,68,68,1.0)] brightness-110 saturate-150"
            },
            { 
                degree: 315,
                card: orangeCard,
                name: 'orange',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_30px_rgba(249,115,22,1.0)] brightness-110 saturate-150"
            },
            { 
                degree: 45,
                card: blueCard,
                name: 'blue',
                defaultClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0",
                glowClass: "absolute backface-hidden max-w-full max-h-full m-auto inset-0 drop-shadow-[0_0_30px_rgba(59,130,246,1.0)] brightness-110 saturate-150"
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

    // Add new useEffect for box border animation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBox(prev => (prev + 1) % 4); // Cycle through 0-3
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-24 sm:pt-40 text-white min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-headers text-center fade-in px-4 sm:px-8">
                <img
                    src="/cc_logo.png"
                    alt="Controlled Chaos™"
                    className="max-w-[85%] sm:max-w-[500px] mx-auto mb-12 sm:mb-24"
                />
            </h1>

            {/* What's in the Box - Reduced padding-top */}
            <section className="pt-8 sm:pt-10 md:pt-12 mb-16 sm:mb-24">
                <div className="flex justify-center items-center">
                    <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] flex items-center justify-center">
                        {/* Top Left Card (Blue) */}
                        <div className="absolute pointer-events-none w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div id="spinner-container" className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
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
            <section className="bg-black text-white py-6 sm:py-8 px-4 sm:px-6 text-center mb-8 sm:mb-12">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-headers mb-4 sm:mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto font-body font-medium">
                    Just shuffle, draw, and let the chaos unfold!
                </p>

                {/* Steps in a circular pattern */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Mobile view - circular arrangement */}
                    <div className="md:hidden relative mx-auto" style={{ width: '280px', height: '280px' }}>
                        {/* Curved lines - positioned BEFORE boxes so they appear behind */}
                        <img 
                            src="/curved_line.png" 
                            alt="Curved Line" 
                            className="absolute top-[5%] right-[5%] w-[100px] h-auto transform z-0"
                        />
                        <img 
                            src="/curved_line.png" 
                            alt="Curved Line" 
                            className="absolute bottom-[5%] right-[5%] w-[100px] h-auto transform rotate-[90deg] z-0"
                        />
                        <img 
                            src="/curved_line.png" 
                            alt="Curved Line" 
                            className="absolute bottom-[5%] left-[5%] w-[100px] h-auto transform rotate-[180deg] z-0"
                        />
                        <img 
                            src="/curved_line.png" 
                            alt="Curved Line" 
                            className="absolute top-[5%] left-[5%] w-[100px] h-auto transform rotate-[270deg] z-0"
                        />
                        
                        {/* Step 1: Spin (Top) - Adjusted position to be lower */}
                        <div className={`absolute top-[-7%] left-1/2 transform -translate-x-1/2 bg-black p-2 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 0 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} z-10`} style={{ width: '80px', height: '80px' }}>
                            <FaRotate className={`${activeBox === 0 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl mb-1`} />
                            <h3 className="text-xl font-subheaders text-white">SPIN</h3>
                        </div>
                        
                        {/* Step 2: Play (Right) */}
                        <div className={`absolute top-1/2 right-[2%] transform translate-x-1/3 -translate-y-1/2 bg-black p-2 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 1 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} z-10`} style={{ width: '80px', height: '80px' }}>
                            <FaPlay className={`${activeBox === 1 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl mb-1`} />
                            <h3 className="text-xl font-subheaders text-white">PLAY</h3>
                        </div>
                        
                        {/* Step 3: Sip (Bottom) */}
                        <div className={`absolute bottom-[2%] left-1/2 transform -translate-x-1/2 translate-y-1/3 bg-black p-2 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 2 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} z-10`} style={{ width: '80px', height: '80px' }}>
                            <FaChampagneGlasses className={`${activeBox === 2 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl mb-1`} />
                            <h3 className="text-xl font-subheaders text-white">SIP</h3>
                        </div>
                        
                        {/* Step 4: Repeat (Left) */}
                        <div className={`absolute top-1/2 left-[2%] transform -translate-x-1/3 -translate-y-1/2 bg-black p-2 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 3 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} z-10`} style={{ width: '80px', height: '80px' }}>
                            <FaRepeat className={`${activeBox === 3 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl mb-1`} />
                            <h3 className="text-xl font-subheaders text-white">REPEAT</h3>
                        </div>
                    </div>

                    {/* Desktop view - horizontal layout - Also adjusted the first box position */}
                    <div className="hidden md:flex justify-center items-center gap-8 mt-12">
                        {/* Step 1: Spin - Added margin-top to move it down slightly */}
                        <div className={`bg-black p-6 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 0 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-44 h-44 mt-4`}>
                            <FaRotate className={`${activeBox === 0 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-5xl mb-3`} />
                            <h3 className="text-4xl font-subheaders text-white">SPIN</h3>
                        </div>
                        
                        {/* Step 2: Play */}
                        <div className={`bg-black p-6 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 1 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-44 h-44`}>
                            <FaPlay className={`${activeBox === 1 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-5xl mb-3`} />
                            <h3 className="text-4xl font-subheaders text-white">PLAY</h3>
                        </div>
                        
                        {/* Step 3: Sip */}
                        <div className={`bg-black p-6 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 2 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-44 h-44`}>
                            <FaChampagneGlasses className={`${activeBox === 2 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-5xl mb-3`} />
                            <h3 className="text-4xl font-subheaders text-white">SIP</h3>
                        </div>
                        
                        {/* Step 4: Repeat */}
                        <div className={`bg-black p-6 rounded-lg shadow-lg flex flex-col items-center ${activeBox === 3 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-44 h-44`}>
                            <FaRepeat className={`${activeBox === 3 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-5xl mb-3`} />
                            <h3 className="text-4xl font-subheaders text-white">REPEAT</h3>
                        </div>
                    </div>
                </div>

                {/* Optional Video Embed */}
                <div className="mt-16 md:mt-40">
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
            <div id="buy-section" className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 mb-12 px-4">
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-red-600 text-white px-4 py-2 md:px-8 md:py-4 rounded-lg text-sm md:text-lg font-bold text-center
                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300 max-w-[250px] md:max-w-none mx-auto md:mx-0 w-full"
                >
                    Buy Now (Amazon U.S.)
                </button>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-red-600 text-white px-4 py-2 md:px-8 md:py-4 rounded-lg text-sm md:text-lg font-bold text-center
                    hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300 max-w-[250px] md:max-w-none mx-auto md:mx-0 w-full"
                >
                    Buy Now (Amazon Canada)
                </button>
            </div>

            {/* Coming Soon Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm transition-all duration-300">
                    <div 
                        className="bg-black border-2 border-red-600 rounded-lg p-6 md:p-8 max-w-md w-full mx-4 
                        shadow-lg shadow-red-500/30 animate-fade-in"
                    >
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-headers text-white mb-2">COMING SOON</h3>
                            <div className="w-16 h-1 bg-red-600 mx-auto mb-4"></div>
                            
                            <p className="text-lg md:text-xl font-subheaders text-white mb-6">
                                Controlled Chaos will be available for purchase soon! 
                            </p>
                            
                            {/* Notify Me Button */}
                            <button 
                                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-bold
                                hover:bg-red-700 transition-all duration-300 mb-4 w-full md:w-auto"
                                onClick={() => {
                                    setShowPopup(false);
                                    // You could add email collection logic here
                                }}
                            >
                                Notify Me on Release
                            </button>
                            
                            {/* Close Button - Improved styling */}
                            <button 
                                className="mt-4 px-4 py-2 border border-white/30 rounded-md text-white/80 
                                hover:text-white hover:border-red-600 transition-all duration-300 
                                font-subheaders text-sm uppercase tracking-wider"
                                onClick={() => setShowPopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ControlledChaos;
