import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Disclosure,DisclosureButton,DisclosurePanel } from "@headlessui/react";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const faqs = [
    {
        question: "What is PWRPLAY Creations?",
        answer: "PWRPLAY Creations Inc. is a game development company dedicated to reinventing the way people connect. We create engaging, hilarious, and unforgettable party games that bring energy to game nights. Our first game, Controlled Chaos™, is just the beginning."
    },
    {
        question: "Who are the founders of PWRPLAY Creations?",
        answer: "PWRPLAY Creations was founded by three friends who share a passion for game nights, fun experiences, and a bit of controlled chaos. Our team brings together creativity, strategy, and a love for innovative games that bring people together."
    },
    {
        question: "What makes PWRPLAY Creations different from other game companies?",
        answer: "We focus on immersive, high-energy experiences that keep players engaged from start to finish. Our games are built for maximum interaction—no waiting around, no slow gameplay, just pure, unfiltered fun."
    },
    {
        question: "Are there more games coming after Controlled Chaos™?",
        answer: "Yes! While Controlled Chaos™ is our first release, we have big plans for future games and expansions. Stay tuned!"
    },
    {
        question: "What is Controlled Chaos™?",
        answer: "Controlled Chaos™ is a fast-paced, high-energy drinking party game that's all about unpredictable moments, friendly (or not-so-friendly) competition, and endless laughs. Players take turns spinning the Control Center to determine what crazy challenge, callout, or twist comes next."
    },
    {
        question: "How do you play Controlled Chaos™?",
        answer: "It's simple! The Control Center spinner decides which deck you draw from—whether it's an outrageous challenge, an 'ick' callout, or a wild group vote. Follow the card's instructions, embrace the chaos, and see where the night takes you."
    },
    {
        question: "Is Controlled Chaos™ a drinking game?",
        answer: "Yes, Controlled Chaos™ is designed as a 21+ drinking game. However, it can also be played without alcohol, making it just as fun for any kind of game night."
    },
    {
        question: "How many players can play Controlled Chaos™?",
        answer: "We recommend 4 or more players for the best experience, but the more, the merrier! There's no strict player limit—just bring enough energy to keep up with the chaos."
    },
    {
        question: "How long does a game of Controlled Chaos™ last?",
        answer: "Games typically last 30+ minutes, depending on the number of players and how deep into the chaos you want to go."
    },
    {
        question: "What's included in the game?",
        answer: "The Control Center Spinner – Your fate is in its hands\n4 Unique Card Decks – Each with its own twist on the game\n200+ Cards – Enough variety to keep things fresh every round"
    },
    {
        question: "Where can I buy Controlled Chaos™?",
        answer: (
            <span>
                You can find Controlled Chaos™ on our site at{' '}
                <Link to="/" className="text-red-600 hover:text-red-400 underline">
                    pwrplaycreations.com
                </Link>
                ! You can also find it at game stores - check our{' '}
                <Link to="/store-locator" className="text-red-600 hover:text-red-400 underline">
                    store finder page
                </Link>
                {' '}to locate retailers near you.
            </span>
        )
    },
    {
        question: "Will Controlled Chaos™ be available outside of Canada?",
        answer: "Yes! We have already launched in Canada and the USA, with plans to expand to more regions. Keep an eye out for updates."
    },
    {
        question: "Is Controlled Chaos™ family-friendly?",
        answer: "Not quite—this game is meant for adults (21+ recommended). But if your family thrives on roasting each other, high-energy competition, and hilarious dares, then maybe…"
    },
    {
        question: "Do you ship internationally?",
        answer: "For now, we'll be focusing on Canada and the USA, but we plan to expand to other regions soon!"
    },
    {
        question: "What is your return policy?",
        answer: "We stand by our game! If there are any issues with your order, we'll work with you to make it right. Stay tuned for our full return policy when we launch."
    },
    {
        question: "Other Questions?",
        answer: "If you have any other questions, feel free to reach out to us on social media [@pwrplayofficial] or via email [contact@pwrplaycreations.com].\nWe love hearing from our community!"
    }
];

function FAQ() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    const renderAnswer = (answer) => {
        // If answer is JSX, render it directly
        if (typeof answer !== 'string') {
            return <div className="mb-2">{answer}</div>;
        }

        const paragraphs = answer.split('\n');

        return paragraphs.map((paragraph,index) => {
            // Break up email addresses so browsers don't auto-link them
            const formattedText = paragraph.replace(
                /\[([^\]]+)@([^\]]+\.[^\]]+)\]/g,
                '<span class="text-red-600">$1<span style="display:none">-no-auto-link-</span>@<span style="display:none">-no-auto-link-</span>$2</span>'
            );

            // Handle social media handles
            const finalText = formattedText.replace(
                /\[@([^\]]+)\]/g,
                '<span class="text-red-600">@$1</span>'
            );

            return (
                <p
                    key={index}
                    className="mb-2 last:mb-0"
                    dangerouslySetInnerHTML={{ __html: finalText }}
                />
            );
        });
    };

    return (
        <div className="pt-30 sm:pt-32 px-6 min-h-screen bg-black">
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

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-headers mb-4 sm:mb-6 text-center leading-tight">
                    <span className="text-red-600">F</span>requent <span className="text-red-600">A</span>nnoying <span className="text-red-600">Q</span>uestions
                </h1>

                {/* FAQ List */}
                <div className="space-y-6">
                    {faqs.map((faq,index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <div className="bg-black p-4 rounded-lg shadow-lg border-3 border-red-600 hover:border-red-600 transition-all duration-300">
                                    <DisclosureButton className="flex justify-between items-center w-full text-left text-base sm:text-2xl md:text-3xl font-headers font-bold">
                                        {faq.question}
                                        {open ? (
                                            <FaChevronUp className="text-red-600 text-sm sm:text-base" />
                                        ) : (
                                            <FaChevronDown className="text-red-600 text-sm sm:text-base" />
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-3 sm:mt-4 text-sm sm:text-xl md:text-2xl text-gray-300 font-body font-medium">
                                        <div className="mt-2">
                                            {renderAnswer(faq.answer)}
                                        </div>
                                    </DisclosurePanel>
                                </div>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
