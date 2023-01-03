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
import { useQuery, gql } from '@apollo/client';

import Spinner from '../../utils/Spinner';
import { useActorContext, useGameContext } from '../../contexts';
import MovieBtn from '../buttons/MovieBtn';
import End from './End';
import CardContainer from './CardContainer';
import MovieInput from './form/MovieInput';
import SelectActor from './form/SelectActor';
import ActorHeader from './ActorHeader';
import { handleInvalidMovieInput } from '../../helpers/handlers';

// import AggregateBridgeNodes from './AggregateBridgeNodes';

import VALIDATE_MOVIE_QUERY from '../../queries/validateMovieInput';


function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const {
        gameStarted,
        movieList,
        readyToBridge,
        addMovieToGlobal,
        currentActorBridge,
        readyToInputFirst,
        currentActorOptions,
        handleFirstClick,
        handleActorSelection,
        buildCastOptions
    } = useGameContext();
    const inputRef = useRef(null);
    const submitRef = useRef(null);

    const [formState, setFormState] = useState({
        movieInput: '',
        actorInput: '',
    });

    const { loading, data, error, refetch } = useQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput: formState.movieInput,
            actorInput: formState.actorInput
        },
        onCompleted: (data) => {
            console.log('data onCompleted: ', data);
        },
        onError: (error) => {
            console.log('error: ', error);
        }
    });

    // TODO add message to user why its invalid.. or like if a repeat.. etc
    // TODO add in handling selecting movie for user.. etc..
    // TODO MODULARIZE this function
    async function handleSubmit() {
        try {
            const userMovieGuess = inputRef.current.value;
            if (userMovieGuess) {
                setFormState({
                    movieInput: userMovieGuess,
                    actorInput: currentActorBridge
                });
                let movieEvaluationObject = await refetch({
                    movieInput: userMovieGuess,
                    actorInput: currentActorBridge
                });
                // console.log('movieEvaluation: ', movieEvaluationObject); // debug
                let evaluationResult = movieEvaluationObject?.data?.validateMovieInput?.isInMovie;
                //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
                if (evaluationResult === false) {
                    handleInvalidMovieGuess();
                    // TODO may need more constraints here
                } else if (evaluationResult === true) {
                    // add the movie to the global list
                    const addResponse = await addMovieToGlobal(userMovieGuess);
                    // TODO: combine these two functions above and below, refactor them to return spmething.
                    // add the cast of the movie to the actorOptions:
                    if (addResponse === true) {
                        const buildResponse = await buildCastOptions(userMovieGuess, movieEvaluationObject);
                        if (buildResponse === true) handleRefs();
                    } else {
                        throw new Error('something went wrong in the handleSubmit() function');
                    }
                } else {
                    throw new Error('something went wrong in the handleSubmit() function');
                }
            } else {
                handleInvalidMovieGuess();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleRefs() {
        submitRef.current.style.display = 'none';
        inputRef.current.disabled = true;
    }


    function handleInvalidMovieGuess() {
        handleInvalidMovieInput(inputRef);
        return;
    }
    const actorOptions = currentActorOptions?.map((actor) => {
        return (
            <option key={actor.id} value={actor.name}>{actor.name}</option>
        )
    });

    // i want to change this. instead of mapping.. i want the ui nodes to build themselves based on the context with a useEffect
    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <CardContainer movieName={movie.movieTitle} />
                <SelectActor id={`select-actor-${i}`} handleChange={handleActorSelection} disableState={movie.actorGuessed} options={actorOptions} movieTitle={movie.movieTitle} />
                <br />
                {movie.actorGuessed && (
                    <CardContainer movieType={false} actorName={movie.actorSelection.name} movieName={movie.movieTitle} />
                )}
                {(movie.actorSelection.name !== '') && (
                    <div ref={submitRef}>
                        <MovieInput actor={movie.actorSelection.name} id={`movie-input-${i}`} ref={inputRef} btnHandler={handleSubmit} />
                    </div>
                )}
            </div>
        )
    });


    return (
        <>
            <ActorHeader />
            {gameStarted && (
                <>
                    <div><h1>Game Started</h1></div>
                    <div>
                        <MovieBtn text={actorA} handler={handleFirstClick} />
                        <br />
                        {readyToInputFirst && (
                            <div ref={submitRef}>
                                <MovieInput actor={actorA} ref={inputRef} id='movie-input-first' btnHandler={handleSubmit} />
                            </div>
                        )}
                    </div>
                    {buildBridgeNodes}
                    {loading && <Spinner />}
                    <End actor={actorB} disabled={!readyToBridge} />
                </>
            )}
        </>
    );
}

export default PlayBoard;
