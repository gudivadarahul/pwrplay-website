import Hero from "../components/Hero";
import Features from "../components/Features";
import HowToPlay from "../components/HowToPlay";
import BuyNowSection from "../components/BuyNowSection";
import JoinTheChaos from "../components/Join";

function Home() {
    return (
        <div>
            <Hero />
            <Features />
            <HowToPlay />
            <BuyNowSection />
            <JoinTheChaos />
        </div>
    );
}

export default Home;
