import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useActorContext, useGameContext } from '../../contexts';
import ActorListContainer from './ActorListContainer.jsx';
import MovieBtn from '../buttons/MovieBtn.jsx';
import PlayBtn from '../buttons/PlayBtn.jsx';
import ActorHeader from './ActorHeader.jsx';
import FormContainer from './form/FormContainer.jsx';
import TreeBuildContainer from './display/TreeBuildContainer.jsx';
import GameConfirm from '../modals/GameConfirm';


function Launcher() {
    const [show, setShow] = useState(false);
    const {
        actorA,
        actorB,
        handleActorSelection,

    } = useActorContext();
    const {
        gameStarted,
        handleGameStateChange,
        setGameStarted,
        formTypeMovie,
        decideMode,
        // confirmMode,
        // setConfirmMode,
    } = useGameContext();

    // TODO: move this one and the actorForm one into context
    const [showConfirm, setShowConfirm] = useState(false); // for the visual 


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
            setShowConfirm(true);
        } else {
            // just open the offcanvas, no need to change the game state bc its hasnt started yet
            setShow(true);
        }
        return;
    }

    function handlePlayClick() {
        if (actorA && actorB) {
            setGameStarted(true);
        }
        return setShow(false);
    }

    function handleConfirmClick() {
        setShowConfirm(false);
        handleGameStateChange();
        handleActorSelection(null, null);
        setShow(true);
        return;
    }

    function handleCancelClick() {
        setShowConfirm(false);
        return;
    }

    return (
        <>
            <div className='float-end'>
                Rounds: add round stuff
            </div>
            <MovieBtn
                text={actorA && actorB ? 'Change Actors' : 'Select Actors'}
                handler={handleClick}
            /> <br />
            {showConfirm && (
                <GameConfirm
                    text='startOver'
                    actorB={actorB}
                    handleCancelClick={handleCancelClick}
                    handleConfirmClick={handleConfirmClick}
                />
            )}
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
                text='Play!'
                handler={handlePlayClick}
                style={{ display: (actorA && actorB) && !gameStarted ? 'block' : 'none' }}
            />
            {actorA || actorB ? <ActorHeader /> : null}
            {/* <ActorHeader /> */}
            {gameStarted && (
                <>
                    <TreeBuildContainer />
                    <div className="sample-scoreboard">
                        <div>
                            <div>
                                <h2 className="blink">Game In Process</h2>
                                {formTypeMovie ? <h3>Movie Mode</h3> : decideMode ? <h3>Decide Mode</h3> : <h3>Actor Mode</h3>}
                            </div>
                            <FormContainer />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Launcher;