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
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
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
                <div className="text-center mb-4 sm:mb-8">
                    <h1 className="text-5xl md:text-8xl font-headers mb-4 sm:mb-6">
                        Meet the <span className="text-red-600">Founders</span>
                    </h1>
                </div>

                {/* Meet the Team */}
                <section className="mb-4 sm:mb-8">
                    <div className="flex flex-col space-y-4 md:space-y-8">
                        {/* Founder 1 */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-3xl mx-auto w-full">
                            <div className="text-right">
                                <span className="text-lg md:text-5xl font-headers font-medium text-red-600">Seva Vora</span>
                            </div>
                            <span className="text-lg md:text-5xl font-headers mx-2 md:mx-4">|</span>
                            <div className="text-left">
                                <span className="font-body font-medium text-base md:text-3xl">President</span>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-3xl mx-auto w-full">
                            <div className="text-right">
                                <span className="text-lg md:text-5xl font-headers font-medium text-red-600">Rohith Gudivada</span>
                            </div>
                            <span className="text-lg md:text-5xl font-headers mx-2 md:mx-4">|</span>
                            <div className="text-left">
                                <span className="font-body font-medium text-base md:text-3xl">Operations Director</span>
                            </div>
                        </div>

                        {/* Founder 3 */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-3xl mx-auto w-full">
                            <div className="text-right">
                                <span className="text-lg md:text-5xl font-headers font-medium text-red-600">Niam Vora</span>
                            </div>
                            <span className="text-lg md:text-5xl font-headers mx-2 md:mx-4">|</span>
                            <div className="text-left">
                                <span className="font-body font-medium text-base md:text-3xl">Creative Director</span>
                            </div>
                        </div>
                    </div>

                    {/* Founders' Group Image */}
                    <div className="mt-4 sm:mt-8">
                        <img
                            src="founders.jpg"
                            alt="Founders"
                            className="rounded-xl w-full max-w-[90%] sm:max-w-2xl mx-auto shadow-lg"
                        />
                    </div>
                </section>

                {/* Our Mission */}
                <section className="mb-8 sm:mb-16">
                    <h2 className="text-4xl font-headers mb-8 lg:text-5xl xl:text-6xl 2xl:text-7xl">
                        Our <span className="text-red-600">Mission</span>
                    </h2>
                    <div className="space-y-8">
                        <p className="responsive-text leading-relaxed font-body font-medium text-base md:text-2xl md:text-justify">
                            PWRPLAY Creations was founded in 2023 by friends, Seva Vora, Rohith Gudivada, and Niam Vora, with a
                            bold vision to <span className="text-red-600 leading-relaxed align-baseline"> reinvent the way people connect </span> through unforgettable game nights.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-medium text-base md:text-2xl md:text-justify">
                            Frustrated by predictable games with repetitive mechanics, we set out to create something fresh, dynamic, and packed with energy. <span className="text-red-600 leading-relaxed align-baseline">
                                Our debut game, Controlled Chaos™</span>, is the first step in that journey,
                            designed to bring laughter, surprises, and bold challenges to every party.
                        </p>

                        <p className="responsive-text leading-relaxed font-body font-medium text-base md:text-2xl md:text-justify">
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
