import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../../contexts';

import Spinner from '../../../utils/Spinner';

import { useValidateMovieInput } from '../../../hooks/useGQLclient';



// TODO: launcher needs to only be allowed to exit once the BOTH are selected, if only one is- dont not let user closer it.. just can for now for ease of development

function MovieForm() {
    const {
        currentActorBridge,
        addMovieToGlobal,
        buildCastOptions,
        formTypeMovie,
        handleUniqueCheck,
        setShowAlert,
    } = useGameContext();
    const [actorName, setActorName] = useState(currentActorBridge);

    useEffect(() => {
        setActorName(currentActorBridge);
        // currentActorBridge is only set when the user selects an actor, we want it back to ActorA only when readyToBuild is false bc that means the game is starting over
    }, [currentActorBridge]);

    const [showSpinner, setShowSpinner] = useState(false);


    // !! DURING DEV ONLY HARD CODING THIS>> .. return to change (obviously)
    const [formState, setFormState] = useState({
        movieInput: '',
        // movieInput: 'Forrest Gump',
    });

    const { data, isLoading, error, refetch, isFetching } = useValidateMovieInput(formState.movieInput, actorName);

    useEffect(() => {
        if (isFetching === true) setShowSpinner(true);
        else setShowSpinner(false);
    }, [isLoading]);

    useEffect(() => {
        const userMovieGuess = formState.movieInput;
        if (userMovieGuess) {
            const uniqueMovie = handleUniqueCheck(userMovieGuess);
            if (uniqueMovie === false) {
                handleWrongMovie('notUnique');
            } else {
                handleSubmit(data).catch((error) => console.error(error));
            }
            // if (data) {
            //     setResponseData(data);
            //     // handleSubmit();
            // !!! YEA PU HEREER ur getting closer...
        }
    }, [data]);


    //TODO purify this function, it is a mess...
    async function handleSubmit(data) {
        try {
            // const userMovieGuess = formState.movieInput;
            // if (userMovieGuess) {
            let evaluationResult;
            let movieEvaluationObject = data;
            console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
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
                    const buildResponse = await buildCastOptions(movieEvaluationObject.validateMovieInput.cast);
                    if (buildResponse === true) handleRefs();
                } else {
                    throw new Error('something went wrong in the addMovieToGlobal()');
                }
            } else {
                throw new Error(`something went wrong in handleSubmit(), evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
            }
            // }
            // } else {
            //     handleWrongMovie('empty');
            // }
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
                                        // ...formState,
                                        movieInput: e.target.value
                                    })}
                            />
                        </FloatingLabel>
                        <Button
                            variant="outline-secondary"
                            className="form-controls submit-btn"
                            onClick={refetch}
                        >
                            Submit
                        </Button>
                    </InputGroup>
                    {showSpinner ? <Spinner /> : <></>}
                </>
            )}
        </>
    );
}

export default MovieForm;