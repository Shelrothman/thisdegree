import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ActorListContainer from './ActorListContainer.jsx';
import { useActorContext, useGameContext } from '../contexts';
import PlayBoard from './Scoreboard.jsx';


function Launcher() {
    const [show, setShow] = useState(false);
    // const canvasRef = useRef(null);
    const {
        actorA,
        actorB,
        handleActorSelection
    } = useActorContext();
    const {
        gameStarted,
        movieList,
        handleGameStateChange
    } = useGameContext();

    useEffect(() => {
        if (actorA && actorB) {
            setShow(false);
        }
        return () => console.log('cleanup function');
    }, [actorA, actorB]);

    const handleClose = () => {
        return setShow(false);
    }

    // we also want handleShow to clear out the selected actors
    const handleClick = (internalText) => {
        if (internalText === 'Change Actors') {
            let userConfirm = confirm('Are you sure you want to start over?');
            if (userConfirm) {
                handleGameStateChange();
                handleActorSelection(null, null);
                setShow(true);
            }
        } else {
            // just open the offcanvas, no need to change the game state
            setShow(true);
        }
        return;
    }

    const handleReady = () => {
        handleGameStateChange();
        console.log('on ready');
        console.log('gameStarted: ', gameStarted);
        console.log('movieList', movieList);
    }


    return (
        <>
            <Button variant="primary" onClick={(e) => handleClick(e.target.innerHTML)} id="game-button">
                {actorA && actorB ? 'Change Actors' : 'Select Actors'}
            </Button>
            <Offcanvas show={show}
                // ref={canvasRef}
                onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Select Two Actors</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ActorListContainer />
                </Offcanvas.Body>
            </Offcanvas>
            <Button variant="success" onClick={handleReady}
                style={{ display: actorA && actorB ? 'block' : 'none' }}
            >
                Ready!
            </Button>

            <div className="sample-scoreboard">
                <h1>This Degrees</h1>
                <div>
                    <PlayBoard />
                </div>
            </div>
        </>
    );
}


export default Launcher;