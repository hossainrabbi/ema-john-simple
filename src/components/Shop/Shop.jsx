import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    addToDatabaseCart,
    getDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Card/Cart';
import Prodact from '../Prodact/Prodact';
import './Shop.css';

const Shop = () => {
    const [prodacts, setProdacts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-cliffs-58288.herokuapp.com/products')
            .then((res) => res.json())
            .then((data) => setProdacts(data));
    }, []);

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

    const handleClick = (prodact) => {
        const sameProduct = cart.find((pd) => pd.key === prodact.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== prodact.key);
            newCart = [...others, sameProduct];
        } else {
            prodact.quantity = 1;
            newCart = [...cart, prodact];
        }

        setCart(newCart);
        addToDatabaseCart(prodact.key, count);
    };

    return (
        <div className="product-components">
            <div className="prodact-container">
                {prodacts.map((prodact) => (
                    <Prodact
                        key={prodact.key}
                        addToCart={true}
                        handleClick={handleClick}
                        prodact={prodact}
                    />
                ))}
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
