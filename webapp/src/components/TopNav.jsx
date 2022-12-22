import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GrTree } from 'react-icons/gr';
import { GiLightningTree, GiNestBirds } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import ThemeToggler from '../utils/ThemeToggler';

// TODO make this navBar display prettier and collapsible shiz
// add dropdowns for the links 

function TopNav() {
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
                <Navbar.Collapse className="justify-content-end">
                    <NavLink to="/account">
                        My Account 
                    </NavLink>
                    |{` `}
                    <NavLink to='/treeHome'>
                    {` `}Trees
                    </NavLink>
                    |
                    <NavLink to='/logout'>
                        Login/out
                    </NavLink>

                </Navbar.Collapse>
                <ThemeToggler />
            </Container>
        </Navbar>
    );
}

export default TopNav;