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
        text: "Had a great time playing Chaos with my group. Definitely an interactive game that plays into inside jokes. Love the idea of stick an ick!",
        author: "K.S."
    }
];

// Add this at the top level, outside of any component
const usedIndices = new Set();

function TestimonialCard({ index,initialDelay }) {
    const [currentIndex,setCurrentIndex] = useState(index);
    const [isFlipping,setIsFlipping] = useState(false);
    const [displayedContent,setDisplayedContent] = useState(testimonials[index]);

    useEffect(() => {
        // Add initial index to used indices
        usedIndices.add(index);

        const getNextUniqueIndex = (currentIdx) => {
            let nextIdx;
            do {
                nextIdx = Math.floor(Math.random() * testimonials.length);
            } while (usedIndices.has(nextIdx));
            return nextIdx;
        };

        const randomInterval = () => 10000 + Math.random() * 5000;

        const timer = setInterval(() => {
            setIsFlipping(true);

            // Update content right before the flip completes
            setTimeout(() => {
                // Remove current index from used set
                usedIndices.delete(currentIndex);

                // Get next unique index
                const nextIndex = getNextUniqueIndex(currentIndex);

                // Add new index to used set
                usedIndices.add(nextIndex);

                setCurrentIndex(nextIndex);
                setDisplayedContent(testimonials[nextIndex]);
            },900);

            // Complete flip
            setTimeout(() => {
                setIsFlipping(false);
            },1000);

        },randomInterval());

        // Cleanup function
        return () => {
            clearInterval(timer);
            usedIndices.delete(currentIndex);
        };
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
                    <hr className="border-red-600 border-t-2 mb-4" />
                    <div>
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