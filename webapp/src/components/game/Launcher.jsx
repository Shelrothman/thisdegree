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
import Spinner from '../../utils/Spinner';
import ChallengeBtn from '../buttons/ChallengeBtn';

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
        handleCancelClick,
        confirmModal,
        setConfirmModal,
        dataLoading,
        showChallenge,
        setShowChallenge,
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

    function handleConfirmClick() {
        // setShowConfirm(false);
        // setConfirmText('default');
        setConfirmModal({
            show: false,
            text: 'default',
        })
        handleGameStateChange();
        handleActorSelection(null, null);
        setShow(true);
        return;
    }

    // we also want handleShow to clear out the selected actors
    const handleChangeClick = (internalText) => {
       console.log('are we here');
        if (internalText === 'Change Actors') {
            // setShowConfirm(true);
            setConfirmModal({
                show: true,
                text: 'startOver',
                callback: () => {
                    handleConfirmClick();
                }
            })
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



    // function handleCancelClick() {
    //     setShowConfirm(false);
    //     setConfirmText('default');
    //     return;
    // }
    //"" == false
    // true


    // ! this could be refactored witht the conditionakls better    

    // TODO come back and figure out bett erlogic with confirm 'when change actors is clicke Before playbuittpn
    // * for now just going to hide it until play... aka: keep it as 'select actors' callback until play.. aka Hack.

    return (
        <>
            <div className='float-end'>
                Rounds: add round stuff
                <br />
                <div className='float-end'>
                    {/* <ChallengeBtn
                        showChallenge={showChallenge}
                        setShowChallenge={setShowChallenge}
                    /> */}
                </div>
            </div>
            <MovieBtn
                text={actorA && actorB && gameStarted ? 'Change Actors' : 'Select Actors'}
                handler={handleChangeClick}
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
                text='Play!'
                handler={handlePlayClick}
                style={{ display: (actorA && actorB) && !gameStarted ? 'block' : 'none' }}
            />
            {dataLoading && <Spinner />}
            {actorA || actorB ? <ActorHeader /> : null}
            {gameStarted && (
                <>
                    <TreeBuildContainer />
                    <div className="sample-scoreboard">
                        <div>
                            <div>
                                <h2 className="blink">Game In Process</h2>
                                {formTypeMovie ? <h3>Movie Mode</h3> : decideMode ? <h3>Decide Mode</h3> : <h3>Actor Mode</h3>}
                            </div>
                            {confirmModal.show ? (
                                <div className='mx-5'>
                                    <GameConfirm
                                        text={confirmModal.text}
                                        actorB={actorB}
                                        handleCancelClick={handleCancelClick}
                                        handleConfirmClick={confirmModal.callback}
                                    />
                                </div>
                            ) : (
                                <FormContainer />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Launcher;