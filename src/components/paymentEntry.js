import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from './productlist';

const PaymentEntry = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const order = location && location.state && location.state.order;

    const purchased = useMemo(() => {
        if (!order) return [];
        return productlist
            .map((p, idx) => ({ ...p, qty: order.buyQuantity[idx] || 0 }))
            .filter(item => item.qty > 0);
    }, [order]);

    if (!order) {
        // redirect back to purchase if no order state
        navigate('/purchase');
        return null;
    }

    const totalItems = purchased.reduce((s, it) => s + it.qty, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>

                <div className="card">
                    {purchased.length === 0 ? (
                        <p className="text-gray-600">No items selected.</p>
                    ) : (
                        <ul className="divide-y">
                            {purchased.map(item => (
                                <li key={item.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        {item.price != null && <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>}
                                    </div>
                                    <div className="text-sm text-gray-700">{item.qty} ×</div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-gray-700">Total items</div>
                        <div className="font-semibold">{totalItems}</div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="btn-primary" onClick={() => navigate(-1)}>Edit Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentEntry;