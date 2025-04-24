import { useEffect,useState,useRef,useCallback } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { FaChevronDown,FaChevronUp,FaShoppingCart,FaTimes,FaChevronLeft,FaChevronRight,FaTag } from 'react-icons/fa';
import { GiBottleCap,GiGlassShot } from "react-icons/gi";
import Navbar from '../components/Navbar';
import NotificationPopup from '../components/NotificationPopup';

function BuyNow() {
    const location = useLocation();
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const clientRef = useRef(null);
    const checkoutRef = useRef(null);
    const [region,setRegion] = useState('USA');
    const [productPrice,setProductPrice] = useState('29.99');
    const [currencyCode,setCurrencyCode] = useState('USD');
    const [showDiscountPopup,setShowDiscountPopup] = useState(false);

    // Add state for image carousel
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
    const productImages = [
        "/main_img.jpeg",
        "/img_gal2.jpeg",
        "/img_gal3.jpeg",
        "/img_gal4.jpeg",
        "/img_gal5.jpeg",
        "/img_gal6.jpeg",
        "/img_gal7.jpeg",
        "/img_gal8.jpeg"
    ];

    // Add touch handling state
    const [touchStart,setTouchStart] = useState(null);
    const [touchEnd,setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    // Prevent background scrolling when cart is open
    useEffect(() => {
        const preventScroll = (e) => {
            // Allow scrolling within the cart content, prevent on the background
            const cartContent = document.querySelector('.cart-content');
            const isCartContentScrollable = cartContent && cartContent.scrollHeight > cartContent.clientHeight;

            // Only prevent default if the event target is not within the scrollable cart content
            if (!e.target.closest('.cart-content') || !isCartContentScrollable) {
                e.preventDefault();
            }
        };

        if (isCartOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;

            // Add overflow hidden to body
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            // Add touchmove event listener for mobile
            document.addEventListener('touchmove',preventScroll,{ passive: false });
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0,parseInt(scrollY || '0') * -1);

            // Remove event listener
            document.removeEventListener('touchmove',preventScroll);
        }

        // Cleanup function
        return () => {
            document.removeEventListener('touchmove',preventScroll);
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    },[isCartOpen]);

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
                    domain: 'pwrplaycreations.myshopify.com',
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
            // Skip virtual promotional items when calculating total
            if (item.isVirtualItem) {
                return; // Skip this item - it's a virtual display item
            }

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

        // The product IDs
        const gameId = 'gid://shopify/Product/8205554024627'; // Controlled Chaos

        // Check if the cart already has the game
        const hasGame = cartItems.some(item =>
            !item.customAttributes ||
            !item.customAttributes.length ||
            !item.customAttributes.some(attr => attr.key === 'Promotional')
        );

        // Fetch the game product first
        clientRef.current.product.fetch(gameId).then((gameProduct) => {
            // Get the variant IDs
            const gameVariantId = gameProduct.variants[0].id;

            // Create line items to add - ONLY add the main game, not promotional items
            const lineItemsToAdd = [];

            // Only add the game if it's not already in cart
            if (!hasGame) {
                // Create a line item without visible custom attributes that show in checkout
                lineItemsToAdd.push({
                    variantId: gameVariantId,
                    quantity: 1
                    // No custom attributes that would show in checkout
                });
            }

            // If nothing to add (already has the game), just open cart
            if (lineItemsToAdd.length === 0) {
                setIsCartOpen(true);
                setIsLoading(false);
                return Promise.resolve(checkoutRef.current);
            }

            // Add the items to the checkout
            return clientRef.current.checkout.addLineItems(
                checkoutRef.current.id,
                lineItemsToAdd
            );
        }).then((checkout) => {
            // Update the checkout reference
            checkoutRef.current = checkout;

            // Create a modified version of the line items for display purposes only
            const displayLineItems = [...checkout.lineItems];

            // If this is the first add, add the virtual promotional items
            if (isFirstAdd) {
                const mainGame = displayLineItems[0]; // The game we just added

                if (mainGame) {
                    // Create virtual promotional items for display only (not sent to Shopify)
                    const shotGlassItem = {
                        id: 'display-shot-glass-' + Date.now(),
                        title: 'Controlled Chaos™',
                        displayTitle: 'Controlled Chaos™ Shot Glass',
                        quantity: 1,
                        displayPrice: '$0.00',
                        variant: mainGame.variant,
                        isVirtualItem: true // Flag to identify display-only items
                    };

                    const bottleOpenerItem = {
                        id: 'display-bottle-opener-' + Date.now(),
                        title: 'Controlled Chaos™',
                        displayTitle: 'Controlled Chaos™ Bottle Opener',
                        quantity: 1,
                        displayPrice: '$0.00',
                        variant: mainGame.variant,
                        isVirtualItem: true // Flag to identify display-only items
                    };

                    // Add virtual items to the display array
                    displayLineItems.push(shotGlassItem,bottleOpenerItem);
                }
            } else {
                // If not the first add, preserve any existing virtual items
                const virtualItems = cartItems.filter(item => item.isVirtualItem);
                displayLineItems.push(...virtualItems);
            }

            setCartItems(displayLineItems);
            setIsCartOpen(true);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error adding items to cart:',error);
            console.error('Error details:',error.message);
            setIsLoading(false);
            alert('Failed to add items to cart. Please try again.');
        });
    };

    // Remove from cart function
    const removeFromCart = (lineItemId) => {
        if (!clientRef.current || !checkoutRef.current) {
            return;
        }

        // Skip removing virtual display-only items
        if (lineItemId.toString().includes('display-')) {
            return;
        }

        const itemToRemove = cartItems.find(item => item.id === lineItemId);

        // Remove the real item from Shopify checkout
        clientRef.current.checkout.removeLineItems(
            checkoutRef.current.id,
            [lineItemId]
        ).then((checkout) => {
            checkoutRef.current = checkout;

            // If we removed all real items, also clear the virtual display items
            if (checkout.lineItems.length === 0) {
                setCartItems([]);
            } else {
                // Update real items and keep any virtual display items
                const virtualItems = cartItems.filter(item => item.isVirtualItem);
                const updatedItems = [...checkout.lineItems,...virtualItems];
                setCartItems(updatedItems);
            }
        }).catch(error => handleRemoveError(error));
    };

    // Helper for error handling in removeFromCart
    const handleRemoveError = (error) => {
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
            });
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        if (checkoutRef.current && checkoutRef.current.webUrl) {
            // Force the URL to go directly to checkout rather than the store page
            let checkoutUrl = checkoutRef.current.webUrl;

            // If the URL doesn't already end with checkout, ensure it redirects to checkout
            if (!checkoutUrl.includes('/checkout')) {
                checkoutUrl = checkoutUrl.split('?')[0]; // Remove any existing query params
                checkoutUrl = `${checkoutUrl}/checkout`;
            }

            // Ensure we're using the checkout with a proper redirect_to
            if (!checkoutUrl.includes('redirect_to=checkout')) {
                checkoutUrl = checkoutUrl.includes('?')
                    ? `${checkoutUrl}&redirect_to=checkout`
                    : `${checkoutUrl}?redirect_to=checkout`;
            }

            window.open(checkoutUrl,'_blank');
        }
    };

    // Update item quantity function
    const updateItemQuantity = (lineItemId,quantity) => {
        if (!clientRef.current || !checkoutRef.current) {
            return;
        }

        // Ignore updates to virtual display items
        if (lineItemId.toString().includes('display-')) {
            return;
        }

        // If quantity is 0 or less, remove the item completely
        if (quantity <= 0) {
            removeFromCart(lineItemId);
            return;
        }

        // Update the actual item in Shopify checkout
        clientRef.current.checkout.updateLineItems(
            checkoutRef.current.id,
            [{ id: lineItemId,quantity: quantity }]
        ).then((checkout) => {
            checkoutRef.current = checkout;

            // Keep any virtual display items
            const virtualItems = cartItems.filter(item => item.isVirtualItem);
            const updatedItems = [...checkout.lineItems,...virtualItems];
            setCartItems(updatedItems);
        })
            .catch(error => {
                console.error('Error updating item quantity:',error);
                handleRemoveError(error);
            });
    };

    // Add handleRegionChange function 
    const handleRegionChange = (e) => {
        const newRegion = e.target.value;
        setRegion(newRegion);
        setCurrencyCode(newRegion === 'USA' ? 'USD' : 'CAD');
        setProductPrice(newRegion === 'USA' ? '29.99' : '34.99');
        localStorage.setItem("userRegion",newRegion);
    };

    return (
        <>
            <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />

            <div className="pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 min-h-screen relative">
                {/* Logo in top-left */}
                <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-16 -left-1 sm:-left-2 md:-left-3 z-[201]">
                    <Link to="/" className="block">
                        <img
                            src="/pwrplay-logo.png"
                            alt="PWRPLAY Logo"
                            className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-80 h-auto cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-headers mb-6 sm:mb-8 text-center">
                        <span className="text-red-600">Controlled Chaos™</span>
                    </h1>

                    {/* Pre-sale banner with sliding text */}
                    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-red-600 mb-6 sm:mb-8 py-2 overflow-hidden">
                        <style jsx="true">{`
                            .ticker-wrap {
                                width: 100%;
                                overflow: hidden;
                            }
                            .ticker {
                                display: inline-block;
                                white-space: nowrap;
                                animation: ticker 30s linear infinite;
                            }
                            .ticker-content {
                                display: inline-block;
                                padding-right: 2rem;
                            }
                            @keyframes ticker {
                                0% {
                                    transform: translateX(0);
                                }
                                100% {
                                    transform: translateX(-50%);
                                }
                            }
                        `}</style>
                        <div className="ticker-wrap">
                            <div className="ticker">
                                {/* Repeat the content to create a seamless loop */}
                                <span className="ticker-content text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider">PRE-SALE ORDERS SHIPPING IN JUNE • PRE-SALE ORDERS SHIPPING IN JUNE •</span>
                                <span className="ticker-content text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider">PRE-SALE ORDERS SHIPPING IN JUNE • PRE-SALE ORDERS SHIPPING IN JUNE •</span>
                                <span className="ticker-content text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider">PRE-SALE ORDERS SHIPPING IN JUNE • PRE-SALE ORDERS SHIPPING IN JUNE •</span>
                                <span className="ticker-content text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider">PRE-SALE ORDERS SHIPPING IN JUNE • PRE-SALE ORDERS SHIPPING IN JUNE •</span>
                                <span className="ticker-content text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider">PRE-SALE ORDERS SHIPPING IN JUNE • PRE-SALE ORDERS SHIPPING IN JUNE •</span>
                            </div>
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center relative transition-colors duration-200"
                        >
                            <FaShoppingCart className="text-xl sm:text-2xl" />
                            {cartItems.some(item => !item.displayTitle) && (
                                <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
                                    {cartItems
                                        .filter(item => !item.displayTitle) // Filter out promotional items
                                        .reduce((total,item) => total + item.quantity,0)
                                    }
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Cart Sidebar - Restructured with subtotal at bottom */}
                    {isCartOpen && (
                        <div className="fixed inset-0 z-50">
                            {/* Backdrop overlay to close cart */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-60"
                                onClick={() => setIsCartOpen(false)}
                                aria-hidden="true"
                            />

                            <div className="absolute inset-y-0 right-0 pt-16">
                                <div className="h-full w-screen md:max-w-xs lg:max-w-sm xl:max-w-md pt-16">
                                    <div
                                        className="h-full flex flex-col bg-black shadow-xl"
                                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside cart from closing it
                                    >
                                        {/* Cart header */}
                                        <div className="pt-6 pb-3 sm:pt-8 sm:pb-4 px-4 sm:px-6 border-b border-red-600/30">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-3xl font-bold text-white">Your Cart</h2>
                                                <button
                                                    onClick={() => setIsCartOpen(false)}
                                                    className="h-8 w-8 flex items-center justify-center"
                                                    aria-label="Close cart"
                                                >
                                                    <FaTimes className="h-7 w-7 text-white" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Cart items - scrollable area */}
                                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 cart-content">
                                            {cartItems.length === 0 ? (
                                                <div className="mt-8">
                                                    <p className="text-center text-white">Your cart is empty</p>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    {cartItems.map((item,index) => (
                                                        <div key={item.id} className={`flex flex-col pb-4 ${index !== cartItems.length - 1 ? 'border-b border-red-600/30 mb-4' : ''}`}>
                                                            {/* Product image and details */}
                                                            <div className="flex items-start mb-3">
                                                                <div className="w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 mr-4 bg-transparent rounded overflow-hidden relative">
                                                                    {item.displayTitle ? (
                                                                        // For promo items
                                                                        <div className="w-full h-full flex items-center justify-center bg-black/50 border-2 border-red-600">
                                                                            {item.displayTitle.includes('Shot Glass') ? (
                                                                                <GiGlassShot className="text-3xl sm:text-4xl text-white" />
                                                                            ) : item.displayTitle.includes('Bottle Opener') ? (
                                                                                <GiBottleCap className="text-3xl sm:text-4xl text-white" />
                                                                            ) : (
                                                                                <img
                                                                                    src="/box-top-view.png"
                                                                                    alt={item.title}
                                                                                    className="w-full h-full object-cover"
                                                                                />
                                                                            )}
                                                                            {/* FREE badge */}
                                                                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded-bl">
                                                                                FREE!
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        // For regular item
                                                                        <img
                                                                            src="/box-top-view.png"
                                                                            alt={item.title}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <p className="font-bold text-lg sm:text-xl">{item.displayTitle || item.title}</p>
                                                                    </div>
                                                                    {/* Display promo items at $0.00 or regular price as needed */}
                                                                    <p className="text-red-500 font-bold mt-2 text-sm sm:text-base">
                                                                        {item.displayPrice ?
                                                                            item.displayPrice :
                                                                            `${currencyCode} $${region === 'USA' ? '29.99' : '34.99'}`
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Quantity Counter - Only show for the main game, not for promotional items */}
                                                            {!item.displayTitle && (
                                                                <div className="mt-2 flex items-center">
                                                                    <span className="text-lg sm:text-xl text-white mr-3 font-medium">Quantity</span>
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
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Subtotal and checkout - fixed at bottom */}
                                        {cartItems.length > 0 && (
                                            <div className="border-t border-red-600/30 px-4 sm:px-6 py-6">
                                                <div className="flex justify-between mb-6">
                                                    <span className="text-lg sm:text-xl text-white font-medium">Subtotal</span>
                                                    <span className="text-lg sm:text-xl text-red-600 font-bold">
                                                        {currencyCode} ${calculateTotal()}
                                                    </span>
                                                </div>

                                                {/* Discount Reminder */}
                                                <div className="mb-6 p-4 bg-black border-2 border-red-600 rounded-lg shadow-md shadow-red-500/20">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-red-600 rounded-full flex-shrink-0">
                                                            <FaTag className="text-white" />
                                                        </div>
                                                        <p className="text-white font-headers text-lg sm:text-xl tracking-wide font-bold">
                                                            SAVE <span className="text-red-600">25% OFF</span>
                                                        </p>
                                                    </div>
                                                    <p className="hidden sm:block text-sm text-gray-300 mb-3 font-semibold">
                                                        Sign up for our newsletter to get an exclusive discount code for your purchase.
                                                    </p>
                                                    <button
                                                        onClick={() => setShowDiscountPopup(true)}
                                                        className="w-full mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <span>Get Discount Code</span>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={proceedToCheckout}
                                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg sm:text-xl py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
                                                >
                                                    <span>Checkout</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        {/* Left side - Product Image Carousel */}
                        <div className="relative md:pt-8 lg:pt-16">
                            {/* Main image container with fixed aspect ratio */}
                            <div
                                className="rounded-lg overflow-hidden relative aspect-square md:h-[calc(100%-40px)] md:aspect-auto border-4 border-red-600 shadow-lg shadow-red-500/30"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                                onClick={nextImage}
                            >
                                {/* Desktop-only navigation arrows */}
                                <div className="hidden md:block">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                                        aria-label="Previous image"
                                    >
                                        <FaChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                                        aria-label="Next image"
                                    >
                                        <FaChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Image */}
                                <img
                                    src={productImages[currentImageIndex]}
                                    alt={`Controlled Chaos Game - Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-fill"
                                    draggable="false"
                                />
                            </div>

                            {/* Image navigation dots - now below the image box */}
                            <div className="flex justify-center space-x-2 mt-4">
                                {productImages.map((_,index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToImage(index);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                                            ? 'bg-red-600 scale-125'
                                            : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right side - Product Details and Buy Button */}
                        <div className="mt-3 md:mt-0 md:pt-8 lg:pt-16">
                            {/* Game Benefits and Contents as Bullet Points */}
                            <div className="sm:mb-2 space-y-3 sm:space-y-4 md:space-y-6">
                                {/* What You'll Get */}
                                <div className="mb-6 sm:mb-8 md:mb-10">
                                    <div className="flex flex-row items-center justify-between mb-4 md:mb-6">
                                        <h3 className="text-3xl sm:text-3xl md:text-5xl font-headers text-red-600 text-left mb-0">What's Inside</h3>
                                        {/* Region selector - desktop only */}
                                        <div className="hidden md:block relative">
                                            <select
                                                value={region}
                                                onChange={handleRegionChange}
                                                className="appearance-none bg-transparent text-white border-b-2 border-red-600 focus:border-red-600 focus:outline-none px-2 sm:px-3 py-1 pr-6 w-36 transition-colors duration-200 text-sm sm:text-base"
                                            >
                                                <option value="USA" className="bg-black">United States</option>
                                                <option value="Canada" className="bg-black">Canada</option>
                                            </select>
                                            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 text-red-600">
                                                <FaChevronDown className="text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 sm:space-y-2 md:space-y-3 mt-4 sm:mt-2">
                                        {[
                                            "250+ unique cards across 4 different decks",
                                            "Custom spinner with 4 chaotic categories",
                                            "Endless laughs and unforgettable moments",
                                            "The perfect ice-breaker for any party",
                                            "A game that keeps everyone involved - no waiting around"
                                        ].map((item,index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="inline-block w-3 h-3 md:w-3 md:h-3 mr-3 border-2 border-red-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                                <span className="text-base sm:text-base md:text-2xl opacity-90">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Custom Buy Button */}
                            <div className="flex justify-center items-center w-full mb-4 sm:mb-5">
                                <button
                                    onClick={addToCart}
                                    disabled={isLoading}
                                    className={`bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg md:text-xl py-3 md:py-4 px-5 sm:px-6 md:px-10 rounded-full min-w-[140px] sm:min-w-[160px] md:min-w-[200px] text-center transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Loading...' : `Add to Cart - ${currencyCode} $${productPrice}`}
                                </button>
                            </div>

                            {/* Region selector - mobile only */}
                            <div className="flex md:hidden justify-center items-center mb-6 sm:mb-7">
                                <div className="relative">
                                    <select
                                        value={region}
                                        onChange={handleRegionChange}
                                        className="appearance-none bg-transparent text-white border-b-2 border-red-600 focus:border-red-600 focus:outline-none px-2 sm:px-3 py-1 pr-8 sm:pr-12 transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        <option value="USA" className="bg-black">United States</option>
                                        <option value="Canada" className="bg-black">Canada</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
                                        <FaChevronDown className="text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Promotional Offers Section */}
                            <div className="mb-8 sm:mb-10 bg-black/40 border-2 border-red-600 rounded-lg p-3 sm:p-4 shadow-lg shadow-red-500/30">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 flex-shrink-0 flex items-center justify-center bg-red-600 rounded-full">
                                            <GiGlassShot className="text-xl sm:text-2xl text-white" />
                                        </div>
                                        <p className="text-sm sm:text-base md:text-lg">
                                            <span className="font-bold text-red-500">First 250 orders</span> in each country (USA and Canada) will receive a <span className="font-bold text-white">custom Controlled Chaos™ shot glass</span>.
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 flex-shrink-0 flex items-center justify-center bg-red-600 rounded-full">
                                            <GiBottleCap className="text-xl sm:text-2xl text-white" />
                                        </div>
                                        <p className="text-sm sm:text-base md:text-lg">
                                            <span className="font-bold text-red-500">First 450 orders</span> in each country (USA and Canada) will receive a <span className="font-bold text-white">limited-edition keychain bottle opener</span>.
                                        </p>
                                    </div>
                                    <div className="text-center pt-1 sm:pt-2">
                                        <span className="inline-block animate-pulse bg-red-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">Limited Stock Available!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Popup */}
            {showDiscountPopup && (
                <NotificationPopup
                    onClose={() => setShowDiscountPopup(false)}
                    onSubmit={() => {
                        setShowDiscountPopup(false);
                        // Don't close the cart so they can continue their purchase with the code
                    }}
                />
            )}
        </>
    );
}

export default BuyNow;
