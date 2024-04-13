import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { AddCartItem, getSingleInventory } from '../API';

// ...................................(token)
export default function Singleitem({SetNewItemtoCart,token}){

    

    const [singleData, setSingleData] = useState(null);
    

    let {itemId} = useParams()

    useEffect(() => {

        async function single(){

            const data = await getSingleInventory(itemId)
            setSingleData(data)
        }

        single()
    },[])

   
    async function addToCart(id,token){

        try{
            const Add = await AddCartItem(id,token)
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
                    {/* <img src={singleData.imageUrl}/> */}
                    <p>Description: {singleData.description}</p>
                    <p>Price: ${singleData.price}</p>
                   
                    <button onClick={() => addToCart(singleData.id, token) }>Add To Cart</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            

        </div>

    )
}