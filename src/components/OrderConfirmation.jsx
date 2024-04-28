import React from 'react';
import { useState, useEffect } from 'react';

function OrderConfirmation() {

  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {

    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    setOrderNumber(randomNumber);

  }, []);

  return (

    <div className='container'>

      <div className='order'>

        <h2>Order Confirmation</h2>

        {orderNumber && <p>Your order number is: {orderNumber}</p>}

        <p>Thank you for your order. We'll see you again soon :)</p>

      </div>

    </div>

  );
};

export default OrderConfirmation;