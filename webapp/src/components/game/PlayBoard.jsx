/**
 * running scoreboard that will be present on the screen throughout "/" route
 * so it will dynamically change based on the user's selections
 */
// TODO:  maybe we just need to modularize more and then return certain components
// TODO[future]: add a button for the user to "edit" and able to go back and pick a different new movie
// TODO add better error handling in the class and elsewheere so it wont take so much ime to track down next time
//! need to stop user from BEing able to enter the same movie twice (bc it first of all is stupid for the game and also would mess up our logic)
//? if there are problems with the refs.. go back to beta docs and implement Map() 
import { useEffect, useState, useRef } from 'react';

import { useActorContext, useGameContext } from '../../contexts';
// import uuid from 'react-uuid';
import MovieBtn from '../buttons/MovieBtn';
import End from './End';
import CardContainer from './CardContainer';
import MovieInput from './form/MovieInput';
import SelectActor from './form/SelectActor';
import ActorHeader from './ActorHeader';
import { handleInvalidMovieInput } from '../../helpers/handlers';
import useApolloServer from '../../hooks/useApolloServer';


function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
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
    const { loading, data, error } = useApolloServer("The Matrix");

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

    useEffect(() => {
        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>Error :(</p>;
        // if (data) {
        //     console.log('data', data);
        // }
        console.log('data', data);
    }, []);


    function handleOnClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
        return;
    }

    async function handleSubmit() {
        const userMovieGuess = inputRef.current.value;
        if (userMovieGuess) {
            const movieEvaluation = await handleNewMovieGuess(currentActorBridge, userMovieGuess);
            console.log('movieEvaluation: ', movieEvaluation)
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
            if (!movieEvaluation.verified) handleInvalidMovieGuess();
            else handleValidMovieGuess(userMovieGuess, movieEvaluation); // TODO may need more constraints here
        } else {
            throw new Error('yo! pick somthing, you smarty pants!');
        }
    }

    function handleValidMovieGuess(userMovieGuess, movieEvaluation) {
        submitRef.current.style.display = 'none';
        inputRef.current.disabled = true;
        setCurrentMovie(userMovieGuess);
        setCurrentActorOptions(movieEvaluation.actorList);
        return;
    }

    function handleInvalidMovieGuess() {
        handleInvalidMovieInput(inputRef);
        return;
    }

    const actorOptions = currentActorOptions?.map((actor, i) => {
        return (
            <option key={i} value={actor.name}>{actor.name}</option>
        )
    });

    async function handleActorSelection(userSelection) {
        try {
            setCurrentActorBridge(userSelection);
            return await handleNewActorGuess(userSelection, currentMovie);
        } catch (error) {
            console.error(error);
        }
    }

    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <CardContainer movie={movie} />
                <SelectActor id={`select-actor-${i}`} handleChange={handleActorSelection} disableState={movie.actorGuessed} options={actorOptions} movieTitle={movie.movieTitle} />
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
    });

    return (
        <>
            <ActorHeader a={actorA} b={actorB} />
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
