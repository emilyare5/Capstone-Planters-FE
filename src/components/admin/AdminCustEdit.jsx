import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { getCustomerById } from '../../API';
import { updateCustomer, updateAddress, getUserAccess } from '../../API';
import Cookies from 'universal-cookie';

export default function AdminCustEdit() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [cust, setSingleCust] = useState(null);
    const [renderFlag, setRenderFlag] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [role, setRole] = useState("")
    const [streetNumber, setStreetNumber] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    let { custId } = useParams()
    const [showPassword, setShowPassword] = useState("false")
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
        async function getCustomer() {

            const customer = await getCustomerById(custId)
            if (customer) {
                setSingleCust(customer.customer)
            }

        }

        getCustomer()
    }, [renderFlag])

    async function handleSubmitEditUser(event) {
        event.preventDefault()
        const tempCustObj = {
            username: userName,
            password: password,
            email: email,
            firstname: firstName,
            lastname: lastName,
            phone_number: phone_number,
            role: role
        }

        let custObj = {}
        for (const key in tempCustObj) {
            if (tempCustObj[key] !== null && tempCustObj[key] !== undefined && tempCustObj[key] !== "") {
                custObj[key] = tempCustObj[key];
            }
        }

        const updatedObj = await updateCustomer(custObj, custId)

        if (updatedObj) {
            if (updatedObj.customer) {
                alert("Customer Updated")
                setUserName("")
                setPassword("")
                setEmail("")
                setFirstName("")
                setFirstName("")
                setLastName("")
                setPhoneNumber("")
                setRole("")
                window.location.reload();
            } else {
                alert(updatedObj.name)
            }
        }

    }

    async function handleSubmitEditAddr(event) {
        event.preventDefault()
        const tempAddrObj = {
            street_number: streetNumber,
            street: street,
            city: city,
            state: state,
            zip: zip,
        }

        let addrObj = {}
        for (const key in tempAddrObj) {
            if (tempAddrObj[key] !== null && tempAddrObj[key] !== undefined && tempAddrObj[key] !== "") {
                addrObj[key] = tempAddrObj[key];
            }
        }

        const updatedObj = await updateAddress(addrObj, custId)

        if (updatedObj) {
            if (updatedObj.address) {
                alert("Customer Address Updated")
                setStreetNumber("")
                setStreet("")
                setCity("")
                setState("")
                setZip("")
                window.location.reload();
            } else {
                alert(updatedObj.name)
            }
        }

    }

    function CustDetailsTable({ cust }) {
        return (
            <div>
                <h3>CustomerID: {cust.id}</h3>
                <div key={cust.id}>
                    <Table striped bordered hover className="tables">
                        <tbody>
                            <tr key={cust.id}>
                                <th>Column</th>
                                <th>Current Value</th>
                            </tr>

                            <tr>
                                <td>Username</td>
                                <td>{cust.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{cust.email}</td>
                            </tr>
                            <tr>
                                <td>First name</td>
                                <td>{cust.firstname}</td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td>{cust.lastname}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{cust.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{cust.role}</td>
                            </tr>

                            <tr>
                                <td><Button variant="danger" onClick={() => alert("Functionality pending!")}>Delete Customer</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    function AdrressDetailsTable({ cust }) {
        return (
            <div>
                <h3>Address ID: {cust.id}</h3>
                {cust.address ? (
                    <div >
                        <Table striped bordered hover className="tables">
                            <tbody>
                                <tr key={cust.address.id}>
                                    <th>Column</th>
                                    <th>Current Value</th>
                                </tr>
                                <tr>
                                    <td>CustomerID</td>
                                    <td>{cust.address.customer_id}</td>
                                </tr>
                                <tr>
                                    <td>Street Number</td>
                                    <td>{cust.address.street_number}</td>
                                </tr>
                                <tr>
                                    <td>Street Name</td>
                                    <td>{cust.address.street}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{cust.address.city}</td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>{cust.address.state}</td>
                                </tr>
                                <tr>
                                    <td>Zip Code</td>
                                    <td>{cust.address.zip}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <p>No Address Found...</p>
                )}
            </div>
        )
    }

    // function UpdateCustForm() {
    //     return (
    //         <div>
    //             <Accordion >
    //                 <Accordion.Item eventKey="0">
    //                     <Accordion.Header>Update Customer Details</Accordion.Header>
    //                     <Accordion.Body>
    //                         <Form onSubmit={handleSubmitEditUser} >
    //                             <Form.Group className="mb-3" controlId="regFirst">
    //                                 <Form.Control size="sm" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
    //                                 {/* <Form.Text className="text-muted">First Name</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regLast">
    //                                 <Form.Control size="sm" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
    //                                 {/* <Form.Text className="text-muted">Last Name</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regUser">
    //                                 <Form.Control size="sm" type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter User Name" />
    //                                 {/* <Form.Text className="text-muted">User Name</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regEmail">
    //                                 <Form.Control size="sm" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
    //                                 {/* <Form.Text className="text-muted">Email</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regPass">
    //                                 <div className="pwField">
    //                                     <Form.Control size="sm" type={showPassword ? "password" : "text"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
    //                                     <Button onClick={() => setShowPassword(!showPassword)}>
    //                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
    //                                     </Button>
    //                                 </div>
    //                                 {/* <Form.Text className="text-muted">Password</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regPhone">
    //                                 <Form.Control size="sm" type="text" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
    //                                 {/* <Form.Text className="text-muted">Phone Number</Form.Text> */}
    //                             </Form.Group>
    //                             <Button variant="primary" type="submit">
    //                                 Submit
    //                             </Button>
    //                         </Form>
    //                     </Accordion.Body>
    //                 </Accordion.Item>
    //             </Accordion >
    //         </div>
    //     )
    // }

    // function UpdateAddressForm() {
    //     return (
    //         <div>
    //             <Accordion >
    //                 <Accordion.Item eventKey="0">
    //                     <Accordion.Header>Update Address Details</Accordion.Header>
    //                     <Accordion.Body>
    //                         <Form onSubmit={handleSubmitEditAddr}>
    //                             <Form.Group className="mb-3" controlId="regSteetNum">
    //                                 <Form.Control size="sm" type="text" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} placeholder="Street Number" />
    //                                 {/* <Form.Text className="text-muted">Street Number</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regStreet">
    //                                 <Form.Control size="sm" type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="Enter Street Name" />
    //                                 {/* <Form.Text className="text-muted">Street Name</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regCity">
    //                                 <Form.Control size="sm" type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter City" />
    //                                 {/* <Form.Text className="text-muted">State</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regState">
    //                                 <Form.Control size="sm" type="text" value={state} onChange={e => setState(e.target.value)} placeholder="Enter State" />
    //                                 {/* <Form.Text className="text-muted">State</Form.Text> */}
    //                             </Form.Group>
    //                             <Form.Group className="mb-3" controlId="regZip">
    //                                 <Form.Control size="sm" type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter Zip" />
    //                                 {/* <Form.Text className="text-muted">Zip Code</Form.Text> */}
    //                             </Form.Group>
    //                             <Button variant="primary" type="submit">
    //                                 Submit
    //                             </Button>
    //                         </Form>
    //                     </Accordion.Body>
    //                 </Accordion.Item>
    //             </Accordion >
    //         </div>
    //     )
    // }

    return (
        <div>
            
            <div className="forms" >
                <div className="custForms">
                <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Update Customer Details</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmitEditUser} >
                                    <Form.Group className="mb-3" controlId="regFirst">
                                        <Form.Control size="sm" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
                                        {/* <Form.Text className="text-muted">First Name</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regLast">
                                        <Form.Control size="sm" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
                                        {/* <Form.Text className="text-muted">Last Name</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regUser">
                                        <Form.Control size="sm" type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter User Name" />
                                        {/* <Form.Text className="text-muted">User Name</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regEmail">
                                        <Form.Control size="sm" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
                                        {/* <Form.Text className="text-muted">Email</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regPass">
                                        <div className="pwField">
                                            <Form.Control size="sm" type={showPassword ? "password" : "text"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
                                            <Button onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                        </div>
                                        {/* <Form.Text className="text-muted">Password</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regPhone">
                                        <Form.Control size="sm" type="text" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
                                        {/* <Form.Text className="text-muted">Phone Number</Form.Text> */}
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion >
                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Update Address Details</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmitEditAddr}>
                                    <Form.Group className="mb-3" controlId="regSteetNum">
                                        <Form.Control size="sm" type="text" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} placeholder="Street Number" />
                                        {/* <Form.Text className="text-muted">Street Number</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regStreet">
                                        <Form.Control size="sm" type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="Enter Street Name" />
                                        {/* <Form.Text className="text-muted">Street Name</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regCity">
                                        <Form.Control size="sm" type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter City" />
                                        {/* <Form.Text className="text-muted">State</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regState">
                                        <Form.Control size="sm" type="text" value={state} onChange={e => setState(e.target.value)} placeholder="Enter State" />
                                        {/* <Form.Text className="text-muted">State</Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="regZip">
                                        <Form.Control size="sm" type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter Zip" />
                                        {/* <Form.Text className="text-muted">Zip Code</Form.Text> */}
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion >
                </div>
            </div >
            {cust ? (
                <div>
                    <CustDetailsTable cust={cust} />
                </div>
            ) : (
                <p>Loading Customer Details...</p>
            )}
            <div>
                {cust ? (
                    <div>
                        <AdrressDetailsTable cust={cust} />
                    </div>
                ) : (
                    <p>Loading Address Details...</p>
                )}
            </div>
            <br />
            <br />

        </div>

    )
}

