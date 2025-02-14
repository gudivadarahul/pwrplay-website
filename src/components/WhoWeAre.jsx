import { FaDice,FaChessKing,FaChessQueen,FaChessKnight,FaChessBishop,FaChessRook,FaChessPawn } from "react-icons/fa6";
import { GiCardRandom,GiPokerHand,GiCardAceSpades,GiCardJoker,GiCardKingClubs,GiCardQueenDiamonds,GiCardJackHearts } from "react-icons/gi";
import "../assets/Hero.css";
import { Link } from "react-router-dom";

const getRandomDirection = () => {
    const directions = [
        'moveLeftToRight',
        'moveRightToLeft',
        'moveTopToBottom',
        'moveBottomToTop',
        'moveDiagonalDownRight',
        'moveDiagonalUpRight'
    ];
    return directions[Math.floor(Math.random() * directions.length)];
};

// Divide screen into 8 vertical sections for better distribution
const backgroundIcons = Array(8).fill(null).map((_,index) => {
    const sectionSize = 100 / 8; // Each section is 12.5% of the screen
    const sectionStart = index * sectionSize;

    return {
        rotation: Math.random() * 360,
        direction: getRandomDirection(),
        startPosition: sectionStart + (Math.random() * (sectionSize - 20)), // Keep within section bounds
        speed: 15 + Math.random() * 10, // Random speed between 15-25s
    };
});

function WhoWeAre() {
    return (
        <section className="relative bg-white text-black py-24 px-6 text-center overflow-hidden">
            {/* Background Icons */}
            <div className="absolute inset-0 overflow-hidden">
                {backgroundIcons.map((icon,index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            transform: `rotate(${icon.rotation}deg)`,
                            zIndex: 0,
                            top: `${icon.startPosition}%`,
                            animation: `${icon.direction} ${icon.speed}s linear infinite`
                        }}
                    >
                        <img
                            src={`/card-back-${(index % 4) + 1}.png`}
                            alt="Card Back"
                            className="w-24 h-24 object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="backdrop-blur-sm bg-white/60 rounded-xl p-6 inline-block">
                    <h2 className="text-5xl md:text-6xl font-headers mb-6 fade-in text-black drop-shadow-lg">
                        Who We Are
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed slide-up font-body font-light">
                        PWRPLAY Creations is on a mission to create the most fun, high-energy party games.
                        <br />
                        <span className="font-bold text-red-600">Controlled Chaos™</span> is just the beginning.
                    </p>

                    <div className="button-fade">
                        <Link
                            to="/about"
                            className="inline-block px-8 py-4 bg-red-600 text-white transition-all duration-300 rounded-lg text-xl font-subheaders
                            hover:scale-105 transform"
                        >
                            Get to Know Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhoWeAre;
