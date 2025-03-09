import { useState,useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        text: "I loved the hitlist deck because it involves everyone in the game! Controlled Chaos is a fun and lighthearted game to play with your friends that is simple and engaging.",
        author: "J.K."
    },
    {
        text: "Controlled Chaos is one of the most fun party games I've played. I haven't laughed that hard playing any other party game- I seriously can't recommend it enough!",
        author: "V.S."
    },
    {
        text: "It was so fun getting to talk about topics that friends usually forget to talk about and the endless laughs that ensue are so fun.",
        author: "C.S."
    },
    {
        text: "The only time I've ever wanted more chaos in my life.",
        author: "S.C."
    },
    {
        text: "We spent hours laughing at every card, telling each other hilarious stories from our pasts, and trying to defend ourselves from getting those icks!!",
        author: "A.S."
    },
    {
        text: "It's perfect to play with friends you've known for years or as an icebreaker with a new group. If you want a game that'll have you ugly laughing!",
        author: "S.P."
    },
    {
        text: "I liked how much the social barrier was just absolutely destroyed within two rounds of playing, and that we just played for hours on end without realizing.",
        author: "S.G."
    },
    {
        text: "Playing Controlled Chaos was an absolute blast! The fast-paced, creative challenges, and unexpected surprises made the game fun to play!",
        author: "A.S."
    },
    {
        text: "My favorite part was when we stick-an-ick'd one of our friends a few times in a row. You never know what's gonna happen when the Chaos starts!",
        author: "K.G."
    },
    {
        text: "This game has been one of the most fun ones I've ever played! The prompts are unique and the stick an Ick questions were my personal favorite!",
        author: "R.S."
    },
    {
        text: "Chaos is the ultimate party game! It gets everyone involved, keeps the energy high, and guarantees nonstop laughter. The Outlast deck was my favorite!",
        author: "R.S."
    },
    {
        text: "Had a great time playing Controlled Chaos with my group. Definitely an interactive game that plays into inside jokes. Love the idea of stick an ick!",
        author: "K.S."
    }
];

// Add this at the top level, outside of any component
const usedIndices = new Set();

