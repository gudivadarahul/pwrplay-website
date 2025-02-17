import { useEffect,useState } from 'react';

function AnimatedBackground() {
    const [particles,setParticles] = useState([]);

    useEffect(() => {
        const initialParticles = Array.from({ length: 50 },() => ({
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 3,
        }));
        setParticles(initialParticles);

        const interval = setInterval(() => {
            setParticles(prevParticles =>
                prevParticles.map(particle => ({
                    ...particle,
                    y: particle.y <= -200 ? 100 : particle.y,
                    id: particle.y <= -200 ? Math.random() : particle.id
                }))
            );
        },100);

        return () => clearInterval(interval);
    },[]);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none">
            {/* Minimal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/10 opacity-10" />

            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-red-500 animate-float"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${Math.random() * -20}s`,
                        boxShadow: '0 0 25px rgba(239, 68, 68, 1), 0 0 50px rgba(239, 68, 68, 0.5)'
                    }}
                />
            ))}
        </div>
    );
}

export default AnimatedBackground; 