import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../../contexts';

import { useValidateMovieInput } from '../../../hooks/useGQLclient';
// import Spinner from '../../../utils/Spinner';



// TODO: launcher needs to only be allowed to exit once the BOTH are selected, if only one is- dont not let user closer it.. just can for now for ease of development

function MovieForm() {
    const {
        currentActorBridge,
        addMovieToGlobal,
        buildCastOptions,
        formTypeMovie,
        handleUniqueCheck,
        setShowAlert,
        setDataLoading,
        setShowChallenge
    } = useGameContext();
    const [actorName, setActorName] = useState(currentActorBridge);

    useEffect(() => {
        setActorName(currentActorBridge);
        // currentActorBridge is only set when the user selects an actor, we want it back to ActorA only when readyToBuild is false bc that means the game is starting over
    }, [currentActorBridge]);

    // !! DURING DEV ONLY HARD CODING THIS>> .. return to change (obviously)
    const [formState, setFormState] = useState({
        movieInput: '',
        // movieInput: 'Forrest Gump',
    });

    const { 
        data,
        isLoading,
        error: isQueryError,
        refetch,
        isFetching
    } = useValidateMovieInput(formState.movieInput, actorName);
    // i dont like that it depends on my formState.. but the queue clears so it really doesnt matter and that is best practices i think
    // * confirm this with Chris when you get a chance


    useEffect(() => {
        const userMovieGuess = formState.movieInput;
        if (userMovieGuess !== '') {
            const uniqueMovie = handleUniqueCheck(userMovieGuess);
            if (uniqueMovie === false) {
                handleWrongMovie('notUnique');
                // kind of cool this will alert the user if they type in the same name, even before submitting
                // also cool bc if a movie is in the cache already, it will update with response immediatly without clickign
                return;
            } else {
                handleSubmit(data).catch((error) => {
                    console.error(error);
                    handleWrongMovie('error');
                });
            }
        }
    }, [data]);
    // data in this case is the result of the query that is triggered by the form submission, therefore this effect will only run when the query triggers


    useEffect(() => {
        if (isFetching) {
            setDataLoading(true);
        }
        if (!isFetching) {
            setDataLoading(false);
        }
    }, [isFetching]);

    //TODO purify this function, it is a mess...
    async function handleSubmit(data) {
        try {
            let evaluationResult;
            let movieEvaluationObject = data;
            // console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
            evaluationResult = movieEvaluationObject?.validateMovieInput?.isInMovie;
            let previousActorCharacterName = movieEvaluationObject?.validateMovieInput?.character || 'unknown';

            if (evaluationResult === false) {
                handleWrongMovie('notFound');
            } else if (evaluationResult === true) {
                // add the movie to the global list
                const addResponse = await addMovieToGlobal(formState.movieInput, previousActorCharacterName);
                // TODO: MODULATE THis function better
                if (addResponse === true) {
                    // add the cast of the movie to the actorOptions of the currentMovie(in the global list):
                    // TODO: ** CHANGE THIS TO USE THE getCastList QUERY
                    const buildResponse = await buildCastOptions(movieEvaluationObject.validateMovieInput.cast);
                    if (buildResponse === true) handleRefs();
                } else {
                    throw new Error('something went wrong attempting to add the movie to the global list');
                }
            } else {
                throw new Error(`something went wrong; evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
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
        setShowChallenge(true);
        // setFormState({ movieInput: 'INVALID INPUT' });
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
            {/* {isFetching ? <Spinner /> : <></>} */}
            {isQueryError && <p>error fetching validation query</p>}
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
                                        // ...formState,
                                        movieInput: e.target.value
                                    })}
                            />
                        </FloatingLabel>
                        <Button
                            variant="outline-secondary"
                            className="form-controls submit-btn"
                            onClick={refetch}
                            disabled={formState.movieInput === ''}
                        >
                            Submit
                        </Button>
                    </InputGroup>
                </>
            )}
        </>
    );
}

export default MovieForm;