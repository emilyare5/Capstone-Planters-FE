import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginCustomer } from '../API'
import { useJwt } from "react-jwt";

export default function Login({ name, token, role, setUser }) {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { decodedToken, isExpired } = useJwt(token);
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        const loginObj = {}
        loginObj.username = userName
        loginObj.password = password
        const loginResponse = await loginCustomer(loginObj)
        if (loginResponse.name) {
            if (loginResponse.name == "LoginError") {
                alert(loginResponse.message)
            } else if (loginResponse.name == "LoginSuccess") {
                if (loginResponse.token) {
                    localStorage.setItem("token", loginResponse.token)
                    setUser({ token: loginResponse.token })
                    navigate("/")
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Login</h2>
                    <div className='formFields'>
                        <label>Username:</label>
                        <input value={userName} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <br></br>
                    <div className='formFields'>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
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