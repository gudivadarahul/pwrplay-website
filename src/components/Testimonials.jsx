import { useState,useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        text: "I loved the hitlist deck because it involves everyone in the game! Controlled Chaos is a fun and lighthearted game to play with your friends that is simple and engagin",
        author: "J.K."
    },
    {
        text: "Controlled Chaos is one of the most fun party games I've played. I haven't laughed that hard playing any other party game- I seriously can't recommend it enough!",
        author: "V.S."
    },
    {
        text: " It was so fun getting to talk about topics that friends usually forget to talk about and the endless laughs that ensue are so fun.",
        author: "C.S."
    },
    {
        text: "The only time I've ever wanted more chaos in my life",
        author: "S.C. "
    },
    {
        text: "Perfect balance of fun and chaos. The card combinations are genius. Can't wait to play again!",
        author: "Chris P."
    },
    {
        text: "Best impulse purchase ever! Every party now ends with 'When are we playing Controlled Chaos again?'",
        author: "Taylor S."
    }
];

function TestimonialCard({ index,initialDelay }) {
    const [currentIndex,setCurrentIndex] = useState(index);
    const [isFlipping,setIsFlipping] = useState(false);
    const [displayedContent,setDisplayedContent] = useState(testimonials[index]);
    const [textSize,setTextSize] = useState('text-lg');

    // Function to determine text size based on content length
    const getTextSize = (text) => {
        if (text.length > 150) return 'text-base';
        if (text.length > 100) return 'text-md';
        return 'text-lg';
    };

    useEffect(() => {
        // Set initial text size
        setTextSize(getTextSize(displayedContent.text));
    },[displayedContent]);

    useEffect(() => {
        const randomInterval = () => 10000 + Math.random() * 5000; // Random interval between 10-15 seconds

        const timer = setInterval(() => {
            setIsFlipping(true);

            // Update content right before the flip completes
            setTimeout(() => {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                setCurrentIndex(nextIndex);
                setDisplayedContent(testimonials[nextIndex]);
            },900);

            // Complete flip
            setTimeout(() => {
                setIsFlipping(false);
            },1000);

        },randomInterval());

        return () => clearInterval(timer);
    },[currentIndex]);

    return (
        <div className="w-full max-w-sm perspective-1000">
            <div
                className={`relative transition-transform duration-1000 transform-style-3d ${isFlipping ? 'rotate-y-90' : ''
                    }`}
            >
                <div className="bg-black text-white p-6 rounded-xl shadow-lg border-2 border-red-600/20 
                    hover:border-red-600 transition-colors h-[300px] flex flex-col">
                    <FaQuoteLeft className="text-red-600 text-3xl mb-3" />
                    <p className={`${textSize} mb-3 flex-grow leading-relaxed`}>
                        {displayedContent.text}
                    </p>
                    <div className="mt-auto pt-3 border-t border-red-600/20">
                        <p className="font-bold text-xl text-red-600">
                            {displayedContent.author}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Testimonials() {
    return (
        <section className="relative bg-white text-black py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">
                    The Reviews Are In — <span className="text-red-600">Players Love It!</span>
                </h2>

                <div className="flex justify-center gap-8 overflow-hidden">
                    {[0,1,2].map((index) => (
                        <TestimonialCard
                            key={`card-${index}`}
                            index={index}
                            initialDelay={index * 1000}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials; 