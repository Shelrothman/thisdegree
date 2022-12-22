import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import { GrTree } from 'react-icons/gr';
import { GiLightningTree } from 'react-icons/gi';
import ThemeToggler from '../utils/ThemeToggler';
import { AUTH_TOKEN } from '../utils/constants';

//TODO: really need to add error-handling in the API side for incorrect passwords and shizzz
//TODO modulate the crap out of this component
// TODO make this navBar display prettier and collapsible shiz
// add dropdowns for the links 


function TopNav() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    // TODO: important! use something else than local storage for auth token... maybe my context?
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const dismissibleAlert = () => {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                You must be logged in to submit a tree! Please <Alert.Link href="/login">Login</Alert.Link> and try again.
            </Alert>
        )
    }


    return (
        <>
            <Navbar id="topNav">
                <Container>
                    <Navbar.Brand>
                        <div id="topNavLogo">
                            <GrTree /><GiLightningTree />
                        </div>
                    </Navbar.Brand>

                    <NavLink to="/" className="navbar-brand">
                        <h2>This Degrees</h2>
                    </NavLink>
                    <Navbar.Toggle />
                    {/* collapse add back in here */}
                    <div className="justify-content-end">
                        <NavDropdown title='Trees'>
                            <NavDropdown.Item>
                                <div onClick={() => navigate('/treehome')}>
                                    Tree Feed
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        if (authToken) {
                                            navigate(`/createTree`);
                                        } else {
                                            setShow(true);
                                            setTimeout(() => {
                                                setShow(false);
                                            }, 4000);
                                        }
                                    }}
                                >
                                    Sumbit Tree
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>



                        <NavLink to="/account">
                            My Account
                        </NavLink>
                        {` `}
                        {` `}

                        {/* TODO: PU and create better way than localStrorage to do that */}
                        <div>
                            {authToken ? (
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        localStorage.removeItem(AUTH_TOKEN);
                                        navigate(`/`);
                                    }}
                                >
                                    Logout
                                </div>
                            ) : (
                                <NavLink to="/login" className="ml-2">
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <ThemeToggler />
                </Container>
            </Navbar>
            {show && dismissibleAlert()}
        </>
    );
}

export default TopNav;