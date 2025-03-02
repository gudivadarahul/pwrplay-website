import { useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaDice,FaRocket,FaChartLine,FaTrophy, FaGear } from 'react-icons/fa6';

function Timeline() {
    const [activeIndex,setActiveIndex] = useState(0);

    const timelineEvents = [
        {
            date: "Summer 2023",
            title: "The Beginning",
            description: "Three friends with a shared vision came together to revolutionize game night. PWRPLAY Creations was born!",
            icon: <FaDice className="text-3xl" />,
            stats: "3 Founders, 1 Vision"
        },
        {
            date: "Fall 2023",
            title: "Controlled Chaos™ Development",
            description: "Countless playtests, refinements, and laughs later, our first game took shape.",
            icon: <FaGear className="text-3xl" />,
            stats: "100+ Playtests"
        },
        {
            date: "Spring 2024",
            title: "Launch Phase",
            description: "Website launch, social media presence established, and growing community engagement.",
            icon: <FaRocket className="text-3xl" />,
            stats: "6 Social Platforms"
        },
        {
            date: "2024 & Beyond",
            title: "Future Milestones",
            description: "Expanding our game lineup, reaching new markets, and continuing to innovate the party game experience.",
            icon: <FaChartLine className="text-3xl" />,
            stats: "Infinite Possibilities"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % timelineEvents.length);
        },5000);
        return () => clearInterval(interval);
    },[]);

    return (
        <div className="relative pt-32 px-6 min-h-screen bg-black">
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-8xl font-headers mb-6">
                        Our <span className="text-red-600">Journey</span>
                    </h1>
                    <p className="text-3xl font-body font-medium max-w-5xl mx-auto">
                        Follow our path as we revolutionize game night experiences.
                    </p>
                </div>

                {/* Timeline Section */}
                <div className="relative mt-20">
                    <div className="absolute w-1.5 h-full bg-red-600 left-1/2 transform -translate-x-1/2" />

                    {timelineEvents.map((event,index) => (
                        <motion.div
                            key={event.date}
                            initial={{ opacity: 0,y: 50 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative mb-32 flex justify-center"
                        >
                            <div className="inline-block max-w-xl">
                                <Tilt
                                    tiltMaxAngleX={15}
                                    tiltMaxAngleY={15}
                                    perspective={1000}
                                    scale={1.02}
                                    transitionSpeed={1000}
                                    gyroscope={false}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-black p-8 rounded-xl border-3 border-white hover:border-red-600 
                                        group transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-3xl font-bold text-red-600">
                                                {event.title}
                                            </h3>
                                            <span className="text-2xl text-white font-bold">
                                                {event.date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="text-6xl text-red-600">
                                                {event.icon}
                                            </div>
                                            <p className="text-xl text-white/80">
                                                {event.description}
                                            </p>
                                        </div>
                                        <div className="pt-3 border-t border-red-600">
                                            <div className="text-xl text-red-600 font-bold">
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
                <div className="text-center mt-16 mb-32">
                    <p className="text-4xl font-bold font-headers italic">
                        This is just the beginning of our <span className="text-red-600">game-changing</span> journey
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Timeline; 