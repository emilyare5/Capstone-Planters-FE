import React from 'react';
// import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function OrderConfirmation() {
 
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // Simulate generating order number (you can replace this with your own logic)
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    setOrderNumber(randomNumber);

  }, []);

  return (
    <div>
      <h2>Order Confirmation</h2>
      {orderNumber && <p>Your order number is: {orderNumber}</p>}
      <p>Thank you for your order. We'll see you again soon :)</p>
    </div>
  );
}

export default OrderConfirmation;