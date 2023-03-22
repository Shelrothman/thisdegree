
import { GiBacon } from 'react-icons/gi';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// ? why is it not sticking when i scrol>?????
// bc i have to set the position to fixed in the css of the topnav


function TopNav() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {/* <Navbar.Brand href="#">My App</Navbar.Brand> */}
                <Navbar.Collapse className="justify-content-end">
                    {/* <Navbar.Text> */}
                        {/* Signed in as: <a href="#">Username</a> */}
                    {/* </Navbar.Text> */}
                    <GiBacon size='2rem' />
                    <GiBacon size='2rem' />
                    <GiBacon size='2rem' />

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNav;