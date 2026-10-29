import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'plants' | 'cart'

  if (page === 'plants') {
    return <ProductList onNavigate={setPage} />;
  }
  if (page === 'cart') {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <div className="background-image">
      <div className="landing-content">
        <h1>Welcome To Paradise Nursery</h1>
        <AboutUs />
        <button className="get-started-button" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
