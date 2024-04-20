import React, { useState, useEffect } from "react";
const APIURL = process.env.APIURL || 'http://localhost:3000/api';
import { AddCartItem, getSingleInventory } from '../API';
import CheckoutForm from "./CheckoutForm";

export default function Cart({ token }) {
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);

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
    };

    useEffect(() => {
        getCartItems();
    }, [token]);

    const removeItem = async (itemId) => {
        try {
            const response = await AddCartItem(itemId, "0");
            console.log(response);

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
            const response = await AddCartItem(itemId, newQuantity);
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

    // return (
    //     <>
    //         {cartItems ? (
    //             <>
    //                 {cartItems.items.map(item => (
    //                     <div key={item.id}>
    //                         <p>{item.name}</p>
    //                         <p>{item.quantity}</p>
    //                         <input
    //                             type="number"
    //                             value={item.quantity}
    //                             onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
    //                         />
    //                         <button onClick={() => removeItem(item.id)}>Remove</button>
    //                     </div>
    //                 ))}
    //                 <p>Total: ${cartItems.total_price}</p>
    //             </>
    //         ) : (
    //             <p>No items in the cart</p>
    //         )}
    //     </>
    // );

    return (
        <>
            {cartItems ? (
                <>
                    {cartItems.items.map(item => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.quantity}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            />
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    ))}
                    <p>Total: ${cartItems.total_price}</p>
                    <CheckoutForm totalPrice={cartItems.total_price} address={address} />
                </>
            ) : (
                <p>No items in the cart</p>
            )}
        </>
    );
    
}
