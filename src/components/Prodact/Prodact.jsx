import React from 'react';
import './Prodact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Prodact = ({ handleClick, prodact, addToCart }) => {
   const { img, name, seller, price, stock, key } = prodact;
   return (
      <div className="prodact">
         <div>
            <img src={img} alt="prodict-img" />
         </div>
         <div className="product-content">
            <h4 className="product-name">
               <Link to={`/product/${key}`}>{name}</Link>
            </h4>
            <p>
               <small>by: {seller}</small>
            </p>
            <p>${price}</p>
            <p>only {stock} left in stock - order soon</p>
            {addToCart && (
               <button
                  className="cart-btn"
                  onClick={() => handleClick(prodact)}
               >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
               </button>
            )}
         </div>
      </div>
   );
};

export default Prodact;
