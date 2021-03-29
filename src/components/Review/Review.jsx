import React, { useEffect, useState } from 'react';
import {
    getDatabaseCart,
    removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Card/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const history = useHistory();

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter((product) => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    const handleProceedCheckout = () => {
        history.push('/shipment');
    };

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        fetch('https://sleepy-cliffs-58288.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);

    return (
        <div className="product-components">
            <div className="prodact-container">
                {cart.map((product) => (
                    <ReviewItem
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                        key={product.key}
                    />
                ))}
                {orderPlace && <img src={happyImg} alt="order-img" />}
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <button
                        onClick={handleProceedCheckout}
                        className="cart-btn"
                    >
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
