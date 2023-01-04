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

    const [fetchData, { loading, data, error }] = useLazyQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput: '',
            actorInput: '',
        },
        onCompleted: (data) => console.log('data onCompleted: ', data),
        onError: (error) => console.log('error: ', error),
    });

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

    // TODO: use modules instead of alerts/confirms for display to look better
    // so just we will move this over to ActorForm
    // const handleReady = () => {
    //     //TODO PU here and handle the setReadyToBridge stuff (in context)
    //     // console.log('internalText', internalText);
    //     if (gameStarted) { // then the user is ready to bridge bc already in the game
    //         let userConfirm = confirm(`Are you ready to connect to ${actorB}?`);
    //         if (userConfirm) {
    //             if (!formTypeMovie) {
    //                 //TODO need to also account for being in formTypeMovie but with an empty value in the input
    //                 // then the user is in actor mode
    //                 alert('You must enter the final movie to bridge. You are currently in Actor Mode. Select an actor, enter a movie, then try again.');
    //                 return;
    //             } else {
    //                 // RETURN HERE... create a handleFinalThing in GameContext to be called here
    //                 //! then the user is in movieMode and we can test their final input
    //                 testFinalInput();
    //             }
    //         } else {
    //             // then the user is not ready to bridge, so return to game w/o changing state
    //             return;
    //         }
    //     } else {
    //         // then the user is ready to just start the game
    //         handleGameStateChange();
    //     }
    // }

    // const handleReady = () => {
    //     handleGameStateChange();
    // }

    async function testFinalInput() {
        try {
            const movieValue = movieList[movieList.length - 1].movieTitle;
            const actorValue = actorB;
            const { data } = await fetchData({
                variables: {
                    movieInput: movieValue,
                    actorInput: actorValue,
                },
            });
            console.log('data: ', data);
            // data is returning but we need more logic in above function to handle where in the game we are


        } catch (error) {
            console.error(error);
        }
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