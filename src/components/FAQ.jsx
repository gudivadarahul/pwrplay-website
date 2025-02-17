import { Disclosure,DisclosureButton,DisclosurePanel } from "@headlessui/react";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

const faqs = [
    { question: "What is Controlled Chaos™?",answer: "Controlled Chaos™ is the ultimate party drinking card game designed to keep players engaged with unique challenges and unpredictable gameplay." },
    { question: "How many people can play?",answer: "You can play with **3 to 10+ players**. The more, the merrier!" },
    { question: "Do I need alcohol to play?",answer: "Nope! You can swap drinks for dares, challenges, or any other fun penalties." },
    { question: "How long does a typical game last?",answer: "A typical game lasts **30 to 60 minutes**, depending on the group size." },
    { question: "When will Controlled Chaos™ be available?",answer: "The game will launch on **Amazon US & Canada in June 2025**." },
    { question: "Will there be expansion packs?",answer: "Yes! We have expansion packs planned for future releases." },
    { question: "Where can I buy the game?",answer: "Controlled Chaos™ will be available on **Amazon US & Canada**." },
];

function FAQ() {
    return (
        <div className="pt-32 px-6 min-h-screen bg-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-headers mb-6 text-center">
                <span className="text-red-600">F</span>requent&nbsp; <span className="text-red-600">A</span>nnoying&nbsp; <span className="text-red-600">Q</span>uestions
                </h1>
                <p className="text-2xl text-center mb-12 font-body font-medium">
                    Got questions? We've got answers. But let's be real—you probably already know how to play!
                </p>

                {/* FAQ List */}
                <div className="space-y-6">
                    {faqs.map((faq,index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <div className="bg-black p-4 rounded-lg shadow-lg border-5 border-red-600 hover:border-red-600 transition-all duration-300">
                                    <DisclosureButton className="flex justify-between items-center w-full text-left text-2xl font-headers font-medium">
                                        {faq.question}
                                        {open ? (
                                            <FaChevronUp className="text-red-600" />
                                        ) : (
                                            <FaChevronDown className="text-red-600" />
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-4 text-gray-300 font-body font-medium">
                                        {faq.answer}
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
