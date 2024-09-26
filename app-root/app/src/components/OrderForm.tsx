import React, { useState, useEffect } from 'react';
import { createOrder, getOrders } from '../api/api';
import './OrderForm.css';

interface OrderFormProps {}

const OrderForm: React.FC<OrderFormProps> = () => {
  const [product, setProduct] = useState<'t-shirt' | 'sweater'>('t-shirt');
  const [material, setMaterial] = useState<'light cotton' | 'heavy cotton'>('light cotton');
  const [color, setColor] = useState<'black' | 'white' | 'green' | 'red' | 'pink' | 'yellow'>('black');
  const [text, setText] = useState(' '); // Solved the empty string issue. 
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState<any>(null);

  // Make the return fields with first letter capitalized
  const capitalizeFirstLetter = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const calculatePrice = () => {
    let basePrice = 0;
    let materialPrice = 0;
    const textLength = text.length;
  
    if (product === 't-shirt') {
      basePrice = color === 'black' || color === 'white' ? 16.95 : 18.95;
      materialPrice = material === 'heavy cotton' ? 3 : 0;
    } else if (product === 'sweater') {
      basePrice = color === 'black' || color === 'white' ? 28.95 : 32.95;
      materialPrice = 0;     }
    
    const textLengthPrice = textLength > 8 ? 5 : 0;
  
    setPrice(basePrice + materialPrice + textLengthPrice);
  };

  useEffect(() => {
    if (product === 'sweater') {
      setMaterial('light cotton'); 
    }
    calculatePrice();
  }, [product, material, color, text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = { product, material, color, text, price };

    try {
      await createOrder(order);
      alert('Order submitted successfully!');
    } catch (error) {
      alert('Failed to submit order.');
    }
  };

  const handleRetrieveOrder = async () => {
    try {
      const fetchedOrder = await getOrders(); 
      setOrder(fetchedOrder);
    } catch (error) {
      alert('Failed to retrieve order.');
    }
  };

  return (
    <div className="order-form-container">
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Select Product:</label>
          <select 
            value={product} 
            onChange={(e) => setProduct(e.target.value as 't-shirt' | 'sweater')} 
            className="form-control"
          >
            <option value="t-shirt">T-shirt</option>
            <option value="sweater">Sweater</option>
          </select>
        </div>
        {product === 't-shirt' && (
          <>
            <div className="form-group">
              <label>Fabric Type:</label>
              <select 
                value={material} 
                onChange={(e) => setMaterial(e.target.value as 'light cotton' | 'heavy cotton')} 
                className="form-control"
              >
                <option value="light cotton">Light Cotton</option>
                <option value="heavy cotton">Heavy Cotton</option>
              </select>
            </div>
            <div className="form-group">
              <label>Color:</label>
              <select 
                value={color} 
                onChange={(e) => setColor(e.target.value as 'black' | 'white' | 'green' | 'red')} 
                className="form-control"
              >
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
              </select>
            </div>
          </>
        )}
        {product === 'sweater' && (
          <div className="form-group">
            <label>Color:</label>
            <select 
              value={color} 
              onChange={(e) => setColor(e.target.value as 'black' | 'white' | 'pink' | 'yellow')} 
              className="form-control"
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="pink">Pink</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Text:</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            maxLength={16} 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <h3>Total Price: ${price.toFixed(2)}</h3>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Submit Order</button>
        </div>
      </form>

      <button onClick={handleRetrieveOrder} className="retrieve-button">Retrieve Order</button>
        {order && (
          <div className="order-details">
            <h3>Order Details:</h3>
            <p>Product: {capitalizeFirstLetter(order.product)}</p>
            {order.material && <p>Material: {capitalizeFirstLetter(order.material)}</p>}
            <p>Color: {capitalizeFirstLetter(order.color)}</p>
            <p>Text: {order.text}</p>
            <p>Price: ${order.price.toFixed(2)}</p>
          </div>
        )}
    </div>
  );
};

export default OrderForm;
