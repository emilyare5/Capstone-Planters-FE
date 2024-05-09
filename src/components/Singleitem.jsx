import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserAccess, getSingleInventory, getCartItems, updateCartItem } from '../API';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Singleitem() {

    const cookies = new Cookies();
    const [singleData, setSingleData] = useState(null);
    let { itemId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [addedToCartt, setAddedToCartt] = useState(false);
    const [currently, setCurrently] = useState(0);

    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""
    });

    useEffect(() => {

        async function getUserAuth() {

            const user = await getUserAccess();

            setUserAccess({
                custId: user.custId,
                username: user.username,
                role: user.role,
                isAdmin: user.isAdmin
            });
        };

        if (cookies.get("isLoggedIn")){
            getUserAuth();
        }

    }, []);

    useEffect(() => {

        async function single() {

            const data = await getSingleInventory(itemId)
            setSingleData(data);

        };

        single();

    }, []);


    async function addToCart(id, quantity) {

        try {

            const Add = await updateCartItem(id, quantity);

            setShowAlert(true);
            setAddedToCartt(true);

        } catch (error) {
            console.error(error);
        };
    };

    const handleQuantityChange = (event) => {

        setQuantity(event.target.value);

    };

    useEffect(() => {

        if (showAlert) {

            setTimeout(() => {

                setShowAlert(false);
                setAddedToCartt(false);

            }, 3000)
        };

    }, [showAlert]);

    async function getQuantity() {

        let arrayCart = [];

        const itemData = await getCartItems();

        if (Object.keys(itemData).length > 0) {
            arrayCart = itemData.cart.items;
        }


        if (arrayCart && singleData) {

            arrayCart.find(item => {

                if (item.id == singleData.id) {

                    const quantityNum = item.quantity;

                    setCurrently(quantityNum);
                    setQuantity(quantityNum);

                };

            });
        };

    };

    useEffect(() => {

        if (cookies.get("isLoggedIn")){
            getQuantity();
        }
        

    }, [addedToCartt, singleData]);


    return (

        <div className='container'>

            <div className='title'>

                <h1>Buy Now</h1>

            </div>

            <div className='itemcard'>

                {singleData ? (

                    <div>

                        <h2>{singleData.name}</h2>
                        <p>${(singleData.price / 100).toFixed(2)}</p>
                        <img src={singleData.imgurl} alt={singleData.name} />
                        <p>Description: {singleData.description}</p>

                        <div className='quantityF'>

                            <div>

                                {cookies.get("isLoggedIn") && !addedToCartt && (

                                    <div>

                                        <Form.Control type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                                        
                                    </div>

                                )}

                            </div>

                        </div>

                        <div>

                            {showAlert && <div> <p>Updated Cart!</p></div>}

                        </div>

                        <div>

                            {cookies.get("isLoggedIn") && (

                                currently === 0 ? (
                                    <Button onClick={() => addToCart(singleData.id, quantity)} variant="outline-primary">Add to Cart</Button>
                                ) : (
                                    <Button onClick={() => addToCart(singleData.id, quantity)} variant="outline-primary">Update Cart</Button>
                                )
                            )}

                        </div>

                        {cookies.get("isLoggedIn") && !addedToCartt && (

                            <p>Currently in Cart: {currently}</p>

                        )}

                        {cookies.get("isLoggedIn") && (

                            <div className='buttBox'>

                                <div>

                                    <Link className="addToCartLinkButt" to={"/mycart"}> Go to Cart</Link>

                                </div>

                                <div>

                                    <Link className="contiuneShoppingButt" to={"/"}>Keep Shopping</Link>

                                </div>

                            </div>

                        )}

                    </div>

                ) : (
                    <p>Loading...</p>
                )}
            </div>


        </div>

    );
};