function PromoVideo() {
    return (
        <section className="relative bg-black text-white py-24 px-6 text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-headers mb-12 fade-in">
                    The <span className="text-red-600">Ultimate</span> Party Game
                </h2>

                <div className="relative aspect-[9/16] w-full max-w-[400px] mx-auto backdrop-blur-sm bg-white/5 rounded-xl p-2">
                    <iframe
                        className="w-full h-full rounded-lg shadow-2xl"
                        src="https://www.youtube-nocookie.com/embed/EyTudnuRU_Y"
                        title="Controlled Chaos Promo Video"
                        frameBorder="0"
                        referrerPolicy="no-referrer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default PromoVideo; 