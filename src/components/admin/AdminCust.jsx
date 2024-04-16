import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getAllCustomers } from '../../API';
import Cookies from 'universal-cookie';
import { getUserAccess } from '../../API';

export default function AdminCust() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState(null);
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
        async function getCustomers() {

            const customers = await getAllCustomers()
            setCustomers(customers)
        }

        getCustomers()
    }, [])


    return (
        <div>
            <Table striped bordered hover className="tables">
                <tbody>
                    <tr>
                        <th style={{ width: '2%' }}>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th style={{ width: '5%' }}></th>
                        <th style={{ width: '5%' }}></th>
                    </tr>
                    {customers &&
                        customers.customers.map(cust => {
                            return (
                                <tr key={cust.id}>
                                    <td>{cust.id}</td>
                                    <td>{cust.username}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.firstname}</td>
                                    <td>{cust.lastname}</td>
                                    <td>{cust.phone_number}</td>
                                    <td>{cust.role}</td>
                                    <td><Button variant="outline-info" size="sm"><Link to={`/admin/customers/${cust.id}`}>Edit</Link></Button></td>
                                    <td><Button variant="outline-info" size="sm"><Link to={`/admin/customers/${cust.id}/cart`}>Cart</Link></Button></td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table >
        </div>
    )

}