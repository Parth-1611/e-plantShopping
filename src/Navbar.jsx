import React from 'react';
import { useSelector } from 'react-redux';

function Navbar({ onNavigate }) {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')}>
        Paradise Nursery
      </div>
      <nav className="navbar-links">
        <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
        <a href="#plants" onClick={(e) => { e.preventDefault(); onNavigate('plants'); }}>Plants</a>
        <a href="#cart" onClick={(e) => { e.preventDefault(); onNavigate('cart'); }} className="cart-link" aria-label={`Cart with ${totalQuantity} items`}>
          <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
            <circle cx="80" cy="216" r="12" fill="currentColor" />
            <circle cx="184" cy="216" r="12" fill="currentColor" />
            <path d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 180 176H84.1a16 16 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="cart-count">{totalQuantity}</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
