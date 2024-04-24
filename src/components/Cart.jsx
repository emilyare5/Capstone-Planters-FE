import React, { useState, useEffect } from "react";

const APIURL = process.env.APIURL || 'http://localhost:3000/api';
import { updateCartItem, getSingleInventory } from '../API';
import Form from 'react-bootstrap/Form';
// import CheckoutForm from "./CheckoutForm";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import CheckoutForm from "./CheckoutForm";

function SelectDelivery() {
    return (
      <>
        <Form.Select size="lg">
        <option>Delivery</option>
        <option>Pick up</option>
        </Form.Select>
      </>
    );
  }


export default function Cart({ token }) {
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const imgAddr= '../src/assets/assets2/'

    const handleOnClick = () => {
      navigate('/checkout');
    };

    const getCartItems = async () => {
        try {
            const response = await fetch(APIURL + "/carts/mycart/", {
                credentials: 'include',
            });

            const result = await response.json();
            setCartItems(result.cart);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {

        getCartItems();
    }, [token]);

    const removeItem = async (itemId) => {
        try {
            // const response = await AddCartItem(itemId, "0");
            const response = await updateCartItem(itemId,  "0");
            if (response) {
                // Refetch cart items after successful removal
                getCartItems();
            } else {
                console.error("Failed to remove item from cart");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const response = await updateCartItem(itemId, newQuantity);
            console.log(response);

            if (response) {
                // Refetch cart items after successful update
                getCartItems();
            } else {
                console.error("Failed to update item quantity in cart");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };



    return (
        <>
            {cartItems ? (
                <>
                <div id="cartPage">
                    <div id="cartPage_myCart">
                    {cartItems.items.map(item => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <img src={imgAddr+item.imgurl} alt={item.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            <p>{item.quantity}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            />
                            <Button variant="outline-danger" size="md"  onClick={() => removeItem(item.id)}>Remove</Button>
                            
                        </div>
                    ))}               
                    </div>
                        <div id="cartPage_FormC">
                        <div id="cartPage_Form">
                            <div id="cartPage_Form1">
                                <h2>Order Details</h2>
                                <p>Total: {(cartItems.total_price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                                <SelectDelivery/>     
                            </div>
                            <div id="cartPage_Form2"></div>
                            <div id="cartPage_Form3">
                            <div className="d-grid gap-2">  
                                <Button variant="primary" type="submit" onClick={handleOnClick}>Go to Checkout</Button>
                                <Button variant="primary" type="submit">Continue Shopping</Button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                
                </>
            ) : (
                <p>No items in the cart</p>
            )}
        </>
    );
}
