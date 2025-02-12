function About() {
    return (
        <div className="p-8 text-white max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl font-extrabold mb-6 text-center">About PWRPLAY Creations</h1>
            <p className="text-lg opacity-80 text-center mb-12">
                We're here to reinvent the way you connect with friends. Controlled Chaos™ is just the beginning.
            </p>

            {/* Our Story */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="opacity-80">
                    It all started with <span className="font-bold">one wild game night</span>. We realized most drinking games were either too simple, too repetitive, or just not chaotic enough.
                    That's when we decided to create a <span className="font-bold">game that mixes drinking, strategy, and total unpredictability</span>—Controlled Chaos™ was born.
                </p>
            </section>

            {/* Meet the Team */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Meet the Founders</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Founder 1 */}
                    <div className="text-center">
                        <img src="/assets/founder1.jpg" alt="Founder 1" className="rounded-full w-32 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">[Founder Name]</h3>
                        <p className="opacity-80">Game Design & Strategy</p>
                    </div>

                    {/* Founder 2 */}
                    <div className="text-center">
                        <img src="/assets/founder2.jpg" alt="Founder 2" className="rounded-full w-32 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">[Founder Name]</h3>
                        <p className="opacity-80">Marketing & Creative Vision</p>
                    </div>

                    {/* Founder 3 */}
                    <div className="text-center">
                        <img src="/assets/founder3.jpg" alt="Founder 3" className="rounded-full w-32 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">[Founder Name]</h3>
                        <p className="opacity-80">Operations & Logistics</p>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="opacity-80">
                    Our goal is simple: <span className="font-bold">to create the most fun, unpredictable, and engaging party games out there</span>.
                    Controlled Chaos™ is just the start—we're working on <span className="font-bold">expansion packs and brand-new games</span> for the future.
                </p>
            </section>
        </div>
    );
}

export default About;
