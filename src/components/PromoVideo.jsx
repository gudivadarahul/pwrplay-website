import { useState,useEffect } from 'react';

// First, add this CSS animation at the top of your component
const rowAnimations = Array(20).fill(null).map((_,index) => {
    const direction = index % 2 === 0 ? 'right' : 'left';
    const duration = 20 + (index % 5) * 10; // Varies between 20s and 60s
    return {
        animation: `scroll-${direction} ${duration}s linear infinite`,
    };
});

function PromoVideo() {
    // Add state for tracking glowing position
    const [glowingPositions,setGlowingPositions] = useState([
        { row: 0,group: 0 },
        { row: 10,group: 6 },
        { row: 15,group: 3 },
        { row: 5,group: 8 },
        { row: 18,group: 2 },
        { row: 8,group: 10 },
        { row: 12,group: 4 },
        { row: 3,group: 9 },
        { row: 7,group: 5 },
        { row: 16,group: 7 },
        { row: 2,group: 11 },
        { row: 13,group: 1 },
        { row: 19,group: 8 },
        { row: 6,group: 3 },
        { row: 11,group: 7 },
        { row: 4,group: 5 },
        { row: 14,group: 2 },
        { row: 17,group: 9 },
        { row: 1,group: 4 },
        { row: 9,group: 11 }
    ]);

    // Update glowing position periodically
    useEffect(() => {
        const interval = setInterval(() => {
            const newPositions = Array(20).fill(null).map(() => ({
                row: Math.floor(Math.random() * 20),
                group: Math.floor(Math.random() * 12)
            }));
            setGlowingPositions(newPositions);
        },4000); // Slightly longer than the animation duration

        return () => clearInterval(interval);
    },[]);

    // Add these keyframes to your component
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            @keyframes scroll-right {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    },[]);

    return (
        <section className="relative bg-black text-white py-2 px-2 text-center overflow-hidden min-h-[90vh] sm:min-h-[80vh]">
            {/* Background Text Pattern - Increased size */}
            <div className="absolute inset-0 overflow-hidden whitespace-nowrap leading-tight"
                style={{
                    fontSize: 'clamp(14px, 1.8vw, 26px)',
                    fontFamily: 'Rajdhani',
                    letterSpacing: '0.8px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                {Array(20).fill(null).map((_,rowIndex) => (
                    <div
                        key={rowIndex}
                        className="whitespace-nowrap"
                        style={{
                            ...rowAnimations[rowIndex],
                            display: 'flex',
                        }}
                    >
                        {/* Double the content to make seamless loop */}
                        {[...Array(24)].map((_,groupIndex) => (
                            <span
                                key={`${rowIndex}-${groupIndex}`}
                                className={`inline-block font-semibold ${glowingPositions.some(pos =>
                                    pos.row === rowIndex &&
                                    pos.group === (groupIndex % 12)
                                ) ? "" : "opacity-20"
                                    }`}
                                style={{
                                    padding: 'clamp(5.5px, 1.3vw, 11px)',
                                }}
                            >
                                <span className={
                                    glowingPositions.some(pos =>
                                        pos.row === rowIndex &&
                                        pos.group === (groupIndex % 12)
                                    ) ? "glow-text" : ""
                                }>
                                    SPIN-PLAY-SIP-REPEAT
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-start h-full pt-8 md:pt-20">
                <h2 className="text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-headers bg-black px-4 py-1 rounded-lg whitespace-nowrap">
                    The <span className="text-red-600">Ultimate</span> Party Game
                </h2>

                <div className="w-full max-w-[70vw] md:max-w-[400px] mt-4">
                    <div className="relative w-full pb-[177.78%] md:pb-[177.78%]">
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/50 rounded-lg p-1">
                            <iframe
                                className="w-full h-full rounded-md shadow-xl"
                                src="https://www.youtube-nocookie.com/embed/EyTudnuRU_Y"
                                title="Controlled Chaos Promo Video"
                                referrerPolicy="no-referrer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PromoVideo; 