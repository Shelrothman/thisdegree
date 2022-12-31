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
// import uuid from 'react-uuid';
import MovieBtn from '../buttons/MovieBtn';
import End from './End';
import CardContainer from './CardContainer';
import MovieInput from './form/MovieInput';
import SelectActor from './form/SelectActor';
import ActorHeader from './ActorHeader';
import { handleInvalidMovieInput } from '../../helpers/handlers';
// import { useApolloGetCast, useApolloValidateMovie } from '../../hooks/useApolloServer';
// import { useApolloValidate } from '../../hooks/useApolloServer';
const VALIDATE_MOVIE_QUERY = gql`
query validateMovieInput($movieInput: String!, $actorInput: String!) 
{
    validateMovieInput(title: $movieInput, actor: $actorInput) {
        id
        isInMovie
        character
        cast {
            character
            id
            name
        }
    }
}`;
// TODO: put this query in its own file

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
        handleNewActorGuess,
    } = useGameContext();
    const inputRef = useRef(null);
    const submitRef = useRef(null);

    const [formState, setFormState] = useState({
        movieInput: '',
        actorInput: '',
    });

    const [movieData, setMovieData] = useState({});


    const { loading, data, error, refetch } = useQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput: formState.movieInput,
            actorInput: formState.actorInput
        },
        onCompleted: (data) => {
            console.log('data onCompleted: ', data);
            setMovieData(data.validateMovieInput);
            // return;
            // setCurrentActorOptions(data.validateMovieInput.cast);
        },
        onError: (error) => {
            console.log('error: ', error);
        }
    });


    useEffect(() => {
        console.table(movieList);
        console.log('currentMovie', currentMovie);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovie, currentActorBridge]);

    useEffect(() => {
        // TODO: move this whole effect into the GameContext, then just bring in this file to conditionally render
        if (!gameStarted) {
            setReadyToInputFirst(false);
            setCurrentMovie('');
            setCurrentActorBridge(actorA);
        }
    }, [gameStarted]);

    // TODO this function could also be moved into the GameContext
    function handleOnClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
        return;
    }

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

                console.log('movieEvaluation: ', movieEvaluationObject);
                let evaluationResult = movieEvaluationObject?.data?.validateMovieInput?.isInMovie;
                //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
                if (evaluationResult === false) {
                    handleInvalidMovieGuess();
                    // TODO may need more constraints here
                } else if (evaluationResult === true) {
                    // add it to the global list
                    await handleNewMovieGuess(userMovieGuess);
                    handleValidMovieGuess(userMovieGuess, movieEvaluationObject);
                } else {
                    throw new Error('something went wrong in the handleSubmit() function');
                }
            } else {
                throw new Error('yo! pick somthing, you smarty pants!');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleValidMovieGuess(userMovieGuess, movieEvaluationObject) {

        try {
            submitRef.current.style.display = 'none';
            // console.log('submitRef.current: ', submitRef.current)
            inputRef.current.disabled = true;
            setCurrentMovie(userMovieGuess);
            let actorList = movieEvaluationObject.data.validateMovieInput?.cast || [];


            console.log('actorList: ', actorList);
            setCurrentActorOptions(actorList);
            return;
        } catch (error) {
            console.error(error);
        }

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

    async function handleActorSelection(userSelection) {
        try {
            setCurrentActorBridge(userSelection);
            await handleNewActorGuess(userSelection, currentMovie);
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <CardContainer movieTitle={movie.movieTitle} />
                <SelectActor id={`select-actor-${i}`} handleChange={handleActorSelection} disableState={movie.actorGuessed} options={actorOptions} movieTitle={movie.movieTitle} />
                <br />
                {movie.actorGuessed && (
                    <CardContainer movieTitle={movie.movieTitle} movieType={false} actorName={currentActorBridge}/>
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
                    {loading && <Spinner />}
                    <End actor={actorB} disabled={!readyToBridge} />
                </>
            )}
        </>
    );
}

export default PlayBoard;
