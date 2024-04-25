import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerNewUser } from '../API'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [role, setRole] = useState("customer")
    const [streetNumber, setStreetNumber] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [showPassword, setShowPassword] = useState("false")

    async function handleSubmit(event) {
        event.preventDefault()
        const customer = {}
        const address = {}
        customer.userName = userName
        customer.password = password
        customer.email = email
        customer.firstName = firstName
        customer.lastName = lastName
        customer.phone_number = phone_number
        customer.role = role
        address.streetNumber = streetNumber
        address.street = street
        address.city = city
        address.state = state
        address.zip = zip
        console.log(customer)
        console.log(address)
        const newUserObj = await registerNewUser(customer, address)

        if (newUserObj.message) {
            if (newUserObj.message == "Registration Succesful!") {
                alert(newUserObj.message)
                setUserName("")
                setPassword("")
                setEmail("")
                setFirstName("")
                setFirstName("")
                setLastName("")
                setPhoneNumber("")
                setRole("")
                setStreetNumber("")
                setStreet("")
                setCity("")
                setState("")
                setZip("")
                navigate("/login")
            } else {
                alert(newUserObj.message)
            }
        }

    }




    return (
        <div className="registerform">
            <h2>Register Here!</h2>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="regFirst">
                    <Form.Control size="sm" type="name" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
                    {/* <Form.Text className="text-muted">First Name</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regLast">
                    <Form.Control size="sm" type="name" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
                    {/* <Form.Text className="text-muted">Last Name</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regUser">
                    <Form.Control size="sm" type="username" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter User Name" />
                    {/* <Form.Text className="text-muted">User Name</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regEmail">
                    <Form.Control size="sm" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
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
                    <Form.Control size="sm"  type="number" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
                    {/* <Form.Text className="text-muted">Phone Number</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regSteetNum">
                    <Form.Control size="sm" type="name" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} placeholder="Street Number" />
                    {/* <Form.Text className="text-muted">Street Number</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regStreet">
                    <Form.Control size="sm" type="name" value={street} onChange={e => setStreet(e.target.value)} placeholder="Enter Street Name" />
                    {/* <Form.Text className="text-muted">Street Name</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regCity">
                    <Form.Control size="sm"  type="username" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter City" />
                    {/* <Form.Text className="text-muted">State</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regState">
                    <Form.Control size="sm" value={state} onChange={e => setState(e.target.value)} placeholder="Enter State" />
                    {/* <Form.Text className="text-muted">State</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="regZip">
                    <Form.Control size="sm"  type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter Zip" />
                    {/* <Form.Text className="text-muted">Zip Code</Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Sign Up for Email Alerts" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    );
}



