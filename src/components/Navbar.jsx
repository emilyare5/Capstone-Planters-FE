import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { logoutCustomer, getUserAccess } from '../API';

export default function Navibar({isLoggedIn}) {
    const cookies = new Cookies();
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
    }, [isLoggedIn])

    async function logOut() {
        logoutCustomer()
        cookies.remove("isLoggedIn", false)
        window.location.reload();
    }


    {
        userAccess.username ? <button onClick={logOut}>Log Out</button>
            : <button><Link to="/login">Login</Link></button>
    }
    {
        userAccess.username ? null
            : <button><Link to="/register">Register New User</Link></button>
    }

    function LoggedInNavs() {
        return (
            <>
                    <NavDropdown title={userAccess.username} id="basic-nav-dropdown">
                    <Nav.Item>
                        <Button onClick={logOut} variant="secondary" size="sm">Log Out</Button>
                    </Nav.Item>
                    <NavDropdown.Item href="/mycart">My Cart</NavDropdown.Item>
                    <NavDropdown.Item href="#cart">My Account</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {
                        userAccess.isAdmin ? <AdminNavs />
                            : null
                    }
                </NavDropdown>
            </>
        )
    }

    function LoggedOutNavs() {
        return (
            <>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register">Register Now</Nav.Link>
                </Nav.Item>
            </>
        )
    }

    function AdminNavs() {
        return (
            <>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin/customers">ADMIN - All Customers</NavDropdown.Item>
                <NavDropdown.Item href="/admin/inventory">ADMIN - All Inventory</NavDropdown.Item>
                <NavDropdown.Divider />
            </>
        )
    }

    return (
        <Navbar id="navbar" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Planters Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link href="/">Shop Now</Nav.Link>
                        </Nav.Item>
                        {
                            userAccess.username ? <LoggedInNavs />
                                : <LoggedOutNavs />
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}