import { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt,FaDirections,FaShoppingCart,FaGamepad } from 'react-icons/fa';

function StoreLocator() {
    const location = useLocation();

    // Retail stores where you can buy the game
    const retailStores = [
        {
            id: 1,
            name: "BoardGame2Go",
            address: "423 Queen St W #106, Toronto, ON M5V 2A5, Canada",
        },
        {
            id: 2,
            name: "Chicagoland Games Dice Dojo",
            address: "5550 N Broadway, Chicago, IL 60640",
        }
    ];

    // Play venues where you can play the game
    const playVenues = [
        {
            id: 1,
            name: "Snakes & Lattes College",
            address: "489 College St, Toronto, ON M6G 1A5, Canada",
        },
        {
            id: 2,
            name: "Snakes & Lattes Chicago",
            address: "1965 N Milwaukee Ave, Chicago, IL 60647",
        }
    ];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    const getDirections = (location) => {
        const address = encodeURIComponent(location.address);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`,'_blank');
    };

    return (
        <div className="relative pt-24 sm:pt-32 px-4 sm:px-6 min-h-screen bg-black">
            {/* Logo in top-left */}
            <div className="absolute -top-6 sm:-top-8 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[201]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-40 sm:w-48 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-5xl sm:text-5xl md:text-8xl font-headers mb-4 sm:mb-6">
                        Find <span className="text-red-600">Controlled Chaos™</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
                        Discover where to buy and play our game
                    </p>
                </div>

                {/* Retail Stores Section */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <FaShoppingCart className="text-red-600 text-2xl" />
                        <h2 className="text-2xl sm:text-3xl font-headers text-white">
                            Buy the Game ({retailStores.length})
                        </h2>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                        {retailStores.map((store,index) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 sm:p-10 rounded-xl border-2 border-red-600 bg-black hover:bg-red-600/5 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-headers text-white mb-4">
                                            {store.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-red-600 flex-shrink-0 text-lg" />
                                            <span className="text-base sm:text-lg text-white/80">{store.address}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-0 sm:ml-6">
                                        <button
                                            onClick={() => getDirections(store)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                                        >
                                            <FaDirections />
                                            <span>Directions</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Play Venues Section */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <FaGamepad className="text-red-600 text-2xl" />
                        <h2 className="text-2xl sm:text-3xl font-headers text-white">
                            Play the Game ({playVenues.length})
                        </h2>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                        {playVenues.map((venue,index) => (
                            <motion.div
                                key={venue.id}
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 sm:p-10 rounded-xl border-2 border-red-600 bg-black hover:bg-red-600/5 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-headers text-white mb-4">
                                            {venue.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-red-600 flex-shrink-0 text-lg" />
                                            <span className="text-base sm:text-lg text-white/80">{venue.address}</span>
                                        </div>
                                        <p className="text-sm text-red-400 mt-2 italic">
                                            *Play venue - game available to play on-site
                                        </p>
                                    </div>
                                    <div className="mt-6 sm:mt-0 sm:ml-6">
                                        <button
                                            onClick={() => getDirections(venue)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                                        >
                                            <FaDirections />
                                            <span>Directions</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 sm:mt-16">
                    <p className="text-lg sm:text-xl text-white/80 mb-6">
                        Don't see a location near you? Contact us to become a retailer or partner with us!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/connect/retailers"
                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                        >
                            Become a Retailer
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                        >
                            Partner with Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreLocator; 