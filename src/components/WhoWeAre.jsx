import "../assets/Hero.css";
import { Link,useNavigate } from "react-router-dom";
import { useEffect,useRef } from 'react';
import Matter from 'matter-js';

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

// Create responsive card count based on screen width
const getCardCount = () => {
    if (window.innerWidth < 768) { // mobile devices
        return 30;
    }
    return 80; // desktop
};

const backgroundIcons = Array(getCardCount()).fill(null).map((_,index) => {
    const sectionSize = 100 / getCardCount();  // Adjusted for dynamic count
    const sectionStart = index * sectionSize;

    return {
        rotation: Math.random() * 360,
        direction: getRandomDirection(),
        startPosition: sectionStart + (Math.random() * (sectionSize - 20)),
        speed: 15 + Math.random() * 10,
    };
});

function WhoWeAre() {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const engine = Matter.Engine.create({
            constraintIterations: 4,
            positionIterations: 8,
            velocityIterations: 6
        });

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: 'auto'
            }
        });

        const cardSize = 12;
        const cards = backgroundIcons.map((icon,index) => {
            return Matter.Bodies.circle(
                (icon.startPosition / 100) * window.innerWidth,
                Math.random() * window.innerHeight,
                cardSize / 2,
                {
                    render: {
                        sprite: {
                            texture: `/card-back-${(index % 4) + 1}.png`,
                            xScale: 0.06,
                            yScale: 0.06
                        }
                    },
                    friction: 0,
                    frictionAir: 0,
                    frictionStatic: 0,
                    restitution: 0.9,
                    density: 0.001,
                    angle: icon.rotation * Math.PI / 180,
                    mass: 1,
                    inertia: Infinity,
                    angularVelocity: 0,
                    slop: 0,
                    collisionFilter: {
                        group: -1
                    }
                }
            );
        });

        const wallOffset = 100;
        const walls = [
            Matter.Bodies.rectangle(window.innerWidth / 2,-wallOffset,window.innerWidth + wallOffset * 2,20,{
                isStatic: true,
                restitution: 1
            }),
            Matter.Bodies.rectangle(window.innerWidth / 2,window.innerHeight + wallOffset,window.innerWidth + wallOffset * 2,20,{
                isStatic: true,
                restitution: 1
            }),
            Matter.Bodies.rectangle(-wallOffset,window.innerHeight / 2,20,window.innerHeight + wallOffset * 2,{
                isStatic: true,
                restitution: 1
            }),
            Matter.Bodies.rectangle(window.innerWidth + wallOffset,window.innerHeight / 2,20,window.innerHeight + wallOffset * 2,{
                isStatic: true,
                restitution: 1
            })
        ];

        Matter.World.add(engine.world,[...cards,...walls]);

        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        // Set random directions but constant speed for all cards
        const constantSpeed = 1;
        cards.forEach(card => {
            const randomAngle = Math.random() * Math.PI * 2;
            Matter.Body.setVelocity(card,{
                x: Math.cos(randomAngle) * constantSpeed,
                y: Math.sin(randomAngle) * constantSpeed
            });
        });

        // Add smoother wrap-around effect for cards
        Matter.Events.on(engine,'afterUpdate',() => {
            cards.forEach(card => {
                const buffer = cardSize * 3; // Increased buffer zone for smoother transition
                const position = card.position;
                let newPosition = { ...position };

                // Wrap horizontally
                if (position.x < -buffer) {
                    newPosition.x = window.innerWidth + buffer;
                } else if (position.x > window.innerWidth + buffer) {
                    newPosition.x = -buffer;
                }

                // Wrap vertically
                if (position.y < -buffer) {
                    newPosition.y = window.innerHeight + buffer;
                } else if (position.y > window.innerHeight + buffer) {
                    newPosition.y = -buffer;
                }

                if (newPosition.x !== position.x || newPosition.y !== position.y) {
                    Matter.Body.setPosition(card,newPosition);
                }
            });
        });

        const runner = Matter.Runner.create({
            isFixed: true,
            delta: 1000 / 60
        });
        Matter.Runner.run(runner,engine);
        Matter.Render.run(render);

        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Matter.Render.setPixelRatio(render,window.devicePixelRatio);

            // Clear existing bodies and reinitialize with new card count
            Matter.World.clear(engine.world);
            const newCards = Array(getCardCount()).fill(null).map((_,index) => {
                return Matter.Bodies.circle(
                    (backgroundIcons[index].startPosition / 100) * window.innerWidth,
                    Math.random() * window.innerHeight,
                    cardSize / 2,
                    {
                        render: {
                            sprite: {
                                texture: `/card-back-${(index % 4) + 1}.png`,
                                xScale: 0.06,
                                yScale: 0.06
                            }
                        },
                        friction: 0,
                        frictionAir: 0,
                        frictionStatic: 0,
                        restitution: 0.9,
                        density: 0.001,
                        angle: backgroundIcons[index].rotation * Math.PI / 180,
                        mass: 1,
                        inertia: Infinity,
                        angularVelocity: 0,
                        slop: 0,
                        collisionFilter: {
                            group: -1
                        }
                    }
                );
            });

            Matter.World.add(engine.world,[...newCards,...walls]);

            // Reset velocities for new cards
            newCards.forEach(card => {
                const randomAngle = Math.random() * Math.PI * 2;
                Matter.Body.setVelocity(card,{
                    x: Math.cos(randomAngle) * constantSpeed,
                    y: Math.sin(randomAngle) * constantSpeed
                });
            });
        };

        window.addEventListener('resize',handleResize);

        engineRef.current = engine;

        return () => {
            window.removeEventListener('resize',handleResize);
            Matter.Engine.clear(engine);
            Matter.Render.stop(render);
            render.canvas.remove();
            Matter.Runner.stop(runner);
        };
    },[]);

    const handleNavigation = () => {
        navigate('/about',{ replace: true });
    };

    return (
        <section className="relative bg-white text-black h-[50vh] md:h-[100vh] px-6 text-center overflow-hidden">
            <div ref={sceneRef} className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto h-full flex items-center justify-center">
                <div className="backdrop-blur-sm bg-white/60 rounded-xl p-3 sm:p-4 inline-block">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-headers mb-2 sm:mb-3 fade-in text-black drop-shadow-lg">
                        The Vision
                    </h2>
                    <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-1 leading-relaxed slide-up font-body font-semibold">
                        PWRPLAY Creations is on a mission to craft
                    </p>
                    <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-1 leading-relaxed slide-up font-body font-semibold">
                        high-energy party games.
                    </p>
                    <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed slide-up font-body font-semibold">
                        <span className="font-bold text-red-600">Controlled Chaos™</span> is just the beginning.
                    </p>

                    <div className="button-fade">
                        <Link
                            to="/about"
                            state={{ fromWhoWeAre: true }}
                            className="inline-block px-4 py-2 bg-red-600 text-white transition-all duration-300 rounded-lg text-base sm:text-lg font-subheaders font-bold
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