function TestimonialCard({ index }) { 
    const [currentIndex, setCurrentIndex] = useState(index);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [animationState, setAnimationState] = useState('idle'); // 'idle', 'exiting-left', 'exiting-right'
    const [nextIndex, setNextIndex] = useState(null);
    const [nextCardDirection, setNextCardDirection] = useState('right'); // 'left' or 'right'

    const minSwipeDistance = 50;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    const onTouchStart = (e) => {
        if (animationState !== 'idle') return;
        e.preventDefault();
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
        setIsDragging(true);
        setDragOffset(0);
    };

    const onTouchMove = (e) => {
        if (animationState !== 'idle' || !isDragging) return;
        e.preventDefault();
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart) {
            const offset = e.targetTouches[0].clientX - touchStart;
            setDragOffset(offset);
        }
    };

    const onTouchEnd = () => {
        if (animationState !== 'idle' || !isDragging) return;
        
        if (!touchStart || !touchEnd) {
            setIsDragging(false);
            setDragOffset(0);
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            // Calculate next index
            const next = (currentIndex + 1) % testimonials.length;
            setNextIndex(next);
            setNextCardDirection('right');
            
            // Start exit animation
            setAnimationState('exiting-left');
            
            // After exit animation completes, prepare for entry animation
            setTimeout(() => {
                setCurrentIndex(next);
                setDragOffset(0);
                setAnimationState('idle');
                setNextIndex(null);
            }, 300);
        } else if (isRightSwipe) {
            // Calculate previous index
            const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
            setNextIndex(prev);
            setNextCardDirection('left');
            
            // Start exit animation
            setAnimationState('exiting-right');
            
            // After exit animation completes, prepare for entry animation
            setTimeout(() => {
                setCurrentIndex(prev);
                setDragOffset(0);
                setAnimationState('idle');
                setNextIndex(null);
            }, 300);
        } else {
            // Return to center if not swiped far enough
            setDragOffset(0);
        }
        
        setIsDragging(false);
    };

    const handlePrevClick = () => {
        if (animationState !== 'idle') return;
        
        // Calculate previous index
        const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
        setNextIndex(prev);
        
        // Start exit animation - always exit to the left
        setAnimationState('exiting-left');
        
        // After exit animation completes, prepare for entry animation
        setTimeout(() => {
            setCurrentIndex(prev);
            setDragOffset(0);
            setAnimationState('idle');
            setNextIndex(null);
        }, 300);
    };

    const handleNextClick = () => {
        if (animationState !== 'idle') return;
        
        // Calculate next index
        const next = (currentIndex + 1) % testimonials.length;
        setNextIndex(next);
        
        // Start exit animation - exit to the right for next button
        setAnimationState('exiting-right');
        
        // After exit animation completes, prepare for entry animation
        setTimeout(() => {
            setCurrentIndex(next);
            setDragOffset(0);
            setAnimationState('idle');
            setNextIndex(null);
        }, 300);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full h-[400px] relative overflow-hidden">
                <style jsx>{`
                    @keyframes slideOutToLeft {
                        from { transform: translateX(0); }
                        to { transform: translateX(-100%); }
                    }
                    
                    @keyframes slideInFromRight {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                    
                    @keyframes slideOutToRight {
                        from { transform: translateX(0); }
                        to { transform: translateX(100%); }
                    }
                    
                    @keyframes slideInFromLeft {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0); }
                    }
                    
                    .current-card {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        z-index: 1;
                    }
                    
                    .current-card.exiting-left {
                        animation: slideOutToLeft 0.3s forwards;
                    }
                    
                    .current-card.exiting-right {
                        animation: slideOutToRight 0.3s forwards;
                    }
                    
                    .next-card-right {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        transform: translateX(100%);
                        z-index: 0;
                    }
                    
                    .next-card-right.entering {
                        animation: slideInFromRight 0.3s forwards;
                    }
                    
                    .next-card-left {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        transform: translateX(-100%);
                        z-index: 0;
                    }
                    
                    .next-card-left.entering {
                        animation: slideInFromLeft 0.3s forwards;
                    }
                `}</style>
                
                {/* Current card */}
                <div 
                    className={`current-card ${
                        animationState === 'exiting-left' 
                            ? 'exiting-left' 
                            : animationState === 'exiting-right' 
                                ? 'exiting-right' 
                                : ''
                    }`}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="bg-black text-white p-6 rounded-xl h-full flex flex-col mx-4">
                        <FaQuoteLeft className="text-red-600 text-3xl mb-4 flex-shrink-0" />
                        <p className="text-lg mb-4 flex-grow leading-relaxed font-medium">
                            {testimonials[currentIndex].text}
                        </p>
                        <hr className="border-red-600 border-t-2 mb-4" />
                        <div>
                            <p className="font-bold text-xl text-red-600">
                                {testimonials[currentIndex].author}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Next card from right */}
                {nextIndex !== null && animationState === 'exiting-left' && (
                    <div className="next-card-right entering">
                        <div className="bg-black text-white p-6 rounded-xl h-full flex flex-col mx-4">
                            <FaQuoteLeft className="text-red-600 text-3xl mb-4 flex-shrink-0" />
                            <p className="text-lg mb-4 flex-grow leading-relaxed font-medium">
                                {testimonials[nextIndex].text}
                            </p>
                            <hr className="border-red-600 border-t-2 mb-4" />
                            <div>
                                <p className="font-bold text-xl text-red-600">
                                    {testimonials[nextIndex].author}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Next card from left */}
                {nextIndex !== null && animationState === 'exiting-right' && (
                    <div className="next-card-left entering">
                        <div className="bg-black text-white p-6 rounded-xl h-full flex flex-col mx-4">
                            <FaQuoteLeft className="text-red-600 text-3xl mb-4 flex-shrink-0" />
                            <p className="text-lg mb-4 flex-grow leading-relaxed font-medium">
                                {testimonials[nextIndex].text}
                            </p>
                            <hr className="border-red-600 border-t-2 mb-4" />
                            <div>
                                <p className="font-bold text-xl text-red-600">
                                    {testimonials[nextIndex].author}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Left arrow - outside the card on white background */}
                <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-red-600 text-3xl font-bold cursor-pointer z-10 bg-white bg-opacity-70 p-2 rounded-r-lg"
                    onClick={handlePrevClick}
                >
                    &#10094;
                </div>
                
                {/* Right arrow - outside the card on white background */}
                <div 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-600 text-3xl font-bold cursor-pointer z-10 bg-white bg-opacity-70 p-2 rounded-l-lg"
                    onClick={handleNextClick}
                >
                    &#10095;
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm h-full py-4">
            <div className="bg-black text-white p-6 rounded-xl h-full min-h-[300px] flex flex-col">
                <FaQuoteLeft className="text-red-600 text-3xl mb-4 flex-shrink-0" />
                <p className="text-lg mb-4 flex-grow leading-relaxed font-medium">
                    {testimonials[index].text}
                </p>
                <hr className="border-red-600 border-t-2 mb-4" />
                <div>
                    <p className="font-bold text-xl text-red-600">
                        {testimonials[index].author}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Testimonials() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative bg-white text-black py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8">
                    The Reviews Are In — <span className="text-red-600">Players Love It!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 overflow-hidden">
                    {isMobile ? (
                        <TestimonialCard key="mobile-card" index={0} />
                    ) : (
                        [0, 1, 2].map((index) => (
                            <TestimonialCard
                                key={`card-${index}`}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Testimonials; 