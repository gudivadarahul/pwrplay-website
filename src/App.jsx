import { Routes,Route,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
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
import Ambassador from "./pages/Ambassador";
import StoreLocator from "./pages/StoreLocator";
import { initGA,trackPageView } from './config/analytics';
import ScrollToTop from "./components/ScrollToTop";
import Products from "./pages/Products";
import NotificationPopup from './components/NotificationPopup';

function AppContent() {
  const [showPopup,setShowPopup] = useState(false);
  const [emailSubmitted,setEmailSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0,0);
    }
  },[]);

  useEffect(() => {
    // Initialize Google Analytics with your measurement ID
    initGA('G-GED2BCB4MJ');
  },[]);

  useEffect(() => {
    // Track page views whenever the location changes
    trackPageView(location.pathname + location.search);
  },[location]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-headers: 'Bebas Neue', sans-serif;
        --font-body: 'Montserrat', sans-serif;
      }
      
      /* Hide scrollbar for all browsers */
      html, body {
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-y: scroll;
      }
      
      /* Hide scrollbar for Chrome, Safari and Opera */
      html::-webkit-scrollbar, 
      body::-webkit-scrollbar, 
      ::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        display: none !important;
      }
      
      /* Additional selector for Chrome */
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
      }
      
      /* For IE/Edge */
      * {
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  },[]);

  // Show popup on specific pages
  useEffect(() => {
    if (!emailSubmitted) {
      // Pages where the popup should appear:
      // - '/' - Homepage
      // - '/buy' - Buy page
      // Only showing on homepage and buy page as requested
      const showablePages = ['/','/buy'];

      const isOnShowablePage = showablePages.includes(location.pathname);

      if (isOnShowablePage) {
        // Use a longer delay for homepage to wait for animations to complete
        const delayTime = location.pathname === '/' ? 4000 : 3000; // 5.5 seconds for homepage, 2 seconds for other pages

        // Show popup after the appropriate delay
        const timer = setTimeout(() => {
          setShowPopup(true);
        },delayTime);

        return () => clearTimeout(timer);
      } else {
        setShowPopup(false);
      }
    } else {
      // Hide popup for current page view if email was submitted
      setShowPopup(false);

      // Reset emailSubmitted after navigating away, so popup can show again on next visit
      const resetTimer = setTimeout(() => {
        setEmailSubmitted(false);
      },30000); // Reset after 30 seconds

      return () => clearTimeout(resetTimer);
    }
  },[location.pathname,emailSubmitted]);

  const handleEmailSubmit = () => {
    setEmailSubmitted(true);
    setShowPopup(false);
  };

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-black text-white overflow-auto">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/buy" element={<BuyNow />} />
            <Route path="/buy-now" element={<BuyNow />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/controlled-chaos" element={<ControlledChaos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connect/retailers" element={<Retailers />} />
            <Route path="/about/timeline" element={<Timeline />} />
            <Route path="/ambassador" element={<Ambassador />} />
            <Route path="/store-locator" element={<StoreLocator />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {showPopup && (
        <NotificationPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleEmailSubmit}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
