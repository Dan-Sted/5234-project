import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import productlist from './productlist';

const Purchase = () => {
    const navigate = useNavigate();

    const [order, setOrder] = useState({
        buyQuantity: Array(productlist.length).fill(0),
        creditCardNumber: '',
        expirDate: '',
        cvvCode: '',
        cardHolderName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // send the order inside the navigation state so PaymentEntry can read it
        navigate('/purchase/paymentEntry', { state: { order } });
    };

    const handleQuantityChange = (index, value) => {
        setOrder(prev => {
            const q = [...prev.buyQuantity];
            q[index] = Number(value) || 0;
            return { ...prev, buyQuantity: q };
        });
    };

    // keep a stable reference to the products list in case it's used elsewhere
    const productList = useMemo(() => productlist, []);

    console.log(order);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {productList.map((product, idx) => (
                    <div key={product.id || product.name} style={{ marginBottom: 8 }}>
                        <label>{product.name}</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={order.buyQuantity[idx]}
                            onChange={(e) => handleQuantityChange(idx, e.target.value)}
                        />
                    </div>
                ))}

                <button type="submit" className='button'>Pay</button>
            </form>
        </div>
    );
};

export default Purchase;