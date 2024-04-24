import { useState, useEffect } from 'react';
import { getAllInventory } from '../API';
import { Link, Route, Routes } from 'react-router-dom';


export default function Inventory() {

    const [inventory, setInventory] = useState(null);

    useEffect(() => {

        async function inventory() {

            const getInventory = await getAllInventory()
            setInventory(getInventory)
        }

        inventory()

    }, [])

   

    return (
        <div className='container'>
            <div className='gridContainer'>
             {inventory && inventory.map(item => {
             return <div className='productCard' key={item.id}>

                    <div>
                        <Link to={`/single/${item.id}`}> {item.name} </Link>
                        <p>Price: {(item.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                        <img src={item.imgurl} alt={item.name} />
                        {/* style={{ maxWidth: '100px', maxHeight: '100px' }} */}
                    
                    </div>
                 
                </div>
             })}

            </div>
        </div>
    )

}