import { FaDice,FaChessKing,FaChessQueen,FaChessKnight,FaChessBishop,FaChessRook,FaChessPawn } from "react-icons/fa6";
import { GiCardRandom,GiPokerHand,GiCardAceSpades,GiCardJoker,GiCardKingClubs,GiCardQueenDiamonds,GiCardJackHearts } from "react-icons/gi";
import "../assets/Hero.css";

function WhoWeAre() {
    const backgroundIcons = [
        { Icon: FaDice,size: "text-4xl",rotation: "rotate-0" },
        { Icon: GiCardRandom,size: "text-5xl",rotation: "rotate-12" },
        { Icon: FaChessKnight,size: "text-4xl",rotation: "rotate-45" },
        { Icon: GiCardJoker,size: "text-5xl",rotation: "rotate-[-12deg]" },
        { Icon: FaChessQueen,size: "text-4xl",rotation: "rotate-[145deg]" },
        { Icon: GiPokerHand,size: "text-5xl",rotation: "rotate-90" },
        { Icon: FaChessKing,size: "text-4xl",rotation: "rotate-[60deg]" },
        { Icon: GiCardAceSpades,size: "text-5xl",rotation: "rotate-[-45deg]" },
        { Icon: FaChessBishop,size: "text-4xl",rotation: "rotate-[30deg]" },
        { Icon: GiCardKingClubs,size: "text-5xl",rotation: "rotate-[-30deg]" },
        { Icon: FaChessRook,size: "text-4xl",rotation: "rotate-[120deg]" },
        { Icon: GiCardQueenDiamonds,size: "text-5xl",rotation: "rotate-[-60deg]" },
        { Icon: FaChessPawn,size: "text-4xl",rotation: "rotate-[90deg]" },
        { Icon: GiCardJackHearts,size: "text-5xl",rotation: "rotate-[-90deg]" },
    ];

    return (
        <section className="relative bg-white text-black py-24 px-6 text-center overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                {[...Array(6)].map((_,row) => (
                    [...Array(6)].map((_,col) => {
                        const randomIcon = backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)];
                        const animations = ['floating-icon','floating-icon-reverse','floating-icon-slow'];
                        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                        const randomDelay = Math.random() * -20;

                        // Calculate base position
                        const baseX = (col * 100) / 5; // Divide space into 6 columns
                        const baseY = (row * 100) / 5; // Divide space into 6 rows

                        // Add small random offset within the cell
                        const offsetX = (Math.random() - 0.5) * 10;
                        const offsetY = (Math.random() - 0.5) * 10;

                        return (
                            <div
                                key={`${row}-${col}`}
                                className={randomAnimation}
                                style={{
                                    position: 'absolute',
                                    left: `${baseX + offsetX}%`,
                                    top: `${baseY + offsetY}%`,
                                    animationDelay: `${randomDelay}s`
                                }}
                            >
                                <randomIcon.Icon
                                    className={`text-red-600/20 ${randomIcon.size} ${randomIcon.rotation}`}
                                />
                            </div>
                        );
                    })
                ))}
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10 max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6 fade-in">
                    Who We Are
                </h2>
                <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed slide-up">
                    PWRPLAY Creations is on a mission to create the most fun, high-energy party games.
                    <br />
                    <span className="font-bold text-red-600">Controlled Chaos™</span> is just the beginning.
                </p>

                {/* CTA Button to About Page */}
                <div className="button-fade">
                    <a
                        href="/about"
                        className="border-2 border-red-600 bg-white text-black px-8 py-4 rounded-lg text-lg font-bold 
                        shadow-lg transform hover:scale-105 transition-all duration-300 
                        hover:bg-red-600 hover:text-white hover:shadow-red-500/50 hover:shadow-xl"
                    >
                        Learn More About Us
                    </a>
                </div>
            </div>
        </section>
    );
}

export default WhoWeAre;
