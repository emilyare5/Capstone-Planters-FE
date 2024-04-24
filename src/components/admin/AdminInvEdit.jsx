import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import { getAllInvTypes, getSingleInventory, updateInventoryItem, getUserAccess } from '../../API';
import Cookies from 'universal-cookie';

export default function AdminInvEdit() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [inv, setSingleInv] = useState(null);
    const [types, setTypes] = useState(null);
    const [type, setType] = useState("all")
    const [typeId, setTypeId] = useState("")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [renderFlag, setRenderFlag] = useState("")
    let { invId } = useParams()
    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""
    });

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
        if (cookies.get("isLoggedIn") == false || cookies.get("isLoggedIn") == null) { navigate("/login") }
        if (userAccess.role && userAccess.role != "admin") { navigate("/login") }
    }, [])

    useEffect(() => {
        async function getInventoryItem() {

            const invItem = await getSingleInventory(invId)
            if (invItem) {
                setSingleInv(invItem)
            }

        }

        async function getTypes() {

            const invTypes = await getAllInvTypes()
            if (invTypes) {
                setTypes(invTypes)
            }

        }
        getTypes()
        getInventoryItem()

    }, [])

    async function handleSubmitEditInv(event) {
        event.preventDefault()
        const tempInvObj = {
            type_id: typeId,
            name: name,
            description: desc,
            price: price * 100,
            quantity: quantity,
            imgUrl: imgUrl,
        }

        let invObj = {}
        for (const key in tempInvObj) {
            if (tempInvObj[key] !== null && tempInvObj[key] !== undefined && tempInvObj[key] !== "") {
                invObj[key] = tempInvObj[key];
            }
        }

        const updatedObj = await updateInventoryItem(invObj, invId)
        if (updatedObj) {
            if (updatedObj) {
                alert("Product Updated")

                window.location.reload();
            } else {
                alert(updatedObj.name)
            }
        }

    }


        function getTypeName(id) {
            if (types) {
                const typeName = types.filter((i) => i.id == id)
                return typeName[0]
            } else { return { type: "unknown" } }

        }


    return (
        <div>
            <br />
            <br />
            <div className='admin'>
            <h2>Edit Item</h2>
            </div>
            <br />
            <br />
            <div className='admin'>
            {inv ? <h2>Item Details for - {inv.name}</h2> : <h2>Item Details for ... </h2>}
            </div>
            <br />
            <br />
            <div style={{width: "50%"}}>
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Edit Item</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmitEditInv} >
                                    <Form.Group className="mb-3" controlId="regType">
                                        {types &&
                                            <Form.Select  value={typeId} onChange={e => setTypeId(e.target.value)} aria-label="Select Item Type">
                                                {
                                                    types.map(type => {
                                                        return (
                                                            <option key={type.id} value={type.id} onChange={e => setTypeId(e.target.value)} >{type.type}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regName">
                                        <Form.Control size="sm" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Item Name" />
                                        {/* <Form.Text className="text-muted">Item Name</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group size="sm" className="mb-3" controlId="regDesc">
                                        <Form.Control as="textarea" rows="4" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter Description" />
                                        {/* <Form.Text className="text-muted">Item Description</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regPrice">
                                        <Form.Control size="sm" type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price $$" />
                                        {/* <Form.Text className="text-muted">Price</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regQua">
                                        <Form.Control size="sm" type="text" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Enter Quantity" />
                                        {/* <Form.Text className="text-muted">Quantity In Stock</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regImg">
                                        <Form.Control size="sm" type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="Enter Img Address" />
                                        {/* <Form.Text className="text-muted">Image Address</Form.Text> */}
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            {inv ? (
                <div>
                    <h3>Inventory ID: {inv.id}</h3>
                    <div key={inv.id}>
                        <Table striped bordered hover className="smallTables" >
                            <tbody>
                                <tr key={inv.id}>
                                    <th>Column</th>
                                    <th>Value</th>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{getTypeName(inv.type_id).type}</td>
                                </tr>
                                <tr>
                                    <td>Product Name</td>
                                    <td>{inv.name}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{inv.description}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{(inv.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                                </tr>
                                <tr>
                                    <td>Quantity In Stock</td>
                                    <td>{inv.quantity}</td>
                                </tr>
                                <tr>
                                    <td>Image URL</td>
                                    <td>{inv.imgurl}</td>
                                </tr>

                                <tr>
                                    <td><Button variant="danger" size="sm" onClick={() => alert("Functionality not created yet!")}>Remove From Inventory</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <br />
                    <br />
                    <div className="forms">
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>

    )
}

