import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BuyNow() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Buy Controlled Chaos™</h1>
            <p className="mt-4">Purchase on Amazon (US & Canada).</p>
        </div>
    );
}

export default BuyNow;
