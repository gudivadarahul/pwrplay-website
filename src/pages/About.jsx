function About() {
    return (
        <div className="pt-24 p-8 text-white max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-headers mb-6 text-center">Meet the Founders</h1>

            {/* Meet the Team */}
            <section className="mb-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Founder 1 */}
                    <div className="text-center">
                        <h3 className="text-xl font-subheaders">Seva Vora</h3>
                        <p className="opacity-80 mb-4 font-body font-light">President</p>
                    </div>

                    {/* Founder 2 */}
                    <div className="text-center">
                        <h3 className="text-xl font-subheaders">Rohith Gudivada</h3>
                        <p className="opacity-80 mb-4 font-body font-light">Director of Operations</p>
                    </div>

                    {/* Founder 3 */}
                    <div className="text-center">
                        <h3 className="text-xl font-subheaders">Niam Vora</h3>
                        <p className="opacity-80 mb-4 font-body font-light">Creative Director</p>
                    </div>
                </div>

                {/* Founders' Group Image */}
                <div className="mt-8">
                    <img
                        src="founders.jpg"
                        alt="Founders"
                        className="rounded-lg w-full max-w-2xl mx-auto shadow-lg"
                    />
                </div>
            </section>

            {/* Our Mission */}
            <section>
                <h2 className="text-2xl font-headers mb-6">Our Mission</h2>
                <div className="space-y-6 opacity-80">
                    <p className="leading-relaxed font-body font-light">
                        PWRPLAY Creations was founded in 2023 by friends Seva Vora, Rohith Gudivada, and Niam Vora with a
                        <span className="font-bold text-red-600"> bold vision to reinvent the way people connect through unforgettable game nights</span>.
                    </p>

                    <p className="leading-relaxed font-body font-light">
                        Frustrated by predictable games with repetitive mechanics, we set out to create something fresh, dynamic, and packed with energy.
                        Our debut game, <span className="font-bold text-red-600">Controlled Chaos™</span>, is the first step in that journey,
                        designed to bring laughter, surprises, and bold challenges to every party.
                    </p>

                    <p className="leading-relaxed font-body font-light">
                        While we are just getting started, we are dedicated to building
                        <span className="font-bold"> high-quality, original games that break the ice, spark real conversations, and create moments
                            that people will remember long after the night ends</span>. We can't wait to bring Controlled Chaos™ to players soon.
                    </p>

                    <p className="leading-relaxed font-body font-light italic">
                        Follow us for updates and be part of the movement as we shake up the game night experience!
                    </p>
                </div>
            </section>
        </div>
    );
}

export default About;
