import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Navbar from './Navbar';

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

  const handleDelete = (item) => dispatch(removeItem(item.name));

  return (
    <div className="page">
      <Navbar onNavigate={onNavigate} />
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
