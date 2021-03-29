import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
   const { img, name, quantity, key, price } = props.product;
   return (
      <div className="ReviewItem">
         <img src={img} alt="product-img" />
         <h2 className="product-name">{name}</h2>
         <p>Quantity: {quantity}</p>
         <p>
            <small>Price: {price}</small>
         </p>
         <button
            className="cart-btn"
            onClick={() => props.handleRemoveItem(key)}
         >
            Remove Item
         </button>
      </div>
   );
};

export default ReviewItem;
