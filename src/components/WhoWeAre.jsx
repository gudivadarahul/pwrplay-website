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

// Increase number of cards even more for better effect
const backgroundIcons = Array(80).fill(null).map((_,index) => {  // Increased from 40 to 80
    const sectionSize = 100 / 80;  // Adjusted for new count
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
                height: window.innerWidth <= 768 ? window.innerHeight * 0.5 : window.innerHeight,
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
            render.canvas.height = window.innerWidth <= 768 ? window.innerHeight * 0.5 : window.innerHeight;
            Matter.Render.setPixelRatio(render,window.devicePixelRatio);
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
        <section className="relative bg-white text-black md:py-24 flex md:block items-center px-6 text-center overflow-hidden h-[50vh] md:h-full">
            <div ref={sceneRef} className="absolute inset-0 h-[50vh] md:h-full" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="backdrop-blur-sm bg-white/60 rounded-xl p-2 md:p-6 inline-block">
                    <h2 className="text-3xl md:text-7xl font-headers mb-2 md:mb-6 fade-in text-black drop-shadow-lg">
                        The Vision
                    </h2>
                    <p className="text-sm md:text-2xl max-w-3xl mx-auto mb-1 md:mb-2 leading-relaxed slide-up font-body font-semibold">
                        PWRPLAY Creations is on a mission to craft
                    </p>
                    <p className="text-sm md:text-2xl max-w-3xl mx-auto mb-1 md:mb-2 leading-relaxed slide-up font-body font-semibold">
                        high-energy party games.
                    </p>
                    <p className="text-sm md:text-2xl max-w-3xl mx-auto mb-3 md:mb-8 leading-relaxed slide-up font-body font-semibold">
                        <span className="font-bold text-red-600">Controlled Chaos™</span> is just the beginning.
                    </p>

                    <div className="button-fade">
                        <Link
                            to="/about"
                            state={{ fromWhoWeAre: true }}
                            className="inline-block px-3 md:px-8 py-1.5 md:py-4 bg-red-600 text-white transition-all duration-300 rounded-lg text-sm md:text-xl font-subheaders font-bold
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
