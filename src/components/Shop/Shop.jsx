import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Card/Cart';
import Prodact from '../Prodact/Prodact';
import './Shop.css';

const Shop = () => {
  const first10Data = fakeData.slice(0, 10);

  const [prodacts, setProdacts] = useState(first10Data);
  const [cart, setCart] = useState([]);

  const handleClick = (prodact) => {
    const newCart = [...cart, prodact];
    setCart(newCart);
  };

  return (
    <div className="shop">
      <div className="prodact-container">
        {prodacts.map((prodact) => (
          <Prodact handleClick={handleClick} prodact={prodact} />
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
