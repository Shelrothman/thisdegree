
import { GiBacon } from 'react-icons/gi';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { useGameContext } from '../../contexts/GameContext';
// import Form from 'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import ActorASelect from './ActorASelect';
import ActorZSelect from './ActorZSelect';
// TODO: make the actor selection dynamic here so like if they change it at to=op... it can happen all reacty

function TopNav() {

    const { globalGame } = useGameContext() as any;

    // !!! PU HERE and decide what ya wanna fo with the actor selecting a and z thang
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {/* <div className="f;pa"> */}
                {/* <select></select> */}
                ActorA:
                <ActorASelect />
                {/* </div> */}
                &nbsp;
                <GiBacon size='2rem' />
                <GiBacon size='2rem' />
                <GiBacon size='2rem' />
                &nbsp;
                ActorZ:
                {globalGame.actorZ}
            </Container>
        </Navbar>
    );
}

export default TopNav;