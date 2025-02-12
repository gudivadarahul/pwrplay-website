import { FaBeer,FaUsers,FaGamepad } from "react-icons/fa"; // Import icons

function Features() {
    return (
        <section className="bg-black text-white py-16 px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Why Choose Controlled Chaos™?</h2>
            <p className="text-lg opacity-80 mb-12">
                More than just a drinking game – it’s strategy, challenges, and unpredictable fun!
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Feature 1: Fun Challenges */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaGamepad className="text-primary text-5xl mb-4" />
                    <h3 className="text-2xl font-bold">Exciting Challenges</h3>
                    <p className="mt-2 opacity-80">
                        Every card keeps the game fresh, making sure no two rounds are the same.
                    </p>
                </div>

                {/* Feature 2: Social & Interactive */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaUsers className="text-primary text-5xl mb-4" />
                    <h3 className="text-2xl font-bold">Perfect for Groups</h3>
                    <p className="mt-2 opacity-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </p>
                </div>

                {/* Feature 3: Drinks & Strategy */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaBeer className="text-primary text-5xl mb-4" />
                    <h3 className="text-2xl font-bold">A Unique Drinking Game</h3>
                    <p className="mt-2 opacity-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Features;
