import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCartByCustId, getUserAccess } from '../../API';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';

export default function AdminCustCart() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [custCart, setCustCart] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    const [renderFlag, setRenderFlag] = useState("")
    let { custId } = useParams()
    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""});

    useEffect(() => {
        async function getUserAuth() {
            const user = await getUserAccess()
            setUserAccess({
            custId: user.custId,
            username: user.username,
            role: user.role,
            isAdmin: user.isAdmin})
        }
        getUserAuth()
    }, [])

        useEffect(() => { 
            if (cookies.get("isLoggedIn") == false ||cookies.get("isLoggedIn")==null)  { navigate("/login") }
            if (userAccess.role && userAccess.role != "admin") { navigate("/login") }
        }, [])

    useEffect(() => {
        async function getCustomerCart() {

            const customerCart = await getCartByCustId(custId)
            if (customerCart) {
                setCustCart(customerCart.cart)
                setCartItems(customerCart.cart.items)
            }

        }

        getCustomerCart()
    }, [renderFlag])
    
    return (
        <div>
            {custCart ? (
                <div >
                    <h3>Cart ID: {custCart.id}</h3>
                    {/* <div > */}
                        <Table striped bordered hover className="smallTables">
                            <tbody>
                                <tr >
                                    <th>Column</th>
                                    <th>Current Value</th>
                                </tr>

                                <tr>
                                    <td>Customer ID</td>
                                    <td>{custCart.customer_id}</td>
                                </tr>
                                <tr>
                                    <td>Last updated</td>
                                    <td>{custCart.updated_date}</td>
                                </tr>
                                <tr>
                                    <td>Total Price</td>
                                    <td>{(custCart.total_price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                                </tr>
                                <tr>
                                    <td>Converted to order</td>
                                    <td>{custCart.converted.toString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h3>Items in Cart</h3>

                                {cartItems && cartItems.map(item => {
                                    return (
                                
                                        <Table striped bordered hover className="smallTables">
                                            <tbody>
                                                <tr >
                                                    <th>Column</th>
                                                    <th>Current Value</th>
                                                </tr>
                                                <tr>
                                                <td>Item ID</td>
                                                <td>{item.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Item Name</td>
                                                <td>{item.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Item price</td>
                                                <td>{(item.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                                            </tr>
                                            <tr>
                                                <td>Quantity in Cart</td>
                                                <td>{item.quantity}</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                    )
                                })}

                    {/* </div> */}
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            ) : (
                <p>No Cart Found...</p>
            )}

        </div>

    )
}
