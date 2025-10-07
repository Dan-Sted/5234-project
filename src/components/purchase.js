import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
    const [order, setOrder] = useState({
        buyQuantity: [0, 0, 0, 0, 0],
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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // send the order inside the navigation state so PaymentEntry can read it
        navigate('/purchase/paymentEntry', { state: { order } });
    };

    console.log(order);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Product 1</label>
                <input
                    type="number"
                    required
                    value={order.buyQuantity[0]}
                    onChange={(e) =>
                        setOrder(prev => {
                            const q = [...prev.buyQuantity];
                            q[0] = Number(e.target.value) || 0;
                            return { ...prev, buyQuantity: q };
                        })
                    }
                />
                <br />
                <label>Product 2</label>
                <input
                    type="number"
                    required
                    value={order.buyQuantity[1]}
                    onChange={(e) =>
                        setOrder(prev => {
                            const q = [...prev.buyQuantity];
                            q[1] = Number(e.target.value) || 0;
                            return { ...prev, buyQuantity: q };
                        })
                    }
                />
                <br />
                <button type="submit" className='button'>Pay</button>
            </form>
        </div>
    );
};

export default Purchase;