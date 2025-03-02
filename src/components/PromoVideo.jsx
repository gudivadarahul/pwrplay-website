import { useState,useEffect } from 'react';

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
        { row: 16,group: 7 }
    ]);

    // Update glowing position periodically
    useEffect(() => {
        const interval = setInterval(() => {
            const newPositions = Array(10).fill(null).map(() => ({
                row: Math.floor(Math.random() * 20),
                group: Math.floor(Math.random() * 12)
            }));
            setGlowingPositions(newPositions);
        },6000); // Match the animation duration

        return () => clearInterval(interval);
    },[]);

    return (
        <section className="relative bg-black text-white py-24 px-6 text-center overflow-hidden">
            {/* Background Text Pattern */}
            <div className="absolute inset-0 overflow-hidden whitespace-nowrap leading-loose"
                style={{
                    fontSize: 'clamp(16px, 2vw, 24px)',
                    fontFamily: 'Rajdhani',
                    letterSpacing: '2px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                {Array(20).fill(null).map((_,rowIndex) => (
                    <div key={rowIndex} className="whitespace-nowrap">
                        {Array(12).fill(null).map((_,groupIndex) => (
                            <span
                                key={`${rowIndex}-${groupIndex}`}
                                className="inline-block font-semibold opacity-30"
                                style={{
                                    padding: 'clamp(4px, 1vw, 8px)',
                                }}
                            >
                                <span className={
                                    glowingPositions.some(pos =>
                                        pos.row === rowIndex &&
                                        pos.group === groupIndex
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
            <h2 className="relative z-10 text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-headers whitespace-nowrap bg-black px-8 rounded-lg inline-block">
                The <span className="text-red-600">Ultimate</span> Party Game
            </h2>

            <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
                {/* Center Video Content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-[600px] h-[80vh] backdrop-blur-sm bg-black/50 rounded-xl p-3">
                        <iframe
                            className="w-full h-full rounded-lg shadow-2xl"
                            src="https://www.youtube-nocookie.com/embed/EyTudnuRU_Y"
                            title="Controlled Chaos Promo Video"
                            referrerPolicy="no-referrer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PromoVideo; 