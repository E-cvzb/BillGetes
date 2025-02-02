import { useState } from 'react';
import './App.css';
import products from './data/products';

function App() {
  const [balance, setBalance] = useState(100000000000);
  const [cart, setCart] = useState([]);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleBuy = (product) => {
    if (balance >= product.price) {
      setBalance(balance - product.price);
      const existingProduct = cart.find(item => item.id === product.id);
      
      if (existingProduct) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const handleSell = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setBalance(balance + product.price);
      
      if (existingProduct.quantity === 1) {
        setCart(cart.filter(item => item.id !== product.id));
      } else {
        setCart(cart.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity - 1}
            : item
        ));
      }
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Spend Bill Gates&apos; Money</h1>
        <div className="balance-header">
          {formatMoney(balance)}
        </div>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{formatMoney(product.price)}</p>
            <div className="product-controls">
              <button 
                className="sell-btn"
                onClick={() => handleSell(product)}
                disabled={!cart.find(item => item.id === product.id)}
              >
                Sell
              </button>
              <span className="quantity">
                {cart.find(item => item.id === product.id)?.quantity || 0}
              </span>
              <button 
                className="buy-btn"
                onClick={() => handleBuy(product)}
                disabled={balance < product.price}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="receipt">
        <h2>Your Receipt</h2>
        {cart.map(item => (
          <div key={item.id} className="receipt-item">
            <span>{item.name} x{item.quantity}</span>
            <span>{formatMoney(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="receipt-total">
          <strong>Total Spent:</strong>
          <strong>{formatMoney(100000000000 - balance)}</strong>
        </div>
      </div>
    </div>
  );
}

export default App; 