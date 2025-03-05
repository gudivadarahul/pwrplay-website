import { useState } from "react";
import API_URL from '../config/api';

function JoinTheChaos() {
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [attempts,setAttempts] = useState(0);
    const MAX_ATTEMPTS = 3;

    // Basic email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check rate limiting
        if (attempts >= MAX_ATTEMPTS) {
            setMessage("Too many attempts. Please try again later.");
            return;
        }

        // Client-side email validation
        if (!isValidEmail(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage("");
        setAttempts(prev => prev + 1);

        try {
            const response = await fetch(`${API_URL}/mailchimp`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'subscribe',
                    data: { email }
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage("Thanks for joining our community! We've sent you a welcome email.");
                setEmail("");
                // Reset attempts on successful subscription
                setAttempts(0);
            } else {
                if (data.error.includes("already subscribed")) {
                    setMessage("You're already part of our community!");
                } else {
                    setMessage(data.error || "Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-24">
            <div className="bg-black/50 p-8 rounded-xl border-3 border-red-600">
                <h2 className="text-4xl font-headers text-center">
                    Join the <span className="text-red-600 leading-relaxed align-baseline">pwrplay</span> community
                </h2>
                <p className="text-xl mb-8 text-center font-body font-medium">
                    Be the first to hear about exclusive deals, expansions & new games!
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading || attempts >= MAX_ATTEMPTS}
                        className="flex-grow px-4 py-3 bg-black text-white border-2 border-white rounded-lg 
                        focus:border-red-600 focus:outline-none transition-colors placeholder:font-medium 
                        [-webkit-text-fill-color:white] [&:-webkit-autofill]:bg-black 
                        [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_black_inset] 
                        [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={loading || attempts >= MAX_ATTEMPTS}
                        className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg font-bold
                        hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 
                        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {message && (
                    <p className={`mt-4 text-center text-xl font-body font-medium ${message.includes("already part") || message.includes("Thanks")
                        ? "text-red-600"
                        : "text-yellow-500"
                        }`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default JoinTheChaos;
