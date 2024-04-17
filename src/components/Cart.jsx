import React, { useState, useEffect } from "react";
const APIURL = process.env.APIURL || 'http://localhost:3000/api'
import { AddCartItem, getSingleInventory } from '../API';


export default function Cart({ token,  }) {
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function getCartItems() {
            try {
                const response = await fetch(APIURL+ "/carts/mycart/", {
                    credentials: 'include',
                });


                const result = await response.json();
                console.log(result)
                setCartItems(result.cart);
                // calculateTotalPrice(result.cartItems);
            } catch (err) {
                console.error(err);
            }
        }
        getCartItems();
    }, [token]);

    const removeItem = async (itemId) => {
        try {
            const response = await AddCartItem(itemId,  "0");
            // const response = await fetch(APIURL + `/carts/mycart/${itemId}`, {
            //     method: "DELETE",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`
            //     }
            // });
            console.log(response)

            if (response) {
               
                // setCartItems(updatedItems);
                console.log(setCartItems)
            } else {
                console.error("Failed to remove item from cart");
            }
        } catch (err) {
            console.error(err);
        }
    };




    // const handleAddressChange = (e) => {
    //     setAddress(e.target.value);
    // };


    // const handleSubmit = async () => {
    //     // Submit the cart with address information
    //     // You can send cartItems and address to the server for processing
    //     console.log("Cart submitted with address:", address);
    // };


    return (
        <>
            {cartItems  ? (
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
                
                    {/* <button onClick={handleSubmit}>Submit</button> */}
                </>
            ) : (
                <p>No items in the cart</p>
            )}
        </>
    );
}
