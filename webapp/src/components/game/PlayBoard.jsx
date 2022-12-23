/**
 * running scoreboard that will be present on the screen throughout "/" route
 * so it will dynamically change based on the user's selections
 */
// TODO:  maybe we just need to modularize more and then return certain components
// TODO[future]: add a button for the user to "edit" and able to go back and pick a different new movie
// TODO add better error handling in the class and elsewheere so int wont take so much ime to track down next time
//! need to stop user from BEing able to enter the same movie twice (bc it first of all is stupid for the game and also would mess up our logic)
//? if there are problems with the refs.. go back to beta docs and implement the Map() method
import { useEffect, useState, useRef } from 'react';

import { useActorContext, useGameContext } from '../../contexts';
// import uuid from 'react-uuid';
import MovieBtn from '../buttons/MovieBtn';
import End from './End';
import CardContainer from './CardContainer';
import MovieInput from './form/MovieInput';
import SelectActor from './form/SelectActor';


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
                <SelectActor
                    id={`select-actor-${i}`}
                    handleChange={handleActorSelection}
                    disableState={movie.actorGuessed}
                    options={actorOptions}
                    movieTitle={movie.movieTitle}
                />
                <br />
                {movie.actorGuessed && (
                    <CardContainer movie={movie} movieType={false} />
                )}
                {(movie.actorSelection !== '') && (
                    <div ref={submitRef}>
                        <MovieInput actor={movie.actorSelection} id={`movie-input-${i}`} ref={inputRef} btnHandler={handleSubmit} />
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
                                <MovieInput actor={actorA} ref={inputRef} id='movie-input-first' btnHandler={handleSubmit} />
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
