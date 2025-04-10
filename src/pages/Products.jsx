import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [region,setRegion] = useState("USA");
  const [currency,setCurrency] = useState("USD");
  const [loading,setLoading] = useState(true);
  const [productData,setProductData] = useState(null);

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
      image: "/box-top-view1.png",
      link: "/buy"
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

  return (
    <div className="container mx-auto px-4 py-40 relative">
      {/* Logo in top-left */}
      <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[30]">
        <Link to="/" className="block">
          <img
            src="/pwrplay-logo.png"
            alt="PWRPLAY Logo"
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
          />
        </Link>
      </div>

      <h1 className="text-7xl font-headers mb-12 text-center">
        <span className="text-white">Our</span>{" "}
        <span className="text-red-600">Products</span>
      </h1>

      <div className="max-w-lg mx-auto mb-8">
        <div className="flex justify-end">
          <select
            value={region}
            onChange={handleRegionChange}
            className="bg-zinc-800 text-white border border-gray-600 rounded px-3 py-2"
          >
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl">Loading product information...</p>
          </div>
        ) : (
          productData && productData.map((product) => (
            <Link to={`${product.link}?region=${region}`} key={product.id} className="group block">
              <div className="bg-zinc-900 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 p-4 max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
                <div className="mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name.main}
                    className="w-full h-auto object-contain mx-auto"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium mb-1">
                    <div className="text-xl sm:text-2xl md:text-3xl">{product.name.main}</div>
                    <div className="text-xl sm:text-2xl md:text-3xl mt-1 text-gray-300">{product.name.tagline}</div>
                  </h3>
                  <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-4">
                    {region === "USA" ? "USD" : "CAD"} ${product.prices[region]?.toFixed(2) || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Products; 