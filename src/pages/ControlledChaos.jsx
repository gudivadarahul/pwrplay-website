import { FaRotate,FaPlay,FaTrophy,FaChampagneGlasses,FaRepeat,FaArrowRight,FaArrowDown,FaDice,FaEnvelope } from "react-icons/fa6";
import { BsArrowDownRight } from "react-icons/bs";
import { useEffect,useState,useRef } from 'react';
import { useLocation,Link } from 'react-router-dom';
import API_URL from '../config/api'; // Add this import for the API URL

function ControlledChaos() {
    const location = useLocation();
    const [showPopup,setShowPopup] = useState(false);
    const [activeBox,setActiveBox] = useState(0); // Track which box is currently active
    const [emailSubmitted,setEmailSubmitted] = useState(false); // New state for tracking email submission
    const [email,setEmail] = useState(''); // New state for email input
    const [loading,setLoading] = useState(false); // Add loading state
    const [message,setMessage] = useState(''); // Add message state for errors

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
            // Position cards at a balanced distance - 15% for mobile
            const positionValue = isMobile ? '10%' : '15%';

            // Adjust vertical offset based on screen size - 35% for mobile
            const verticalOffset = isMobile ? '40%' : '50%';

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
                await new Promise(resolve => setTimeout(resolve,3000));

                // Add glow and flip selected card
                const frontImage = currentColor.card.querySelector('img:first-child');
                const backImage = currentColor.card.querySelector('img:last-child');
                frontImage.className = currentColor.glowClass;
                backImage.className = currentColor.glowClass + ' rotate-y-180';
                currentColor.card.style.transform = 'rotateY(180deg)';

                // Wait while card is shown
                await new Promise(resolve => setTimeout(resolve,6000));

                // Remove glow and unflip card
                frontImage.className = currentColor.defaultClass;
                backImage.className = currentColor.defaultClass + ' rotate-y-180';
                currentColor.card.style.transform = '';

                // Move to next color
                currentIndex = (currentIndex + 1) % colorSequence.length;

                // Pause before next sequence
                await new Promise(resolve => setTimeout(resolve,1000));
            }
        };

        animateSpinSequence();

        return () => {
            isAnimating = false;
        };
    },[]);

    // Add new useEffect for box border animation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBox(prev => (prev + 1) % 4); // Cycle through 0-3
        },2000); // Change every 2 seconds

        return () => clearInterval(interval);
    },[]);

    // Function to handle email submission
    const handleNotifySubmit = async () => {
        // Basic email validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/mailchimp`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'subscribe',
                    data: { email }
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Show success state
                setEmailSubmitted(true);
                setShowPopup(false); // Hide the popup when showing the confirmation
                setEmail(''); // Reset email field
            } else {
                // Show error message
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 sm:pt-40 text-white min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[30]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
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
                        <div className="absolute pointer-events-none w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div className="absolute pointer-events-none w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 perspective-1000">
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
                        <div id="spinner-container" className="relative w-36 h-36 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
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

            {/* Buy Now Button - Moved above How to Play */}
            <div className="flex justify-center mb-8 sm:mb-12" id="buy-section">
                <Link
                    to="/buy"
                    className="inline-block border-2 border-red-600 bg-black text-white 
                    px-6 sm:px-8 md:px-10 
                    py-3 sm:py-4 md:py-5 
                    rounded-lg lg:rounded-xl
                    text-xl sm:text-2xl md:text-3xl
                    font-subheaders font-bold 
                    shadow-lg transform hover:scale-105 transition-all duration-300 
                    hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl glow-effect"
                >
                    BUY NOW
                </Link>
            </div>

            {/* How to Play Section */}
            <section className="bg-black text-white py-6 sm:py-8 px-4 sm:px-6 text-center mb-8 sm:mb-12">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-headers mb-4 sm:mb-6">How to <span className="text-red-600">Play</span></h2>
                <p className="text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto font-body font-medium">
                    Just shuffle, draw, and let the chaos unfold!
                </p>

                {/* Steps in a horizontal row */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Horizontal layout for both mobile and desktop */}
                    <div className="flex flex-row justify-center items-center gap-3 md:gap-8 mt-12">
                        {/* Step 1: Spin */}
                        <div className={`bg-black aspect-square rounded-lg shadow-lg flex flex-col items-center justify-center ${activeBox === 0 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-20 md:w-40`}>
                            <FaRotate className={`${activeBox === 0 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl md:text-5xl mb-1 md:mb-2`} />
                            <h3 className="text-sm md:text-3xl font-subheaders text-white">SPIN</h3>
                        </div>

                        {/* Step 2: Play */}
                        <div className={`bg-black aspect-square rounded-lg shadow-lg flex flex-col items-center justify-center ${activeBox === 1 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-20 md:w-40`}>
                            <FaPlay className={`${activeBox === 1 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl md:text-5xl mb-1 md:mb-2`} />
                            <h3 className="text-sm md:text-3xl font-subheaders text-white">PLAY</h3>
                        </div>

                        {/* Step 3: Sip */}
                        <div className={`bg-black aspect-square rounded-lg shadow-lg flex flex-col items-center justify-center ${activeBox === 2 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-20 md:w-40`}>
                            <FaChampagneGlasses className={`${activeBox === 2 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl md:text-5xl mb-1 md:mb-2`} />
                            <h3 className="text-sm md:text-3xl font-subheaders text-white">SIP</h3>
                        </div>

                        {/* Step 4: Repeat */}
                        <div className={`bg-black aspect-square rounded-lg shadow-lg flex flex-col items-center justify-center ${activeBox === 3 ? 'border-red-600 border-[3px] shadow-[0_0_50px_15px_rgba(255,0,0,1.0),0_0_20px_5px_rgba(255,0,0,0.8)_inset] saturate-150 scale-105 transition-all duration-500' : 'border-white border-2'} w-20 md:w-40`}>
                            <FaRepeat className={`${activeBox === 3 ? 'text-red-500 drop-shadow-[0_0_8px_#ff0000]' : 'text-red-600'} text-2xl md:text-5xl mb-1 md:mb-2`} />
                            <h3 className="text-sm md:text-3xl font-subheaders text-white">REPEAT</h3>
                        </div>
                    </div>
                </div>

                {/* Optional Video Embed - Reduced top margin on mobile */}
                <div className="mt-8 md:mt-40">
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
        </div>
    );
}

export default ControlledChaos;
