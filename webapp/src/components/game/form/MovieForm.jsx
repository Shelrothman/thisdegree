import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGameContext, useActorContext } from '../../../contexts';

import Spinner from '../../../utils/Spinner';
// import Dropdown from 'react-bootstrap/Dropdown';
// import SplitButton from 'react-bootstrap/SplitButton';
// import SubmitBtn from '../../buttons/SubmitBtn';
import { handleInvalidMovieInput } from '../../../helpers/handlers';
import VALIDATE_MOVIE_QUERY from '../../../queries/validateMovieInput';


// TODO: launcher needs to only be allowed to exit once the BOTH are selected, if only one is- don not let user closer it.. just can for now for ease of development

function MovieForm(enable) {
    // const { actorA } = useActorContext();
    const {
        currentActorBridge,
        actorA,
        readyToBuild,
        addMovieToGlobal,
        buildCastOptions,
        formTypeMovie,
        // setCurrentActorBridge
    } = useGameContext();
    const [actorName, setActorName] = useState(readyToBuild ? currentActorBridge : actorA);

    useEffect(() => {
        if (readyToBuild) setActorName(currentActorBridge);
        else setActorName(actorA);
        // currentActorBridge is only set when the user selects an actor, we want it back to ActorA only when readyToBuild is false bc that means the game is like starting over
    }, [currentActorBridge, readyToBuild]);


    const [formState, setFormState] = useState({
        movieInput: '',
        // actorInput: actorName,
    });

    const [fetchData, { loading, data, error }] = useLazyQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput: '',
            actorInput: '',
        },
        onCompleted: (data) => console.log('data onCompleted: ', data),
        onError: (error) => console.log('error: ', error),
    });

    async function handleSubmit() {
        try {
            const userMovieGuess = formState.movieInput;
            if (userMovieGuess) {
                let movieEvaluationObject = await fetchData({
                    variables: {
                        movieInput: userMovieGuess,
                        actorInput: actorName,
                    },
                });
                console.log('movieEvaluationObject: ', movieEvaluationObject);

                let evaluationResult = movieEvaluationObject?.data?.validateMovieInput?.isInMovie;
                if (evaluationResult === false) {
                    handleInvalidMovieGuess();
                } else if (evaluationResult === true) {
                    // add the movie to the global list
                    const addResponse = await addMovieToGlobal(userMovieGuess);
                    // TODO: combine these two functions above and below?
                    if (addResponse === true) {
                        // add the cast of the movie to the actorOptions of the currentMovie:
                        const buildResponse = await buildCastOptions(userMovieGuess, movieEvaluationObject);
                        if (buildResponse === true) handleRefs();
                    } else {
                        throw new Error('something went wrong in the addMovieToGlobal()');
                    }
                } else {
                    throw new Error(`something went wrong in handleSubmit(), evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
                }
            } else {
                handleInvalidMovieGuess();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleRefs() {
        setFormState({ movieInput: '' });
        return;
    }

    function handleInvalidMovieGuess() {
        setFormState({ movieInput: 'INVALID INPUT' })
        setTimeout(() => {
            setFormState({ movieInput: '' })
        }, 1100);
        return;
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