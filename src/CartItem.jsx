import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const go = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  const handleDelete = (item) => dispatch(removeItem(item.name));

  return (
    <div className="page">
      <div className="navbar">
        <div className="navbar-brand" onClick={() => onNavigate('home')}>Paradise Nursery</div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => go(e, 'home')}>Home</a>
          <a href="#plants" onClick={(e) => go(e, 'plants')}>Plants</a>
          <a href="#cart" onClick={(e) => go(e, 'cart')} className="cart-link" aria-label="Cart">
            <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 180 176H84.1a16 16 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="cart-count">{totalPlants}</span>
          </a>
        </div>
      </div>
      <main className="cart-container">
        <h2 className="cart-heading">Your shopping cart</h2>
        <p className="cart-summary">Total plants: <strong>{totalPlants}</strong></p>
        <p className="cart-summary">Total cost: <strong>${totalAmount}</strong></p>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Browse the plants to add some.</p>
        ) : (
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-cost">Unit price: ${item.cost}</p>
                  <div className="cart-item-quantity">
                    <button aria-label={`Decrease ${item.name}`} onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase ${item.name}`} onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <p className="cart-item-total">Subtotal: ${itemTotal(item)}</p>
                </div>
                <button className="cart-item-delete" onClick={() => handleDelete(item)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-button" onClick={() => onNavigate('plants')}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={() => alert('Coming Soon')}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
