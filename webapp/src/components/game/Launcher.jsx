import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import ActorListContainer from '../ActorListContainer.jsx';
import { useActorContext, useGameContext } from '../../contexts';

import PlayBoard from './PlayBoard.jsx';
import MovieBtn from '../buttons/MovieBtn.jsx';
import PlayBtn from '../buttons/PlayBtn.jsx';
import ActorHeader from './ActorHeader.jsx';
import FormContainer from './form/FormContainer.jsx';
import TreeBuildContainer from './display/TreeBuildContainer.jsx';

function Launcher() {
    const [show, setShow] = useState(false);
    const {
        actorA,
        actorB,
        handleActorSelection
    } = useActorContext();
    const {
        gameStarted,
        movieList,
        handleGameStateChange,
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
        } else { // just open the offcanvas, no need to change the game state bc its hasnt started yet
            setShow(true);
        }
        return; // this will return no matter what
    }

    const handleReady = () => {
        //TODO PU here and handle the setReadyToBridge stuff (in context)
        handleGameStateChange();
        console.log('on ready');
        console.log('gameStarted: ', gameStarted);
        console.log('movieList', movieList);
    }


    return (
        <>
            <MovieBtn
                text={actorA && actorB ? 'Change Actors' : 'Select Actors'}
                handler={handleClick}
            /> <br />
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
            <PlayBtn
                text={gameStarted ? 'Ready to Bridge!' : 'Play!'}
                handler={handleReady}
                style={{ display: actorA && actorB ? 'block' : 'none' }}
            />
            {/* <div style={{}}> */}
            {/* <h1>This Degrees</h1> */}
            {/* </div> */}
            {gameStarted && (
                <>
                    <ActorHeader />
                    <TreeBuildContainer />
                    <div className="sample-scoreboard">
                        <div>
                        <div><h1>Game Started</h1></div>
                            <FormContainer />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Launcher;