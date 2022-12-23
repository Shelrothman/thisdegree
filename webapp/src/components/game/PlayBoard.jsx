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
import { useActorContext, useGameContext } from '../../contexts';
import MovieBtn from '../buttons/MovieBtn';
// import uuid from 'react-uuid';
import ActorCard from './ActorCard';
import End from './End';

// TODO: disable the movieInput after selected an actor for it
// only want the input ref to be refed when it is in the current round.. once its above where we are we dont care about it anymore.. so therefore the LAST input should always be the inputRef.
// TODO add better error handling in the class and elsewheere so int wont take so much ime to track down next time
//************************************************************************************
//! need to stop user from BEing able to enter the same movie twice (bc it first of all is stupid for the game and also would mess up our logic)


function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
    // this state for the actor that is currently being used as bridge, aka the one that is selected from currentMovies list.
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    const [readyToInputFirst, setReadyToInputFirst] = useState(false);
    const [currentActorOptions, setCurrentActorOptions] = useState([]);

    // maybe we just need to modularize more and then return certain components

    const {
        gameStarted,
        movieList,
        readyToBridge,
        handleNewMovieGuess,
        handleNewActorGuess
    } = useGameContext();
    const inputRef = useRef(null);


    // const selectItemsRef = useRef(null);

    // function getMap() {
    //     if (!selectItemsRef.current) {
    //         // Initialize the Map on first usage.
    //         selectItemsRef.current = new Map();
    //     }
    //     console.log('selectItemsRef.current', selectItemsRef.current)
    //     return selectItemsRef.current;
    // }

    useEffect(() => {
        console.table(movieList);
        console.log('currentMovie', currentMovie);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovie, currentActorBridge]);

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
            if (!movieEvaluation.verified) {
                handleInvalidMovieGuess();
            }
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
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
                <h4>Movie Bridge: {movie.movieTitle}</h4>
                <select
                    aria-label="actor selection"
                    id={`select-actor-${i}`}
                    onChange={(e) => handleActorSelection(e.target.value)}
                    // value={currentActorBridge}
                    disabled={movie.actorGuessed}
                >
                    <option value='select'>Select an actor from {movie.movieTitle}</option>
                    {actorOptions}
                </select>
                <br />
                {movie.actorGuessed && (
                    <ActorCard movie={movie} />
                )}
                {(movie.actorSelection !== '') && (
                    <>
                        <label htmlFor="movie-bridge">Movie with {movie.actorSelection} in it: </label>
                        <input ref={inputRef} id={`movie-input-${i}`} ></input>
                        {/* the input ref will always be the last one rendered? */}
                        <button onClick={handleSubmit}>Submit</button>
                    </>
                )}
            </div>
        )
    })


    async function handleActorSelection(userSelection) {
        inputRef.current.disabled = true;
        // const map = getMap();
        // const node = map.get(currentMovie.id); ?????
        // const node = map.get(currentMovie.id);
        // we want to get the value of the select that is in the current movie.. the last element of the movieListArray is the current movie
        // const userSelection = node.value;
        // let currentMovie = movieList[movieList.length - 1];
        // console.log('currentMovie: ', currentMovie)

        // const node = map.get(currentMovie.id);
        // console.log('node: ', node.value);
        // const userSelection = node.value;
        console.log('userSelection onChange: ', userSelection);

        // why does my actorCard not render until i change the select again??
        // because 


        setCurrentActorBridge(userSelection); // this line is not being called when the select is changed.. so the actorCard is not being rendered
        // why isnt this line being called?? bc the select is not being changed.. its just being rendered.. so the useEffect is not being called
        // to fix this i need to add the currentActorBridge to the dependency array of the useEffect

        let res = await handleNewActorGuess(userSelection, currentMovie);
        return res;
    }

    //TODO modulate and make more dynamic

    return (
        <>
            <div>
                Actor A: {actorA}<br />Actor B: {actorB}
            </div>
            {gameStarted && (
                <>
                    <div>
                        <h1>Game Started</h1>
                    </div>
                    <div>
                        <MovieBtn text={actorA} handler={handleOnClick} />
                        <br />
                        {readyToInputFirst && (
                            <>
                                <label htmlFor="movie-bridge">Movie with {actorA} in it: </label>
                                <input ref={inputRef} disabled={currentMovie !== ''} />
                                <button onClick={handleSubmit}>Submit</button>
                            </>
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
