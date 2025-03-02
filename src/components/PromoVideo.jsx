import { useState,useEffect } from 'react';

function PromoVideo() {
    const [glowingPositions,setGlowingPositions] = useState(new Set());
    const ANIMATION_DURATION = 8000;

    useEffect(() => {
        const generateNewPositions = () => {
            const totalPositions = 20 * 12; // Increased grid size
            const positions = Array.from({ length: totalPositions },(_,i) => i);
            const numGlowing = Math.floor(totalPositions * 0.03);

            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i],positions[j]] = [positions[j],positions[i]];
            }

            const selectedPositions = positions.slice(0,numGlowing);

            const finalPositions = selectedPositions.filter((pos,index) => {
                const row = Math.floor(pos / 12); // Adjusted for new column count
                const col = pos % 12; // Adjusted for new column count
                return !selectedPositions.some((otherPos,otherIndex) => {
                    if (index === otherIndex) return false;
                    const otherRow = Math.floor(otherPos / 12);
                    const otherCol = otherPos % 12;
                    return Math.abs(row - otherRow) <= 1 && Math.abs(col - otherCol) <= 2;
                });
            });

            const newPositions = new Set(finalPositions);
            if ([...newPositions].some(pos => glowingPositions.has(pos))) {
                generateNewPositions();
                return;
            }

            setTimeout(() => {
                setGlowingPositions(newPositions);
            },ANIMATION_DURATION / 2);
        };

        generateNewPositions();
        const interval = setInterval(generateNewPositions,ANIMATION_DURATION);

        return () => clearInterval(interval);
    },[glowingPositions]);

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
                                className="inline-block font-semibold"
                                style={{
                                    animation: glowingPositions.has(rowIndex * 12 + groupIndex) ?
                                        `textGlowUp 4s ease-in forwards, textGlowDown 4s ease-out 4s forwards` :
                                        'textGlowDown 4s ease-out forwards',
                                    padding: 'clamp(4px, 1vw, 8px)',
                                    opacity: Math.random() * 0.4 + 0.2, // Random opacity between 0.2 and 0.6
                                    color: `rgba(255, ${Math.random() * 30 + 40}, ${Math.random() * 30 + 40}, 1)` // Brighter red tint variation
                                }}
                            >
                                SPIN-PLAY-SIP-REPEAT
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