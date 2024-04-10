import { useState, useEffect } from 'react';
import { getAllInventory } from '../API';

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
        <div>
           {inventory && inventory.map(item => {
            return <div key={item.id}>

                <div>
                    <p>{item.name}</p>
                </div>
            </div>
           })}

        </div>
    )

}