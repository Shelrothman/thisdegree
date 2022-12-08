import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ActorListContainer from './ActorListContainer.jsx';
import { useActorContext, useGameContext } from '../contexts';



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
        handleGameStateChange,
        handleNewMovieGuess
    } = useGameContext();

    useEffect(() => {
        if (actorA && actorB) {
            setShow(false);
        }
        return () => console.log('cleanup function');
    }, [actorA, actorB]);

    const handleClose = () => {
        // canvasRef.current.style.display = 'none';
        return setShow(false);
    }

    // we also want handleShow to clear out the selected actors
    const handleShow = () => {
        handleActorSelection(null, null);
        setShow(true);
    }

    const handleReady = () => {
        handleGameStateChange();
        console.log('on ready');
        console.log('gameStarted: ', gameStarted);
        console.log('movieList', movieList);
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
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
        </>
    );
}


export default Launcher;