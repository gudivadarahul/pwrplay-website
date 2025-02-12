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
        <section className="bg-gray-900 text-white py-16 px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Join the Chaos</h2>
            <p className="text-lg opacity-80 mb-8">
                Be the first to hear about exclusive deals, expansions & new games!
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 w-80 rounded-lg text-white text-lg bg-transparent border-2 border-white placeholder-white/70"
                />
                <button
                    type="submit"
                    className="bg-white text-black px-6 py-3 rounded-lg text-lg font-bold hover:scale-105 transition hover:bg-white/80"
                >
                    Sign Up
                </button>
            </form>

            {/* Success Message */}
            {message && <p className="mt-4 text-green-400 text-lg">{message}</p>}
        </section>
    );
}

export default JoinTheChaos;
