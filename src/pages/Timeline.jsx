import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';

function Timeline() {
    const location = useLocation();
    const [activeIndex,setActiveIndex] = useState(0);

    const timelineEvents = [
        {
            date: "October 2023",
            title: "The Big Idea",
            description: "Three friends. One bold vision. In November 2023, we set out to create the ultimate party game—something fresh, hilarious, and guaranteed to bring people together. Thus, Controlled Chaos™ was born.",
            stats: "3 Founders | 1 Game-Changing Idea"
        },
        {
            date: "October 2024",
            title: "Design, Playtest, Repeat",
            description: " For nearly a year, we poured our energy into perfecting Controlled Chaos™. From designing the mechanics to countless playtests, every detail was fine-tuned for the ultimate experience.",
            stats: "100+ Playtests | 4 Decks | 1 Insanely Fun Game"
        },
        {
            date: "November 2024",
            title: "Making It Official",
            description: "PWRPLAY Creations Inc. was officially incorporated, turning our vision into reality and setting the stage for production.",
            stats: "Officially Incorporated | The Chaos Gets Real"
        },
        {
            date: "January 2025",
            title: "Protecting the Brand",
            description: "We took the next step—filing trademarks for Controlled Chaos™ in Canada and the USA, ensuring our game remains uniquely ours.",
            stats: "Trademarks Secured | Expanding Our Reach"
        },
        {
            date: "February 2025",
            title: "First Official Prototype Arrives",
            description: "A major milestone! After months of development and manufacturer negotiations, our first official prototype of Controlled Chaos™ arrived. Seeing the game in its final form for the first time was a surreal moment.",
            stats: "1st Prototype in Hand | The Vision Comes to Life"
        },
        {
            date: "March 2025",
            title: "Building the Chaos Community",
            description: "With trademarks secured and prototypes tested, we launched our website and built a thriving online community. Our focus is now on marketing, brand awareness, and gearing up for the next big step.",
            stats: "6 Social Platforms | Website Launches"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % timelineEvents.length);
        },5000);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    return (
        <div className="relative pt-24 sm:pt-32 px-4 sm:px-6 min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-6 sm:-top-8 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-40 sm:w-48 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-5xl sm:text-5xl md:text-8xl font-headers mb-4 sm:mb-6">
                        Our <span className="text-red-600">Journey</span>
                    </h1>
                </div>

                {/* Timeline Section */}
                <div className="relative mt-12 sm:mt-20">
                    <div className="absolute w-1 sm:w-1.5 h-full bg-red-600 left-1/2 transform -translate-x-1/2" />

                    {timelineEvents.map((event,index) => (
                        <motion.div
                            key={event.date}
                            initial={{ opacity: 0,y: 50 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative mb-16 sm:mb-32 flex justify-center"
                        >
                            <div className="inline-block w-[90%] sm:max-w-xl">
                                <Tilt
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    perspective={1000}
                                    scale={1.02}
                                    transitionSpeed={1000}
                                    gyroscope={false}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="bg-black p-4 sm:p-8 rounded-xl border-2 sm:border-3 border-white hover:border-red-600 
                                        group transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-red-600">
                                                {event.title}
                                            </h3>
                                            <div className="text-right ml-4">
                                                <div className="text-xl sm:text-2xl text-white font-bold">
                                                    {event.date.split(" ")[0]}
                                                </div>
                                                <div className="text-lg sm:text-xl text-white/80">
                                                    {event.date.split(" ")[1]}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-lg sm:text-xl text-white/80">
                                                {event.description}
                                            </p>
                                        </div>
                                        <div className="pt-3 border-t border-red-600">
                                            <div className="text-base sm:text-xl text-red-600 font-medium">
                                                {event.stats}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Tilt>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="text-center mt-12 sm:mt-16 mb-20 sm:mb-32">
                    <p className="text-2xl sm:text-4xl font-bold font-headers italic px-4">
                        This is just the beginning of our <span className="text-red-600">game-changing</span> journey
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Timeline; 