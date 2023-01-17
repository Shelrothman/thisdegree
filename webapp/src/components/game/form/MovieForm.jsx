import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../../contexts';

import Spinner from '../../../utils/Spinner';

import VALIDATE_MOVIE_QUERY from '../../../queries/validateMovieInput';


// TODO: launcher needs to only be allowed to exit once the BOTH are selected, if only one is- dont not let user closer it.. just can for now for ease of development

function MovieForm() {
    const {
        currentActorBridge,
        actorA,
        readyToBuild,
        addMovieToGlobal,
        buildCastOptions,
        formTypeMovie,
        handleUniqueCheck,
        // showAlert,
        setShowAlert,
    } = useGameContext();
    const [actorName, setActorName] = useState(currentActorBridge);

    useEffect(() => {
        // if (readyToBuild) setActorName(currentActorBridge);
        // else setActorName(actorA);
        setActorName(currentActorBridge);
        // currentActorBridge is only set when the user selects an actor, we want it back to ActorA only when readyToBuild is false bc that means the game is like starting over
    }, [currentActorBridge]);


    // !! DURING DEV ONLY HARD CODING THIS>> .. return to change (obviously)
    const [formState, setFormState] = useState({
        // movieInput: '',
        movieInput: 'Forrest Gump',
    });

    const [fetchData, { loading, data, error }] = useLazyQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput: '',
            actorInput: '',
        },
        onCompleted: (data) => console.log('data onCompleted: ', data),
        onError: (error) => console.error(error),
    });

    //TODO purify this function, it is a mess...
    async function handleSubmit() {
        try {
            const userMovieGuess = formState.movieInput;
            if (userMovieGuess) {
                let evaluationResult;
                // check for repeat
                const uniqueMovie = handleUniqueCheck(userMovieGuess);
                if (uniqueMovie === false) {
                    handleWrongMovie('notUnique');
                } else {
                    let movieEvaluationObject = await fetchData({
                        variables: {
                            movieInput: userMovieGuess,
                            actorInput: actorName,
                        },
                    });
                    // console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
                    evaluationResult = movieEvaluationObject?.data?.validateMovieInput?.isInMovie;
                    let previousActorCharacterName = movieEvaluationObject?.data?.validateMovieInput?.character || 'unknown';
                    
                    
                    if (evaluationResult === false) {
                        handleWrongMovie('notFound');
                    } else if (evaluationResult === true) {
                        // add the movie to the global list
                        const addResponse = await addMovieToGlobal(userMovieGuess, previousActorCharacterName);
                        // TODO: MODULATE THis function better
                        if (addResponse === true) {
                            // add the cast of the movie to the actorOptions of the currentMovie(in the global list):
                            const buildResponse = await buildCastOptions(movieEvaluationObject);
                            if (buildResponse === true) handleRefs();
                        } else {
                            throw new Error('something went wrong in the addMovieToGlobal()');
                        }
                    } else {
                        throw new Error(`something went wrong in handleSubmit(), evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
                    }


                }
            } else {
                handleWrongMovie('empty');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    function handleRefs() {
        setFormState({ movieInput: '' });
        return;
    }

    function handleWrongMovie(errorMessage) {
        console.log('not valid bc: \n', errorMessage);
        setFormState({ movieInput: 'INVALID INPUT' });
        setShowAlert({
            show: true,
            text: 'Invalid Input',
            subtext: errorMessage,
            // variant: 'danger',
        });
        handleRefs();
    }

    return (
        <>
            {formTypeMovie === true && (
                <>
                    <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label={`Movie with ${actorName} in it`}>
                            <Form.Control
                                placeholder="enter movie name"
                                type="text"
                                className="form-controls"
                                value={formState.movieInput}
                                autoComplete="off"
                                // ! comment above 4 testing
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        movieInput: e.target.value
                                    })}
                            />
                        </FloatingLabel>
                        <Button
                            variant="outline-secondary"
                            className="form-controls submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </InputGroup>
                    {loading && <Spinner />}
                </>
            )}
        </>
    );
}

export default MovieForm;