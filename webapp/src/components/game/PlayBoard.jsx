/**
 * sample version of a running scoreboard that will be present on the screen through.. one page app.. 
 * so it will dynamically change based on the user's selections
 * and based on what they do in the game
 * GREAT time to practice context API
 * 
 * ! once game is started.. turn the actorS into btns..
 * ActorB is readOnly. (it turns to mutable once user selects they are ready to connect the bridge)
 * actorA is clickable => prompt user to enter a movie title
 * then prompt user to enter an actor name (that must be in the movie)
 * !  NO DISPLAY just logic!!!
 * check if correct :: if not.. then start over
 * if correct.. then insert a bridge and then another card below with that new actors name
 * repeat until they get to the end
 */
import { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useActorContext, useGameContext } from '../../contexts';
import MovieBtn from '../buttons/MovieBtn';
// import uuid from 'react-uuid';
import End from './End';

import CardContainer from './CardContainer';
import MovieInput from './form/MovieInput';

// TODO:  maybe we just need to modularize more and then return certain components

// TODO[future]: add a button for the user to "edit" and able to go back and pick a different new movie
// only want the input ref to be refed when it is in the current round.. once its above where we are we dont care about it anymore.. so therefore the LAST input should always be the inputRef.
// TODO add better error handling in the class and elsewheere so int wont take so much ime to track down next time
//************************************************************************************
//! need to stop user from BEing able to enter the same movie twice (bc it first of all is stupid for the game and also would mess up our logic)
//? if there are problems with the refs.. go back to beta docs and implement the Map() method

function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
    // this state for the actor that is currently being used as bridge, aka the one that is selected from currentMovies list.
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    const [readyToInputFirst, setReadyToInputFirst] = useState(false);
    const [currentActorOptions, setCurrentActorOptions] = useState([]);
    const {
        gameStarted,
        movieList,
        readyToBridge,
        handleNewMovieGuess,
        handleNewActorGuess
    } = useGameContext();
    const inputRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(() => {
        console.table(movieList);
        console.log('currentMovie', currentMovie);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovie, currentActorBridge]);

    useEffect(() => {
        if (!gameStarted) {
            setReadyToInputFirst(false);
            setCurrentMovie('');
            setCurrentActorBridge(actorA);
        }
    }, [gameStarted]);


    function handleOnClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
        return;
    }

    async function handleSubmit() {
        const userMovieGuess = inputRef.current.value;
        if (userMovieGuess) {
            const movieEvaluation = await handleNewMovieGuess(currentActorBridge, userMovieGuess);
            console.log('movieEvaluation', movieEvaluation)
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
            if (!movieEvaluation.verified) {
                handleInvalidMovieGuess();
                return;
            }
            submitRef.current.style.display = 'none';
            inputRef.current.disabled = true;
            setCurrentMovie(userMovieGuess);
            setCurrentActorOptions(movieEvaluation.actorList);
            return;
        } else {
            throw new Error('yo! pick somthing, you smarty pants!');
        }
    }

    function handleInvalidMovieGuess() {
        console.log('invalid movie selection');
        inputRef.current.value = `INVALID MOVIE`;
        // TODO: tell the user its wrong in a different way then above.. this is just a hack for now
        setTimeout(() => {
            inputRef.current.value = '';
        }, 1000);
        return;
    }

    const actorOptions = currentActorOptions?.map((actor, i) => {
        return (
            <option key={i} value={actor.name}>{actor.name}</option>
        )
    });

    //TODO modulate and make more dynamic
    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <CardContainer movie={movie} />
                <select
                    aria-label="actor selection"
                    id={`select-actor-${i}`}
                    onChange={(e) => handleActorSelection(e.target.value)}
                    disabled={movie.actorGuessed}
                >
                    <option value='select'>Select an actor from {movie.movieTitle}</option>
                    {actorOptions}
                </select>
                <br />
                {movie.actorGuessed && (
                    <CardContainer movie={movie} movieType={false} />
                )}
                {(movie.actorSelection !== '') && (
                    <div ref={submitRef}>
                        <MovieInput
                            actor={movie.actorSelection}
                            id={`movie-input-${i}`}
                            ref={inputRef}
                        />
                        {/* the input ref should always be the last one rendered? */}
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )}
            </div>
        )
    })


    async function handleActorSelection(userSelection) {
        try {
            // const map = getMap();
            console.log('userSelection onChange: ', userSelection);
            setCurrentActorBridge(userSelection);
            let res = await handleNewActorGuess(userSelection, currentMovie);
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    //TODO modulate and make more dynamic
    return (
        <>
            <div>
                Actor A: {actorA}<br />Actor B: {actorB}
            </div>
            {gameStarted && (
                <>
                    <div><h1>Game Started</h1></div>
                    <div>
                        <MovieBtn text={actorA} handler={handleOnClick} />
                        <br />
                        {readyToInputFirst && (
                            <div ref={submitRef}>
                                <MovieInput actor={actorA} ref={inputRef} id='movie-input-first' />
                                <button onClick={handleSubmit} disabled={currentMovie !== ''}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                    {buildBridgeNodes}
                    <End actor={actorB} disabled={!readyToBridge} />
                </>
            )}
        </>
    );
}

export default PlayBoard;
