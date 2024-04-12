import React, { useEffect, useState } from 'react'
import { Link, Routes, Route, UNSAFE_DataRouterStateContext } from 'react-router-dom'
import '../style/index.css'
import Inventory from './Inventory'
import Register from './Register'
import Login from './Login'
import Navigations from './Navigations'
import { useJwt } from "react-jwt";
import Singleitem from './Singleitem'


const App = () => {
  const [user, setUser] = useState({ name: "", token: "", role: "" })
  const [userRole, setUserRole] = useState("")
  const { decodedToken, isExpired } = useJwt(user.token);

  const [newItemAdded, SetNewItemtoCart] = useState(null);

  useEffect(() => {
    let savedU = localStorage.getItem("username")
    let savedT = localStorage.getItem("token")
    let savedR = localStorage.getItem("role")
    if (savedU && savedT && savedR) {
      setUser({
        name: savedU,
        token: savedT,
        role: savedR
      })
    }
  }, [])
  useEffect(() => {
    if (decodedToken) {
      localStorage.setItem("username", decodedToken.username)
      localStorage.setItem("role", decodedToken.role)
      setUser({
        name: decodedToken.username,
        token: user.token,
        role: decodedToken.role
      })
    }
  }, [decodedToken])

  return (
    <div>
      <Navigations {...user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login {...user} setUser={setUser} decodedToken={decodedToken} useJwt={useJwt} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Inventory />} />
        <Route path="/single/:itemId" element={<Singleitem SetNewItemtoCart={SetNewItemtoCart} {...user} />} />
      </Routes>
    </div>
  )
}



export default App
