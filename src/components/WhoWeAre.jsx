import "../assets/Hero.css";
import { Link, useNavigate } from "react-router-dom";
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
const backgroundIcons = Array(40).fill(null).map((_,index) => {  // Increased to 40
    const sectionSize = 100 / 40;
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
                    frictionAir: 0.001,
                    frictionStatic: 0,
                    restitution: 0.9,
                    density: 0.001,
                    angle: icon.rotation * Math.PI / 180,
                    mass: 1,
                    inertia: Infinity,
                    angularVelocity: 0,
                    slop: 0
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

        // Set initial velocities with slower speed
        cards.forEach(card => {
            const speed = 1.5;
            const angle = Math.random() * Math.PI * 2;
            Matter.Body.setVelocity(card,{
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            });
        });

        // Handle collisions with reduced speed
        Matter.Events.on(engine,'collisionStart',(event) => {
            event.pairs.forEach((pair) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                if (!bodyA.isStatic && !bodyB.isStatic) {
                    const normal = pair.collision.normal;
                    const speed = 1.5;
                    Matter.Body.setVelocity(bodyA,{
                        x: bodyA.velocity.x + normal.x * speed,
                        y: bodyA.velocity.y + normal.y * speed
                    });
                    Matter.Body.setVelocity(bodyB,{
                        x: bodyB.velocity.x - normal.x * speed,
                        y: bodyB.velocity.y - normal.y * speed
                    });
                }
            });
        });

        // Maintain minimum velocity at a slower speed
        Matter.Events.on(engine,'afterUpdate',() => {
            cards.forEach(card => {
                const velocity = Matter.Vector.magnitude(card.velocity);
                const minSpeed = 1;
                const maxSpeed = 2;

                if (velocity < minSpeed) {
                    const angle = Math.atan2(card.velocity.y,card.velocity.x);
                    Matter.Body.setVelocity(card,{
                        x: Math.cos(angle) * minSpeed,
                        y: Math.sin(angle) * minSpeed
                    });
                } else if (velocity > maxSpeed) {
                    const angle = Math.atan2(card.velocity.y,card.velocity.x);
                    Matter.Body.setVelocity(card,{
                        x: Math.cos(angle) * maxSpeed,
                        y: Math.sin(angle) * maxSpeed
                    });
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
        navigate('/about', { replace: true });
    };

    return (
        <section className="relative bg-white text-black py-24 px-6 text-center overflow-hidden">
            <div ref={sceneRef} className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="backdrop-blur-sm bg-white/60 rounded-xl p-6 inline-block">
                    <h2 className="text-5xl md:text-7xl font-headers mb-6 fade-in text-black drop-shadow-lg">
                        The Vision
                    </h2>
                    <p className="text-2xl max-w-3xl mx-auto mb-2 leading-relaxed slide-up font-body font-semibold">
                        PWRPLAY Creations is on a mission to craft
                    </p>
                    <p className="text-2xl max-w-3xl mx-auto mb-2 leading-relaxed slide-up font-body font-semibold">
                        high-energy party games.
                    </p>
                    <p className="text-2xl max-w-3xl mx-auto mb-8 leading-relaxed slide-up font-body font-semibold">
                        <span className="font-bold text-red-600">Controlled Chaos™</span> is just the beginning.
                    </p>

                    <div className="button-fade">
                        <Link
                            to="/about"
                            state={{ fromWhoWeAre: true }}
                            className="inline-block px-8 py-4 bg-red-600 text-white transition-all duration-300 rounded-lg text-xl font-subheaders font-bold
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
