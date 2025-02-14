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
        <div className="p-8 text-white max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Frequently Annoying Questions (a.k.a FAQs)</h1>
            <p className="text-lg opacity-80 text-center mb-12">
                Got questions? We've got answers. But let's be real—you probably already know how to play!
            </p>

            {/* FAQ List */}
            <div className="space-y-6">
                {faqs.map((faq,index) => (
                    <Disclosure key={index}>
                        {({ open }) => (
                            <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                                <DisclosureButton className="flex justify-between items-center w-full text-left text-lg font-bold">
                                    {faq.question}
                                    {open ? <FaChevronUp /> : <FaChevronDown />}
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-gray-300">
                                    {faq.answer}
                                </DisclosurePanel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
