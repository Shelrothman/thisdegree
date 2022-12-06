import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GrTree } from 'react-icons/gr';
import { GiLightningTree } from 'react-icons/gi';

function TopNav() {
    return (
        <Navbar id="topNav">
            <Container>
                <Navbar.Brand href="#home">
                    <div id="topNavLogo">
                        <GrTree />
                        <GiLightningTree />
                    </div>
                </Navbar.Brand>
                <h2>This Degrees</h2>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Bruce Banner</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNav;