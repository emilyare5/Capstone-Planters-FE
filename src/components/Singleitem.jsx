import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getSingleInventory } from '../API';

export default function Singleitem(){

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
        </div>

    )
}