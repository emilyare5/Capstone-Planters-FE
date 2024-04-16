import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginCustomer } from '../API'
import { useJwt } from "react-jwt";
import Cookies from 'universal-cookie';


export default function Login({isLoggedIn, setIsLoggedIn}) {
    const cookies = new Cookies();
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tok, setTok] = useState(null)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState("false")
    


    useEffect(() => {
        
        if (cookies.get("isLoggedIn")){
            
            navigate("/")
        }

    }, [isLoggedIn])

    async function handleSubmit(event) { 
        event.preventDefault()
        const loginObj = {}
        loginObj.username = userName
        loginObj.password = password
        const loginResponse = await loginCustomer(loginObj)
        if (loginResponse.name) {
            if (loginResponse.name == "LoginError"|| loginResponse.name == "UserNotFoundError") {
                alert(loginResponse.message)
            } else if (loginResponse.name == "LoginSuccess") {
                cookies.set('isLoggedIn', true)
                setIsLoggedIn(true)
            }
        }
    }
    return (
        <div className="forms" >
            <h2>Please Login</h2>
            <br />
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="regUser">
                    <Form.Control type="username" value={userName} onChange={e => setUsername(e.target.value)} placeholder="Enter User Name" />
                    <Form.Text className="text-muted">User Name</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regPass">
                    <div className="pwField">
                        <Form.Control type={showPassword ? "password" : "text"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
                        <Button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </div>
                    <Form.Text className="text-muted">Password</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    );
}
