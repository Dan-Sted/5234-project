import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from './productlist';

const PaymentEntry = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // If this route is visited directly (no navigation state), redirect back to purchase
    const order = location && location.state && location.state.order;

    // keep hooks unconditional: compute purchased even if order is undefined
    const purchased = useMemo(() => {
        if (!order) return [];
        return productlist
            .map((p, idx) => ({ ...p, qty: order.buyQuantity[idx] || 0 }))
            .filter(item => item.qty > 0);
    }, [order]);

    if (!order) {
        // avoid rendering before redirecting
        navigate('/purchase');
        return null;
    }

    const totalItems = purchased.reduce((s, it) => s + it.qty, 0);

    return (
        <div>
            <h2>Order Summary</h2>
            {purchased.length === 0 ? (
                <p>No items selected.</p>
            ) : (
                <ul>
                    {purchased.map(item => (
                        <li key={item.id}>{item.qty} × {item.name}</li>
                    ))}
                </ul>
            )}
            <p><strong>Total items:</strong> {totalItems}</p>
        </div>
    );
};

export default PaymentEntry;