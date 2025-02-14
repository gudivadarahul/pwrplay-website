import { useState } from "react";

function JoinTheChaos() {
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulating email submission (Replace this with actual backend/API call)
        setTimeout(() => {
            setMessage("Thanks for joining the chaos! 🎉");
            setEmail("");
        },1000);
    };

    return (
        <section className="relative bg-black text-white py-24 px-6 text-center overflow-hidden">
            {/* Content Container with z-index to stay above background */}
            <div className="relative z-10 max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-headers mb-6 fade-in">
                    Join the <span className="text-red-600">CHAOS</span>
                </h2>
                <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed slide-up font-body font-light">
                    Be the first to hear about exclusive deals, expansions & new games!
                </p>

                {/* Email Signup Form */}
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center button-fade">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-6 py-4 w-80 rounded-lg text-white text-lg bg-transparent 
                        border-2 border-red-600 placeholder-white/70 focus:outline-none 
                        focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    />
                    <button
                        type="submit"
                        className="px-6 py-4 bg-red-600 transition-all duration-300 rounded-lg text-lg font-bold
                            hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 outline-none"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Success Message */}
                {message && (
                    <p className="mt-6 text-green-400 text-xl font-bold slide-up">
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}

export default JoinTheChaos;
