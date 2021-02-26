import React from 'react';
import './Prodact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Prodact = ({ handleClick, prodact }) => {
  const { img, name, seller, price, stock } = prodact;
  return (
    <div className="prodact">
      <div>
        <img src={img} alt="prodict-img" />
      </div>
      <div className="product-content">
        <h4>{name}</h4>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>only {stock} left in stock - order soon</p>
        <button className="cart-btn" onClick={() => handleClick(prodact)}>
          <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Prodact;
