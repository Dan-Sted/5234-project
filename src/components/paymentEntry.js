import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentEntry = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // If this route is visited directly (no navigation state), redirect back to purchase
    const order = location && location.state && location.state.order;
    if (!order) {
        // avoid rendering before redirecting
        navigate('/purchase');
        return null;
    }

    return (
        <div>
            <h1>product 1 {order.buyQuantity[0]}</h1>
            <h1>product 2 {order.buyQuantity[1]}</h1>
        </div>
    );
};

export default PaymentEntry;