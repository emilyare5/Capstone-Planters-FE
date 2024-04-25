import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import { getAllInventory, getAllInvTypes, addInventoryItem, getUserAccess } from '../../API';
import Cookies from 'universal-cookie';





export default function Inventory() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [inventory, setInventory] = useState(null);
    const [types, setTypes] = useState([{ id: 1, type: "all" }]);
    const [typeId, setTypeId] = useState(1)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [renderFlag, setRenderFlag] = useState("")
    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""});

    useEffect(() => {
        async function getUserAuth() {
            const user = await getUserAccess()
            setUserAccess({
            custId: user.custId,
            username: user.username,
            role: user.role,
            isAdmin: user.isAdmin})
        }
        getUserAuth()
    }, [])
    useEffect(() => { 
        if (cookies.get("isLoggedIn") == false ||cookies.get("isLoggedIn")==null)   { navigate("/login") }
        if (userAccess.role && userAccess.role != "admin") { navigate("/login") }
    }, [])


    useEffect(() => {
        async function getInventory() {

            const getInventory = await getAllInventory()
            setInventory(getInventory)
        }
        async function getTypes() {

            const invTypes = await getAllInvTypes()
            if (invTypes) {
                setTypes(invTypes)
            }

        }
        getTypes()
        getInventory()

    }, [renderFlag])





    async function handleSubmitAddInv(event) {
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

        const addedObj = await addInventoryItem(invObj)
        if (addedObj) {
            if (addedObj.name == "error") {
                alert(addedObj.name)


            } else {
                alert("Added Object: " + addedObj.name)
                window.location.reload();
            }
        }

    }

    return (
        <div>
            <br />
            <br />
            <div className='admin'>
            <h2>View and Update Inventory Data</h2>
            </div>
            <br />
            <br />
            <div className="forms">
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add Inventory Item</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={handleSubmitAddInv} >
                                <Form.Group className="mb-3" controlId="regType">
                                    {types &&
                                        <Form.Select aria-label="Select Item Type" onChange={e => setTypeId(e.target.value)}>
                                            {
                                                types.map(type => {
                                                    return (
                                                        <option key={type.id} value={type.id}>{type.type}</option>
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
            <br />
            <br />
            <br />
            <Table striped bordered hover className="smallTables" >
                <tbody>
                    <tr>
                        <th style={{ width: '10%' }}></th>
                        <th style={{ width: '10%' }}>ID</th>
                        <th style={{ width: '10%' }}>Type ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity In Stock</th>

                    </tr>
                    {inventory &&
                        inventory.map(inv => {
                            return (
                                <tr key={inv.id}>
                                    <td><Button variant="outline-info" size="sm" ><Link to={`/admin/inventory/${inv.id}`}>Edit Item</Link></Button></td>
                                    <td>{inv.id}</td>
                                    <td>{inv.type_id}</td>
                                    <td>{inv.name}</td>
                                    <td>{(inv.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                                    <td>{inv.quantity}</td>
                                </tr>

                            )

                        })}
                </tbody>
            </Table>
        </div>
    )

}