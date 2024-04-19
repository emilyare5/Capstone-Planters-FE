import React, { useState, useEffect } from "react";


export default function Cart({ token, setNewReservedItem }) {
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        async function getCartItems() {
            try {
                const response = await fetch("https://example.com/api/cart/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await response.json();
                setCartItems(result.cartItems);
            } catch (err) {
                console.error(err);
            }
        }
        getCartItems();
    }, [token, setNewReservedItem]);

    async function removeItem(itemId) {
        try {
            const response = await fetch(`https://example.com/api/cart/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Item removed successfully, update cartItems state
                setCartItems(cartItems.filter(item => item.id !== itemId));
                // You might want to trigger additional actions, like updating UI or state elsewhere
            } else {
                console.error("Failed to remove item from cart");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                cartItems.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No items in the cart</p>
            )}
        </>
    );
}
