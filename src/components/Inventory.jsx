import { useState, useEffect } from 'react';
import { getAllInventory } from '../API';
import { Link, Route, Routes } from 'react-router-dom';


export default function Inventory() {

    const imgAddr= '../src/assets/assets2/'

    const [inventory, setInventory] = useState(null);

    useEffect(() => {

        async function inventory() {

            const getInventory = await getAllInventory()
            setInventory(getInventory)
        }

        inventory()

    }, [])

   

    return (
        <div>
           {inventory && inventory.map(item => {
            return <div className='productCard' key={item.id}>

                <div>
                    <Link to={`/single/${item.id}`}> {item.name} </Link>
                </div>
                <div>
                    <img src={imgAddr+item.imgurl} alt={item.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                 </div>
                 
            </div>
           })}

        </div>
    )

}