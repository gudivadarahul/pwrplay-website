import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { GiCardRandom, GiCardPlay, GiCardDraw, GiCardDiscard, GiCardPickup } from "react-icons/gi";
import { FaTrophy, FaGlassCheers, FaCocktail, FaGlassWhiskey, FaBeer, FaWineGlassAlt, FaGamepad } from "react-icons/fa";
import { MdSportsBar } from "react-icons/md";
import { BsController } from "react-icons/bs";

function Products() {
  const [region,setRegion] = useState("USA");
  const [currency,setCurrency] = useState("USD");
  const [loading,setLoading] = useState(true);
  const [productData,setProductData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  // Pre-render icons for faster initial display
  useEffect(() => {
    // Set icons as loaded immediately
    setIconsLoaded(true);
  }, []);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial product structure with hardcoded prices that match your Shopify settings
  const products = [
    {
      id: 1,
      name: {
        main: "Controlled Chaos™",
        tagline: "The Ultimate Drinking Game"
      },
      shopifyId: "8205554024627",
      prices: {
        USA: 29.99, // USD price
        Canada: 34.99 // CAD price
      },
      image: "/main_img.jpeg",
      link: "/buy",
      isNew: true  // Added isNew flag
    }
  ];

  // Fetch product data from Shopify - simplified to just load the SDK for future use
  useEffect(() => {
    const loadShopifySDK = () => {
      return new Promise((resolve,reject) => {
        if (window.ShopifyBuy) {
          resolve(window.ShopifyBuy);
          return;
        }

        const script = document.createElement('script');
        script.id = 'shopify-buy-sdk';
        script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        script.async = true;

        script.onload = () => {
          if (window.ShopifyBuy) {
            resolve(window.ShopifyBuy);
          } else {
            reject(new Error('Shopify Buy SDK failed to load'));
          }
        };

        script.onerror = () => {
          reject(new Error('Failed to load Shopify Buy SDK'));
        };

        document.head.appendChild(script);
      });
    };

    const initializeShopify = async () => {
      setLoading(true);
      try {
        // Just load the SDK for future use
        await loadShopifySDK();

        // Use the hardcoded prices since we know what they should be
        setProductData(products);

        console.log("Using hardcoded prices:",products[0].prices);
      } catch (error) {
        console.error("Error initializing Shopify:",error);
        setProductData(products); // Still use hardcoded prices on error
      } finally {
        setLoading(false);
      }
    };

    initializeShopify();
  },[]);

  // Region detection/selection logic
  useEffect(() => {
    const savedRegion = localStorage.getItem("userRegion");
    if (savedRegion) {
      setRegion(savedRegion);
      setCurrency(savedRegion === "USA" ? "USD" : "CAD");
    } else {
      setRegion("USA");
      setCurrency("USD");
    }
  },[]);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    setCurrency(newRegion === "USA" ? "USD" : "CAD");
    localStorage.setItem("userRegion",newRegion);
  };

  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.location.reload();
    }
  };

  // Game piece icons components array - only keeping preferred icons
  const gameIcons = [
    <BsController key="controller" />,
    <FaTrophy key="trophy" />,
    <GiCardPlay key="card-play" />,
    <FaGlassCheers key="cheers" />,
    <FaCocktail key="cocktail" />,
    <FaGlassWhiskey key="whiskey" />,
    <FaBeer key="beer" />,
    <FaWineGlassAlt key="wine" />,
    <GiCardRandom key="card-random" />,
    <GiCardDraw key="card-draw" />,
    <GiCardDiscard key="card-discard" />,
    <GiCardPickup key="card-pickup" />,
    <FaGamepad key="gamepad" />,
    <MdSportsBar key="sports-bar" />
  ];

  // Create a larger array with duplicated icons to ensure full rows
  const extendedIcons = [...gameIcons, ...gameIcons.slice(0, 20)];

  return (
    <>
      {/* Animated floating game piece icons in grid - fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <style>
          {`
            @keyframes fadeInIcon {
              from { opacity: 0; }
              to { opacity: 0.3; }
            }
            .icon-grid-container {
              opacity: 1;
            }
            .icon-grid-container .grid-icon {
              animation: fadeInIcon 0.05s forwards, float-grid 4s ease-in-out infinite;
              animation-delay: 0s, 0.05s;
              color: rgba(239, 68, 68, 0.9);
            }
          `}
        </style>
        <div className={`grid-background icon-grid-container ${iconsLoaded ? 'loaded' : ''}`}>
          {Array.from({ length: isMobile ? 42 : 56 }).map((_, index) => {
            // Calculate grid position - 6 columns on mobile, 8 columns on larger screens
            const numCols = isMobile ? 6 : 8;
            const col = index % numCols;
            const row = Math.floor(index / numCols);
            
            // Use modulo to cycle through the available icons
            const iconIndex = index % gameIcons.length;
            
            // Calculate position based on screen size
            const leftPosition = isMobile
              ? col * (100 / 6) + 4  // Mobile: 6 columns
              : col * 12.5 + 4;      // Desktop: 8 columns
            
            // Calculate animation duration based on index (staggered)
            const animationDuration = 6 + (index % 3);
            
            return (
              <div 
                key={`icon-${index}`}
                className="floating-icon grid-icon text-3xl sm:text-4xl md:text-5xl"
                style={{
                  position: 'absolute',
                  left: `${leftPosition}%`,
                  top: `${row * 14 + 10}%`,
                  transform: `rotate(${(index % 3 - 1) * 10}deg)`,
                  animationDelay: `0s, 0.05s`, // Same delay for all icons
                  animationDuration: `0.05s, ${animationDuration}s`,
                  opacity: 0
                }}
              >
                {gameIcons[iconIndex]}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-16 -left-1 sm:-left-2 md:-left-3 z-[201]">
        <Link to="/" onClick={() => handleNavClick('/')} className="block">
          <img
            src="/pwrplay-logo.png"
            alt="PWRPLAY Logo"
            className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-80 h-auto cursor-pointer"
          />
        </Link>
      </div>

      <div className="container mx-auto px-4 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-40 relative overflow-hidden">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headers mt-3 sm:mt-0 mb-10 sm:mb-10 md:mb-12 text-center relative z-10">
          <span className="text-white">Our</span>{" "}
          <span className="text-red-600">Products</span>
        </h1>

        <div className="max-w-lg mx-auto relative z-10 mt-2 sm:mt-0">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl">Loading product information...</p>
            </div>
          ) : (
            productData && productData.map((product) => (
              <Link to={`${product.link}?region=${region}`} key={product.id} className="group block">
                <div className="flex flex-col items-center">
                  {/* Add custom animation keyframes */}
                  <style jsx="true">{`
                    @keyframes bounce-subtle {
                      0%, 100% {
                        transform: translateY(0);
                      }
                      50% {
                        transform: translateY(-15px);
                      }
                    }
                    .product-bounce {
                      animation: bounce-subtle 1.5s ease-in-out infinite;
                      transition: all 0.3s;
                    }
                    .product-bounce:hover {
                      transform: translateY(-5px);
                    }
                  `}</style>
                  
                  {/* Product Image with Red Border and Bounce animation */}
                  <div className="product-bounce rounded-lg overflow-hidden max-w-md sm:max-w-lg mx-auto w-full mb-4 relative product-card border-4 border-red-600 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/50 cursor-pointer">
                    {/* NEW badge */}
                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full z-10">
                        NEW
                      </div>
                    )}
                    
                    {/* PRE-ORDER badge - styled to match NEW badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full z-10">
                      PRE-ORDER
                    </div>
                    
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name.main}
                        className="w-full h-auto mx-auto object-cover"
                        style={{ 
                          minHeight: "400px",
                          transformOrigin: "center center"
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Product Details Outside the Box */}
                  <div className="text-center max-w-md sm:max-w-lg mx-auto w-full mt-3">
                    <h3 className="font-medium mb-1">
                      <div className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">{product.name.main}</div>
                      <div className="text-xl sm:text-2xl mt-2 text-gray-300">{product.name.tagline}</div>
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Products; 