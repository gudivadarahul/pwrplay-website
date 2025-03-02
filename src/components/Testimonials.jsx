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
        text: " It was so fun getting to talk about topics that friends usually forget to talk about and the endless laughs that ensue are so fun.",
        author: "C.S."
    },
    {
        text: "The only time I've ever wanted more chaos in my life.",
        author: "S.C. "
    },
    {
        text: "We spent hours laughing at every card, telling each other hilarious stories from our pasts, and trying to defend ourselves from getting those icks!! This game is a must have in every household.",
        author: "A.S."
    },
    {
        text: "It's perfect to play with friends you've known for years or as an icebreaker with a new group. If you want a game that'll have you ugly laughing and getting absolutely hammered, this is it.",
        author: "S.P."
    },
    {
        text: "I liked how much the social barrier was just absolutely destroyed within two rounds of playing, and that we just played for hours on end without realizing.",
        author: "S.G."
    }
];

function TestimonialCard({ index,initialDelay }) {
    const [currentIndex,setCurrentIndex] = useState(index);
    const [isFlipping,setIsFlipping] = useState(false);
    const [displayedContent,setDisplayedContent] = useState(testimonials[index]);

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
        <div className="w-full max-w-sm h-full perspective-1000">
            <div
                className={`relative h-full transition-transform duration-1000 transform-style-3d ${isFlipping ? 'rotate-y-90' : ''}`}
            >
                <div className="bg-black text-white p-6 rounded-xl h-full min-h-[300px] flex flex-col">
                    <FaQuoteLeft className="text-red-600 text-3xl mb-4 flex-shrink-0" />
                    <p className="text-lg mb-4 flex-grow leading-relaxed font-medium">
                        {displayedContent.text}
                    </p>
                    <div className="pt-3 border-t border-red-600">
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-16">
                    The Reviews Are In — <span className="text-red-600">Players Love It!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 overflow-hidden">
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