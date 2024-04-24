import { useState, useEffect } from 'react';
import { getAllInventory, getAllInvTypes } from '../API';
import { Link, Route, Routes } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Inventory() {
    const [inventory, setInventory] = useState(null);
    const [showInventory, setShowInventory] = useState(null);
    const [types, setTypes] = useState(null)
    const [type, setType] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    async function fetchTypes() {

        const invTypes = await getAllInvTypes()
        if (invTypes) {
            setTypes(invTypes)
        }

    }

    async function fetchInventory() {

        const getInventory = await getAllInventory()
        setInventory(getInventory)
        setShowInventory(getInventory)
    }
    

    useEffect(() => {
        fetchInventory()
        fetchTypes()

    }, [])


    useEffect(() => {

        if (type == "all"){
            setShowInventory(inventory)
        } else if (searchTerm != ""){
            const filteredInvType = showInventory.filter((inv)=> inv.type_id == type)
            setShowInventory(filteredInvType)
        } else if (inventory && type != "all"){
            const filteredInvType = inventory.filter((inv)=> inv.type_id == type)
            setShowInventory(filteredInvType)
        }

    }, [type])

    useEffect(() => {

        if (type != "all"){
            const filteredInv = showInventory.filter((inv)=> inv.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setShowInventory(filteredInv)
        } else if (inventory){
        setShowInventory(inventory)
        const filteredInv = inventory.filter((inv)=> inv.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setShowInventory(filteredInv)
        }

    }, [searchTerm])



    function clearFunction(event){
        event.preventDefault()
        setType("all")
        setSearchTerm("")
    }


    return (
        <div className='container'>
            <div className='SearchContainer'>

                <div className='searchBar'>
                    <h3>Find Items</h3>
                    <Form  >
                    <Form.Text className="text-muted">Filter by Category</Form.Text>
                        <Form.Group className="mb-3" controlId="regType">
                            {types &&
                                <Form.Select value={type} onChange={e => setType(e.target.value)} aria-label="Select Item Type">
                                    <option key={"all"} value={"all"} onChange={e => type(e.target.value)} >all</option>
                                    {
                                        types.map(type => {
                                            return (
                                                <option key={type.id} value={type.id} onChange={e => type(e.target.value)} >{type.type}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            }
                        </Form.Group>
                        <div id="searchBarDivider"></div>
                        <Form.Group className="mb-3" controlId="regName">
                                    <Form.Control size="sm" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search By Name" />
                                    {/* <Form.Text className="text-muted">Item Name</Form.Text> */}
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={clearFunction} variant="outline-info" type="submit">Clear</Button>
                        </div>
                    </Form>
                </div>

                <div className='gridContainer'>

                    {showInventory && showInventory.map(item => {
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
        </div>
    )

}