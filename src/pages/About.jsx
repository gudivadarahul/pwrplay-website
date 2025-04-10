import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function About() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    return (
        <div className="relative pt-24 sm:pt-32 px-6 min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[201]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <div className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
                    <h1 className="text-5xl md:text-8xl font-headers mb-4 sm:mb-6">
                        Meet the <span className="text-red-600">Founders</span>
                    </h1>
                </div>

                {/* Founders section for DESKTOP ONLY - Above image */}
                <section className="hidden md:block mb-12">
                    <div className="max-w-6xl mx-auto overflow-x-auto">
                        <div className="flex flex-row justify-center items-center space-x-8 lg:space-x-12">
                                                        {/* Seva - Third on desktop */}
                                                        <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-8 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-auto">
                                <div className="relative group">
                                    <h3 className="text-5xl lg:text-6xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">SEVA VORA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-32 mx-auto"></div>
                                    <p className="mt-3 text-base font-body uppercase tracking-widest text-gray-300">President</p>
                                </div>
                            </div>
                            
                            {/* Rohith - First on desktop */}
                            <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-8 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-auto">
                                <div className="relative group">
                                    <h3 className="text-5xl lg:text-6xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">ROHITH GUDIVADA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-32 mx-auto"></div>
                                    <p className="mt-3 text-base font-body uppercase tracking-widest text-gray-300">Operations Director</p>
                                </div>
                            </div>
                            
                            {/* Niam - Second on desktop */}
                            <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-8 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-auto">
                                <div className="relative group">
                                    <h3 className="text-5xl lg:text-6xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">NIAM VORA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-32 mx-auto"></div>
                                    <p className="mt-3 text-base font-body uppercase tracking-widest text-gray-300">Creative Director</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Founders' Group Image */}
                <div className="mt-8 sm:mt-12 mb-[10vh] md:mb-8">
                    <img
                        src="founders.jpg"
                        alt="Founders"
                        className="rounded-xl w-full max-w-[98%] sm:max-w-4xl mx-auto shadow-xl"
                    />
                </div>

                {/* Founders section for MOBILE ONLY - Below image */}
                <section className="md:hidden mt-12 mb-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col justify-center items-center space-y-8">
                            {/* Seva - First on mobile */}
                            <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-6 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-full">
                                <div className="relative group">
                                    <h3 className="text-4xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">SEVA VORA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-20 mx-auto"></div>
                                    <p className="mt-3 text-sm font-body uppercase tracking-widest text-gray-300">President</p>
                                </div>
                            </div>
                            
                            {/* Rohith - Second on mobile */}
                            <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-6 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-full">
                                <div className="relative group">
                                    <h3 className="text-4xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">ROHITH GUDIVADA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-20 mx-auto"></div>
                                    <p className="mt-3 text-sm font-body uppercase tracking-widest text-gray-300">Operations Director</p>
                                </div>
                            </div>

                            {/* Niam - Third on mobile */}
                            <div className="text-center border border-red-800 bg-black bg-opacity-70 rounded-lg p-6 shadow-lg hover:shadow-red-900/30 transition-all duration-300 w-full">
                                <div className="relative group">
                                    <h3 className="text-4xl font-headers font-normal tracking-tight whitespace-nowrap">
                                        <span className="text-red-600 hover:text-red-500 transition-colors duration-300">NIAM VORA</span>
                                    </h3>
                                    <div className="mt-2 border-b-2 border-red-600 w-20 mx-auto"></div>
                                    <p className="mt-3 text-sm font-body uppercase tracking-widest text-gray-300">Creative Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="mb-8 sm:mb-16 mt-16">
                    <h2 className="text-5xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-headers mb-8">
                        Our <span className="text-red-600">Mission</span>
                    </h2>
                    <div className="space-y-8">
                        <p className="responsive-text leading-relaxed font-body font-light text-base md:text-2xl md:text-justify">
                            PWRPLAY Creations was founded in 2023 by friends, Seva Vora, Rohith Gudivada, and Niam Vora, with a
                            bold vision to <span className="text-red-600 font-medium leading-relaxed align-baseline"> reinvent the way people connect </span> through unforgettable game nights.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-light text-base md:text-2xl md:text-justify">
                            Frustrated by predictable games with repetitive mechanics, we set out to create something fresh, dynamic, and packed with energy. <span className="text-red-600 font-medium leading-relaxed align-baseline">
                                Our debut game, Controlled Chaos™</span>, is the first step in that journey,
                            designed to bring laughter, surprises, and bold challenges to every party.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-light   text-base md:text-2xl md:text-justify">
                            While we are just getting started, we are dedicated to building <span className="text-red-600 font-medium leading-relaxed align-baseline">
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
