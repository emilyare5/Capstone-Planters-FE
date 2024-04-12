import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { AddCartItem, getSingleInventory } from '../API';

// ...................................(token)
export default function Singleitem({SetNewItemtoCart}){

    const [singleData, setSingleData] = useState(null);
    

    let {itemId} = useParams()

    useEffect(() => {

        async function single(){

            const data = await getSingleInventory(itemId)
            setSingleData(data)
        }

        single()
    },[])

    // console.log(singleData)
    // ........................(token)
    async function addToCart({id, }){

        try{
            const Add = await AddCartItem({id, })
            SetNewItemtoCart(Add)
        }catch(error){
            console.error(error)
        }
    }

    return(
        <div>
           {singleData ? (
                <div>
                    <h2>More Infomation!</h2>
                    <h2>{singleData.name}</h2>
                    {/* <p>Id: {singleData.id}</p> */}
                    {/* <p>Type Id: {singleData.type_id}</p> */}
                    {/* <img src={singleData.imageUrl}/> */}
                    <p>Description: {singleData.description}</p>
                    <p>Price: ${singleData.price}</p>
                    {/* <p>Quantity: {singleData.quantity}</p> */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {/* button...need to pass an object.. that trigger the patch cart endpoint... */}
            {/* item id and quantity */}

           <button onClick={() => addToCart(singleData.id) }></button>
        </div>

    )
}