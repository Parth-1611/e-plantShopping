import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Navbar from './Navbar';

// Placeholder thumbnails. Replace the image URLs with your own plant photos if you like.
const img = (label, color) =>
  `https://placehold.co/300x300/${color}/ffffff?text=${encodeURIComponent(label)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 15, image: img('Snake Plant', '2f6f4e'), description: 'Produces oxygen at night.' },
      { name: 'Spider Plant', cost: 12, image: img('Spider Plant', '3b7d5a'), description: 'Filters formaldehyde and xylene.' },
      { name: 'Peace Lily', cost: 18, image: img('Peace Lily', '2a5f45'), description: 'Removes mold spores and toxins.' },
      { name: 'Boston Fern', cost: 20, image: img('Boston Fern', '3f8a62'), description: 'Adds moisture to dry indoor air.' },
      { name: 'Rubber Plant', cost: 17, image: img('Rubber Plant', '2d6a4f'), description: 'Absorbs airborne chemicals.' },
      { name: 'Aloe Vera', cost: 14, image: img('Aloe Vera', '40916c'), description: 'Purifies air and soothes burns.' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', cost: 20, image: img('Lavender', '6b5b95'), description: 'Calming scent for better sleep.' },
      { name: 'Jasmine', cost: 18, image: img('Jasmine', '7d6b9f'), description: 'Sweet fragrance that blooms at night.' },
      { name: 'Rosemary', cost: 15, image: img('Rosemary', '4a7c59'), description: 'Fragrant herb for the kitchen.' },
      { name: 'Mint', cost: 12, image: img('Mint', '52b788'), description: 'Fresh scent, easy to grow.' },
      { name: 'Lemon Balm', cost: 14, image: img('Lemon Balm', '74a95b'), description: 'Citrus aroma that repels mosquitoes.' },
      { name: 'Basil', cost: 10, image: img('Basil', '588157'), description: 'Aromatic herb for cooking.' },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', cost: 25, image: img('ZZ Plant', '1b4332'), description: 'Thrives on neglect and low light.' },
      { name: 'Pothos', cost: 10, image: img('Pothos', '2d6a4f'), description: 'Trailing vines, very forgiving.' },
      { name: 'Cast Iron Plant', cost: 22, image: img('Cast Iron Plant', '344e41'), description: 'Tough plant for dark corners.' },
      { name: 'Chinese Evergreen', cost: 19, image: img('Chinese Evergreen', '3a5a40'), description: 'Patterned leaves, low maintenance.' },
      { name: 'Philodendron', cost: 16, image: img('Philodendron', '2f6f4e'), description: 'Heart-shaped leaves that tolerate shade.' },
      { name: 'Dracaena', cost: 21, image: img('Dracaena', '40745a'), description: 'Tall, architectural and shade tolerant.' },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div className="page">
      <Navbar onNavigate={onNavigate} />
      <main className="product-grid-container">
        {plantsArray.map((group) => (
          <section key={group.category} className="category">
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <h3 className="product-title">{plant.name}</h3>
                  <p className="product-description">{plant.description}</p>
                  <p className="product-price">${plant.cost}</p>
                  <button
                    className="product-button"
                    disabled={isInCart(plant.name)}
                    onClick={() =>
                      dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }))
                    }
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
