import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  const total = Number(
    cart.reduce((items, item) => items + item.price, 0).toFixed(2)
  );
  let Shipping = cart.length;
  Shipping === 0
    ? (Shipping = 0)
    : Number((Shipping = Shipping * 7.99).toFixed(2));

  const tax = Number((total / 10).toFixed(2));
  const orderTotal = Number((total + Shipping + tax).toFixed(2));

  return (
    <div className="card">
      <h2>Order Summary</h2>
      <h3>Items ordered: {cart.length}</h3>
      <table>
        <tbody>
          <tr>
            <td>Items: </td>
            <td>$ {total}</td>
          </tr>
          <tr>
            <td>Shipping & Handling: </td>
            <td>${Shipping}</td>
          </tr>
          <tr>
            <td>Tax + Vat: </td>
            <td>${tax}</td>
          </tr>
          <tr>
            <td>
              <h3>Order Total: </h3>
            </td>
            <td>
              <h3>${orderTotal}</h3>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
