import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import BuyNow from "./pages/BuyNow";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import ControlledChaos from "./pages/ControlledChaos";
import Contact from "./pages/Contact";
import Retailers from "./pages/Retailers";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<BuyNow />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/controlled-chaos" element={<ControlledChaos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connect/retailers" element={<Retailers />} />
          <Route path="/about/timeline" element={<Timeline />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
