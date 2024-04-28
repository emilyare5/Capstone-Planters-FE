const APIURL = process.env.APIURL || 'http://localhost:3000/api';
import React, { useState, useEffect } from "react";
import { updateCartItem } from '../API';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";

function SelectDelivery() {
    return (
        <>
            <Form.Select size="lg">
                <option>Delivery</option>
                <option>Pick up</option>
            </Form.Select>
        </>
    );
};


export default function Cart({ token }) {
    const [cartItems, setCartItems] = useState(null);

    const navigate = useNavigate();

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

        };
    };

    useEffect(() => {

        getCartItems();

    }, [token]);

    const removeItem = async (itemId) => {
        try {
            const response = await updateCartItem(itemId, "0");

            if (response) {
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
           
            if (response) {
                getCartItems();
            } else {
                console.error("Failed to update item quantity in cart");
            }

        } catch (err) {
            console.error(err);

        };
    };

    return (
        <>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                <>
                    <div className='container2'>
                        <div className="gridcontainer2">
                            <div id="cartPage">
                                <div id="cartPage_myCart" className="cartcard">
                                    {cartItems.items.map(item => (
                                        <div key={item.id}>
                                            <p>{item.name}</p>
                                            <img src={item.imgurl} alt={item.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            <p>{item.quantity}</p>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            />
                                            <Button className="cartdelbutt" variant="outline-danger" size="md" onClick={() => removeItem(item.id)}>Remove</Button>

                                        </div>
                                    ))}
                                </div>
                                <div id="cartPage_FormC" className="cartbar">
                                    <div id="cartPage_Form">
                                        <div id="cartPage_Form1">
                                            <h2>Order Details</h2>
                                            <p>Total: {(cartItems.total_price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                                            <SelectDelivery />
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
                        </div>
                    </div>
                </>
            ) : (
                <div className="nocart">
                    <p>No items in the cart</p>
                </div>
            )}
        </>
    );
}
