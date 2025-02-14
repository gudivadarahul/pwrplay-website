import Hero from "../components/Hero";
import Join from "../components/Join";
import WhoWeAre from "../components/WhoWeAre";
import PromoVideo from "../components/PromoVideo";
import Testimonials from "../components/Testimonials";

function Home() {
    return (
        <div>
            <Hero />
            <WhoWeAre />
            <PromoVideo />
            <Testimonials />
            <Join />
        </div>
    );
}

export default Home;
