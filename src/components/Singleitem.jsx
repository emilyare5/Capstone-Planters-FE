import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserAccess, AddCartItem, getSingleInventory } from '../API';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';

export default function Singleitem({ SetNewItemtoCart }) {

    const cookies = new Cookies();

    const [singleData, setSingleData] = useState(null);
    let { itemId } = useParams();

    const [quantity, setQuantity] = useState(1);

    const [showAlert, setShowAlert] = useState(false);

    const [addedToCartt, setAddedToCartt] = useState(false);

    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""
    });

    const [showButton, setShowButton] = useState(false)




    useEffect(() => {
        async function getUserAuth() {

            const user = await getUserAccess()
            setUserAccess({
                custId: user.custId,
                username: user.username,
                role: user.role,
                isAdmin: user.isAdmin
            })
        }

        getUserAuth()
    }, [])

    useEffect(() => {

        async function single() {

            const data = await getSingleInventory(itemId)
            setSingleData(data);
        }

        single();
    }, []);


    async function addToCart(id, quantity) {

        try {

            const Add = await AddCartItem(id, quantity);
            SetNewItemtoCart(Add);
            setShowAlert(true);
            setAddedToCartt(true);
            setShowButton(true)

        } catch (error) {
            console.error(error);
        };
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));

    };

    useEffect(() => {

        if (showAlert) {

            setTimeout(() => {
                setShowAlert(false);
                setAddedToCartt(false);
            }, 3000)
        }

    }, [showAlert]);



    return (
        <div>
            {singleData ? (
                <div>

                    <h2>{singleData.name}</h2>
                    {/* <img src={singleData.imageUrl}/> */}
                    <p>Description: {singleData.description}</p>
                    <p>Price: ${(singleData.price / 100).toFixed(2)}</p>

                    {cookies.get("isLoggedIn") && !addedToCartt && (
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </label>
                    )}

                    <div>
                        {quantity === 1 ? showAlert && <div> <p>Added {quantity} {singleData.name} To Cart!</p></div> :
                            showAlert && <div> <p>Added {quantity} {singleData.name}s To Cart!</p></div>}
                    </div>

                    {cookies.get("isLoggedIn") && !addedToCartt && (
                        <button onClick={() => addToCart(singleData.id, quantity)} >Add To Cart</button>
                    )}

                    {cookies.get("isLoggedIn") && showButton && (
                        <Button className="addToCartButt" variant="outline-info"> <Link className="addToCartLinkButt" to={"/mycart"}> Go to Cart</Link> </Button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}


        </div>

    )
}