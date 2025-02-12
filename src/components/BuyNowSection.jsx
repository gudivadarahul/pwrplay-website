function BuyNowSection() {
    return (
        <section className="bg-black text-white py-16 px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Get Your Copy Now!</h2>
            <p className="text-lg opacity-80 mb-8">
                Limited stock available! Don't miss out on the most chaotic party game of the year.
            </p>

            {/* Product Image */}
            <div className="max-w-lg mx-auto mb-6">
                <img
                    src="/box-top-view.png"
                    alt="Controlled Chaos™ Game Box"
                    className="rounded-lg shadow-lg"
                />
            </div>

            {/* Buy Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <a
                    href="https://www.amazon.com/dp/YOUR_PRODUCT_ID" // Replace with actual Amazon US link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-bold hover:scale-105 transition"
                >
                    Buy Now (Amazon U.S.)
                </a>
                <a
                    href="https://www.amazon.ca/dp/YOUR_PRODUCT_ID" // Replace with actual Amazon Canada link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-bold hover:scale-105 transition"
                >
                    Buy Now (Amazon Canada)
                </a>
            </div>
        </section>
    );
}

export default BuyNowSection;
