import { useEffect,useState,useRef,useCallback } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { FaChevronDown,FaChevronUp,FaShoppingCart,FaTimes,FaChevronLeft,FaChevronRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';

function BuyNow() {
    const location = useLocation();
    const [boxOpen,setBoxOpen] = useState(false);
    const [shippingOpen,setShippingOpen] = useState(false);
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const clientRef = useRef(null);
    const checkoutRef = useRef(null);
    const [region,setRegion] = useState('USA');
    const [productPrice,setProductPrice] = useState('29.99');
    const [currencyCode,setCurrencyCode] = useState('USD');

    // Add state for image carousel
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
    const productImages = [
        "/box-top-view.png",
        "/box-full-view.png",  // Replace with actual image paths
        "/box-top-view1.png"    // Replace with actual image paths
    ];

    // Add touch handling state
    const [touchStart,setTouchStart] = useState(null);
    const [touchEnd,setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    // Touch handlers
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
    },[touchStart,touchEnd]);

    // Function to navigate to next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to navigate to previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
        );
    };

    // Function to directly navigate to a specific image
    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Parse region from URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const regionParam = params.get('region');

        if (regionParam) {
            setRegion(regionParam);
            setCurrencyCode(regionParam === 'USA' ? 'USD' : 'CAD');
            setProductPrice(regionParam === 'USA' ? '29.99' : '34.99');
        } else {
            // Check localStorage if no region in URL
            const savedRegion = localStorage.getItem("userRegion");
            if (savedRegion) {
                setRegion(savedRegion);
                setCurrencyCode(savedRegion === 'USA' ? 'USD' : 'CAD');
                setProductPrice(savedRegion === 'USA' ? '29.99' : '34.99');
            }
        }
    },[location]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    // Load Shopify Buy SDK
    useEffect(() => {
        // Remove any existing script
        const existingScript = document.getElementById('shopify-buy-sdk');
        if (existingScript) {
            existingScript.remove();
        }

        // Load the SDK script
        const script = document.createElement('script');
        script.id = 'shopify-buy-sdk';
        script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        script.async = true;

        script.onload = () => {
            if (window.ShopifyBuy) {
                // Initialize the client
                const client = window.ShopifyBuy.buildClient({
                    domain: 'epcy6b-j1.myshopify.com',
                    storefrontAccessToken: 'd2e69c8edefcfd2109c193d76ad8977d',
                });

                clientRef.current = client;

                // Create a new checkout
                client.checkout.create().then((checkout) => {
                    checkoutRef.current = checkout;
                    setIsLoading(false);
                }).catch(error => {
                    console.error('Error creating checkout:',error);
                    setIsLoading(false);
                });
            }
        };

        script.onerror = () => {
            console.error('Failed to load Shopify Buy SDK');
            setIsLoading(false);
        };

        document.head.appendChild(script);

        // Cleanup function
        return () => {
            clientRef.current = null;
            checkoutRef.current = null;
        };
    },[]);

    // Calculate the total based on our hardcoded prices
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            // Use our hardcoded price instead of Shopify's price
            const itemPrice = region === 'USA' ? 29.99 : 34.99;
            total += itemPrice * item.quantity;
        });
        return total.toFixed(2);
    };

    // Add to cart function
    const addToCart = () => {
        if (!clientRef.current || !checkoutRef.current) {
            console.error('Shopify client or checkout not initialized');
            return;
        }

        // Only show loading for initial add, not for quantity updates
        const isFirstAdd = cartItems.length === 0;
        if (isFirstAdd) {
            setIsLoading(true);
        }

        // The product ID for Controlled Chaos
        const productId = 'gid://shopify/Product/8205554024627';

        // For products without variants, we need to fetch the default variant ID first
        clientRef.current.product.fetch(productId).then((product) => {
            // Get the first/default variant
            const variantId = product.variants[0].id;

            // Create a line item
            const lineItemsToAdd = [
                {
                    variantId,
                    quantity: 1,
                }
            ];

            // Add the item to the checkout
            return clientRef.current.checkout.addLineItems(
                checkoutRef.current.id,
                lineItemsToAdd
            );
        }).then((checkout) => {
            // Update the checkout reference
            checkoutRef.current = checkout;
            setCartItems(checkout.lineItems);
            setIsCartOpen(true);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error adding item to cart:',error);
            console.error('Error details:',error.message);
            setIsLoading(false);
            // Show an error message to the user
            alert('Failed to add item to cart. Please try again.');
        });
    };

    // Remove from cart function
    const removeFromCart = (lineItemId) => {
        if (!clientRef.current || !checkoutRef.current) {
            return;
        }

        // Don't show loading for item removal
        // setIsLoading(true);

        clientRef.current.checkout.removeLineItems(
            checkoutRef.current.id,
            [lineItemId]
        ).then((checkout) => {
            checkoutRef.current = checkout;
            setCartItems(checkout.lineItems);
            // setIsLoading(false);
        }).catch(error => {
            console.error('Error removing item from cart:',error);

            // If we get an error, refresh the checkout to get the current state
            clientRef.current.checkout.fetch(checkoutRef.current.id)
                .then((freshCheckout) => {
                    checkoutRef.current = freshCheckout;
                    setCartItems(freshCheckout.lineItems);
                })
                .catch(fetchError => {
                    console.error('Error fetching checkout:',fetchError);
                    // If we can't fetch the checkout, create a new one
                    return clientRef.current.checkout.create();
                })
                .then(newCheckout => {
                    if (newCheckout) {
                        checkoutRef.current = newCheckout;
                        setCartItems(newCheckout.lineItems);
                    }
                })
                .finally(() => {
                    // setIsLoading(false);
                });
        });
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        if (checkoutRef.current && checkoutRef.current.webUrl) {
            window.open(checkoutRef.current.webUrl,'_blank');
        }
    };

    // Update item quantity function
    const updateItemQuantity = (lineItemId,quantity) => {
        if (!clientRef.current || !checkoutRef.current) {
            return;
        }

        // If quantity is 0 or less, remove the item completely
        if (quantity <= 0) {
            removeFromCart(lineItemId);
            return;
        }

        clientRef.current.checkout.updateLineItems(
            checkoutRef.current.id,
            [{ id: lineItemId,quantity: quantity }]
        ).then((checkout) => {
            checkoutRef.current = checkout;
            setCartItems(checkout.lineItems);
        }).catch(error => {
            console.error('Error updating item quantity:',error);

            // If we get an error, refresh the checkout to get the current state
            clientRef.current.checkout.fetch(checkoutRef.current.id)
                .then((freshCheckout) => {
                    checkoutRef.current = freshCheckout;
                    setCartItems(freshCheckout.lineItems);
                })
                .catch(fetchError => {
                    console.error('Error fetching checkout:',fetchError);
                    // If we can't fetch the checkout, create a new one
                    return clientRef.current.checkout.create();
                })
                .then(newCheckout => {
                    if (newCheckout) {
                        checkoutRef.current = newCheckout;
                        setCartItems(newCheckout.lineItems);
                    }
                });
        });
    };

    return (
        <>
            <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />

            <div className="pt-24 sm:pt-32 px-6 min-h-screen relative">
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

                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-headers mb-8 sm:mb-12 text-center">
                        <span className="text-red-600">Controlled Chaos™</span>
                    </h1>

                    {/* Cart Icon */}
                    <div className="fixed bottom-6 right-6 z-40">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative transition-colors duration-200"
                        >
                            <FaShoppingCart className="text-2xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                    {cartItems.reduce((total,item) => total + item.quantity,0)}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Cart Sidebar - Restructured with subtotal at bottom */}
                    {isCartOpen && (
                        <div className="fixed inset-y-0 right-0 z-50 pt-16">
                            <div className="absolute inset-y-0 right-0 w-screen max-w-md pt-16">
                                <div className="h-full flex flex-col bg-black shadow-xl">
                                    {/* Cart header */}
                                    <div className="py-6 px-4 sm:px-6 border-b border-gray-800">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                                            <button
                                                onClick={() => setIsCartOpen(false)}
                                                className="ml-3 h-7 flex items-center"
                                            >
                                                <FaTimes className="h-6 w-6 text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cart items - scrollable area */}
                                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                                        {cartItems.length === 0 ? (
                                            <div className="mt-8">
                                                <p className="text-center text-white">Your cart is empty</p>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                {cartItems.map((item,index) => (
                                                    <div key={item.id} className={`flex flex-col pb-4 ${index !== cartItems.length - 1 ? 'border-b border-gray-800 mb-4' : ''}`}>
                                                        {/* Product image and details */}
                                                        <div className="flex items-start mb-3">
                                                            <div className="w-20 h-20 flex-shrink-0 mr-4 bg-transparent rounded overflow-hidden">
                                                                <img
                                                                    src="/box-top-view.png"
                                                                    alt={item.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex justify-between items-center">
                                                                    <p className="font-bold text-xl">{item.title}</p>
                                                                    <button
                                                                        onClick={() => removeFromCart(item.id)}
                                                                        className="text-red-500 hover:text-white transition-colors duration-200 ml-2"
                                                                    >
                                                                        <i className="fa-solid fa-times text-lg"></i>
                                                                    </button>
                                                                </div>
                                                                {/* Display our hardcoded price instead of Shopify's price */}
                                                                <p className="text-red-500 font-bold mt-2">
                                                                    {currencyCode} ${region === 'USA' ? '29.99' : '34.99'}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Quantity Counter */}
                                                        <div className="mt-2 flex items-center">
                                                            <span className="text-xl text-white mr-3 font-medium">Quantity</span>
                                                            <div className="flex items-center border-2 border-white rounded-full overflow-hidden">
                                                                <button
                                                                    onClick={() => item.quantity <= 1 ? removeFromCart(item.id) : updateItemQuantity(item.id,item.quantity - 1)}
                                                                    className="px-3 py-1 bg-black hover:bg-gray-900 text-white"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-3 py-1 bg-black text-white min-w-[30px] text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateItemQuantity(item.id,item.quantity + 1)}
                                                                    className="px-3 py-1 bg-black hover:bg-gray-900 text-white"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Subtotal and checkout - fixed at bottom */}
                                    {cartItems.length > 0 && (
                                        <div className="border-t border-gray-800 px-4 sm:px-6 py-6">
                                            <div className="flex justify-between mb-6">
                                                <span className="text-xl text-white font-medium">Subtotal</span>
                                                <span className="text-xl text-red-600 font-bold">
                                                    {currencyCode} ${calculateTotal()}
                                                </span>
                                            </div>

                                            <button
                                                onClick={proceedToCheckout}
                                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <span>Checkout</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left side - Product Image Carousel */}
                        <div className="relative">
                            {/* Main image container with fixed aspect ratio */}
                            <div
                                className="bg-black/30 rounded-lg overflow-hidden relative aspect-square border-2 border-red-600 shadow-lg shadow-red-500/30"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Image */}
                                <img
                                    src={productImages[currentImageIndex]}
                                    alt={`Controlled Chaos Game - Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain"
                                    draggable="false" // Prevent image dragging during swipe
                                />

                                {/* Navigation arrows - hidden on small screens */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden sm:block hover:bg-black/70 transition-colors"
                                    aria-label="Previous image"
                                >
                                    <FaChevronLeft className="text-xl" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden sm:block hover:bg-black/70 transition-colors"
                                    aria-label="Next image"
                                >
                                    <FaChevronRight className="text-xl" />
                                </button>
                            </div>

                            {/* Navigation dots */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {productImages.map((_,index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${currentImageIndex === index ? 'bg-red-600' : 'bg-gray-400'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right side - Product Details and Buy Button */}
                        <div className="md:pt-16">
                            {/* Game Benefits and Contents as Bullet Points */}
                            <div className="mb-6 md:mb-10 space-y-4 md:space-y-6">
                                {/* What You'll Get */}
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-headers text-red-600 mb-2 md:mb-4 text-center md:text-left">What's Inside</h3>
                                    <ul className="space-y-2 md:space-y-3">
                                        {[
                                            "250+ unique cards across 4 different decks",
                                            "Custom spinner with 4 chaotic categories",
                                            "Endless laughs and unforgettable moments",
                                            "The perfect ice-breaker for any party",
                                            "A game that keeps everyone involved - no waiting around"
                                        ].map((item,index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="inline-block w-2 h-2 md:w-3 md:h-3 mr-2 md:mr-3 border-2 border-red-500 rounded-full flex-shrink-0 mt-2"></span>
                                                <span className="text-base md:text-2xl opacity-90">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Custom Buy Button */}
                            <div className="flex justify-center items-center w-full mb-8">
                                <button
                                    onClick={addToCart}
                                    disabled={isLoading}
                                    className={`bg-red-600 hover:bg-red-700 text-white font-bold text-lg md:text-xl py-3 md:py-4 px-6 md:px-10 rounded-full min-w-[160px] md:min-w-[200px] text-center transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Loading...' : `Add to Cart - ${currencyCode} $${productPrice}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyNow;
