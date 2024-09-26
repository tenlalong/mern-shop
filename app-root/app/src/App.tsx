import React, { useEffect, useState } from 'react';
import './App.css';
import OrderForm from './components/OrderForm';
import BottomBar from './bottom-bar/BottomBar';

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] =useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8080');
    const { message } = await response.json();
    setMessage(message);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Zensurance T-Shirt</h1>
      <h1>& Sweater Customizer</h1>
      <div className="container">
        <OrderForm />
      </div>
      <div>
        {/* Added this to create gap between the form and the time bar */}
        <p> </p> 
      </div>
      <div className="container">
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
