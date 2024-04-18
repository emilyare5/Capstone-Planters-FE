import { useState, useEffect } from 'react'
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
        <div>
            <form id="registerForm" onSubmit={handleSubmit}>
                <div>
                    <h2>Register New User</h2>
                    <div className='formFields'>
                        <label>User Name:</label>
                        <input value={userName} onChange={(event) => setUserName(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Password:</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Email Address:</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>First Name:</label>
                        <input value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Last Name:</label>
                        <input value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Phone Number:</label>
                        <input value={phone_number} onChange={(event) => setPhoneNumber(event.target.value)}></input>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='formFields'>
                        <label>Street Number:</label>
                        <input value={streetNumber} onChange={(event) => setStreetNumber(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Street:</label>
                        <input value={street} onChange={(event) => setStreet(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>City:</label>
                        <input value={city} onChange={(event) => setCity(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>State:</label>
                        <input value={state} onChange={(event) => setState(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Zip Code:</label>
                        <input value={zip} onChange={(event) => setZip(event.target.value)}></input>
                    </div>
                    <br></br>
                    <button>Submit</button>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </form>
        </div>
    );
}