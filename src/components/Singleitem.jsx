import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddCartItem, getSingleInventory } from '../API';


export default function Singleitem({ SetNewItemtoCart, token }) {



    const [singleData, setSingleData] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    let { itemId } = useParams();

    useEffect(() => {

        async function single() {

            const data = await getSingleInventory(itemId)
            setSingleData(data);
        }

        single();
    }, []);


    async function addToCart(id, token, quantity) {

        try {
            const Add = await AddCartItem(id, token, quantity);
            SetNewItemtoCart(Add);
        } catch (error) {
            console.error(error);
        };
    };

    // function currencyFormat(num) {
    //     return '$' + num.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    //  }
    // console.log(currencyFormat(500));

    return (
        <div>
            {singleData ? (
                <div>
                    <h2>More Infomation!</h2>
                    <h2>{singleData.name}</h2>
                    {/* <img src={singleData.imageUrl}/> */}
                    <p>Description: {singleData.description}</p>
                    <p>Price: ${singleData.price}</p>

                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                    </label>
                    <button onClick={() => addToCart(singleData.id, token, quantity)}>Add To Cart</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}


        </div>

    )
}