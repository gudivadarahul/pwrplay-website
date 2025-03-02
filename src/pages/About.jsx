function About() {
    return (
        <div className="pt-32 px-6 min-h-screen bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-8xl font-headers mb-6">
                        Meet the <span className="text-red-600">Founders</span>
                    </h1>
                </div>

                {/* Meet the Team */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Founder 1 */}
                        <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                            <h3 className="text-5xl font-headers text-red-600 mb-2">Seva Vora</h3>
                            <p className="text-2xl mb-4 font-body font-medium">President</p>
                        </div>

                        {/* Founder 2 */}
                        <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                            <h3 className="text-5xl font-headers text-red-600 mb-2">Rohith Gudivada</h3>
                            <p className="text-2xl mb-4 font-body font-medium">Director of Operations</p>
                        </div>

                        {/* Founder 3 */}
                        <div className="bg-black p-8 rounded-xl border-3 border-red-600 transition-all duration-300 text-center">
                            <h3 className="text-5xl font-headers text-red-600 mb-2">Niam Vora</h3>
                            <p className="text-2xl mb-4 font-body font-medium">Creative Director</p>
                        </div>
                    </div>

                    {/* Founders' Group Image */}
                    <div className="mt-12">
                        <img
                            src="founders.jpg"
                            alt="Founders"
                            className="rounded-xl w-full max-w-2xl mx-auto shadow-lg"
                        />
                    </div>
                </section>

                {/* Our Mission */}
                <section className="mb-16">
                    <h2 className="text-4xl font-headers mb-8 lg:text-5xl xl:text-6xl 2xl:text-7xl">
                        Our <span className="text-red-600">Mission</span>
                    </h2>
                    <div className="space-y-8">
                        <p className="responsive-text leading-relaxed font-body font-medium text-2xl text-justify">
                            PWRPLAY Creations was founded in 2023 by friends, Seva Vora, Rohith Gudivada, and Niam Vora, with a
                            bold vision to <span className="text-red-600 leading-relaxed align-baseline"> reinvent the way people connect </span> through unforgettable game nights.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-medium text-2xl text-justify">
                            Frustrated by predictable games with repetitive mechanics, we set out to create something fresh, dynamic, and packed with energy. <span className="text-red-600 leading-relaxed align-baseline">
                                Our debut game, Controlled Chaos™</span>, is the first step in that journey,
                            designed to bring laughter, surprises, and bold challenges to every party.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-medium text-2xl text-justify">
                            While we are just getting started, we are dedicated to building <span className="text-red-600 leading-relaxed align-baseline">
                                high-quality, original games</span> that break the ice, spark real conversations, and create moments
                            that people will remember long after the night ends. We can't wait to bring Controlled Chaos™ to players soon.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
