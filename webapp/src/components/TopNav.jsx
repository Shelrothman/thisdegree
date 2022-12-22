import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import { GrTree } from 'react-icons/gr';
import { GiLightningTree, GiNestBirds } from 'react-icons/gi';

import ThemeToggler from '../utils/ThemeToggler';
import { AUTH_TOKEN } from '../utils/constants';

//TODO: really need to add error-handling in the API side for incorrect passwords and shizzz

// TODO make this navBar display prettier and collapsible shiz
// add dropdowns for the links 

function TopNav() {

    const navigate = useNavigate();
    // TODO: important! use something else than local storage for auth token... maybe my context?
    const authToken = localStorage.getItem(AUTH_TOKEN);


    return (
        <Navbar id="topNav">
            <Container>
                <Navbar.Brand>
                    <div id="topNavLogo">
                        <GrTree />
                        <GiLightningTree />
                    </div>
                </Navbar.Brand>

                <NavLink to="/" className="navbar-brand">
                    <h2>This Degrees</h2>
                </NavLink>
                <Navbar.Toggle />
                {/* collapse add back in here */}
                <div className="justify-content-end">

                    {authToken && (
                        <div className="flex">
                            <div className="ml-2">|</div>
                            <NavLink
                                to="/createTree"
                                className="ml-2 no-underline black"
                            >
                                submit-tree
                            </NavLink>
                        </div>
                    )}

                    <NavLink to="/account">
                        My Account
                    </NavLink>
                    {` `}
                    <NavLink to='/treeHome'>
                        Trees
                    </NavLink>
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
    );
}

export default TopNav;