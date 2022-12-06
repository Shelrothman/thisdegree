/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navbar, Form, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { getTenants } from "../data/tenants";


const swaggerLink = "https://aderantcompliance-us-dev.azurewebsites.net/api/docs/"
// TODO: ADD all the JS logic into this from the ejs file... all the handeling. routing, tenant shiz.. etc



function RulesNav({ setLocalTenant }) {
    const [selectedTenant, setSelectedTenant] = useState();


    const [tenants, setTenants] = useState([]);

    const handleTenantChange = (event) => {
        setLocalTenant(event.target.value); // this is to allow the props to pass between siblings with App as parent
        setSelectedTenant(event.target.value);
    }
    


    useEffect(() => {
        console.log('tenant changed to ' + selectedTenant);
        // save the tenant in res.locals
    }, [selectedTenant]);

    useEffect(() => {
        console.log('onMount');
        setTenants(() => getTenants().map(tenant => tenant.PartitionKey))
        // console.log(tenants);
    }, []);


    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/" className="site-title">
                        <img
                            alt=""
                            src="images/funnylogo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                    </Link>
                    Core Compliance
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Form.Group id="navbarTenantForm">
                        <Form.Label>Tenant:</Form.Label>{' '}
                        <Form.Select onChange={(e) => handleTenantChange(e)}
                        style={{ "width": "430px" }} 
                        >
                            <option selected disabled>(Select a tenant...)</option>
                            {tenants.map((tenant) => (
                                <option value={tenant} key={tenant}>
                                    {tenant}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Item>
                            <a target="_blank" href={swaggerLink} rel="noopener noreferrer">
                                API
                            </a>
                        </Nav.Item>
                        <NavDropdown title="Data">
                            {/* Samples */}
                            <CustomLink className="dropdown-item" to="/samples">
                                Samples
                            </CustomLink>
                        </NavDropdown>
                        <NavDropdown title="Profile">
                            <CustomLink className="dropdown-item" to="/profile">
                                View
                            </CustomLink>
                            <CustomLink className="dropdown-item" to="/logout">
                                Logout
                            </CustomLink>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar.Collapse>
        </Navbar>
    );
}

//TODO move this to ../utils folder
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath?.pathname, end: true })
    return (
        <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}


export default RulesNav;