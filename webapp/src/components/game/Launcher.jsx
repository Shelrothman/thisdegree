import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Offcanvas from 'react-bootstrap/Offcanvas';


import VALIDATE_MOVIE_QUERY from '../../queries/validateMovieInput';
import ActorListContainer from '../ActorListContainer.jsx';
import { useActorContext, useGameContext } from '../../contexts';

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
        formTypeMovie
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

    // const [fetchData, { loading, data, error }] = useLazyQuery(VALIDATE_MOVIE_QUERY, {
    //     variables: {
    //         movieInput: '',
    //         actorInput: '',
    //     },
    //     onCompleted: (data) => console.log('data onCompleted: ', data),
    //     onError: (error) => console.log('error: ', error),
    // });

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
                text='Play!'
                handler={handleGameStateChange}
                style={{ display: (actorA && actorB) && !gameStarted ? 'block' : 'none' }}
            />
            {gameStarted && (
                <>
                    <ActorHeader />
                    <TreeBuildContainer />
                    <div className="sample-scoreboard">
                        <div>
                            <div>
                                <h2>Game In Process</h2>
                                {formTypeMovie ? <h3>Movie Mode</h3> : <h3>Actor Mode</h3>}
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