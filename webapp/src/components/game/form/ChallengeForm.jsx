/**
 * @summary ChallengeForm component 
*/
import { useState, useEffect, useRef } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useGameContext } from '../../../contexts';
import { useChallengeValidation, useValidateMovieInput } from '../../../hooks/useGQLclient';
import MovieForm from './MovieForm';


function ChallengeForm() {


    // const {} = useChallengeValidation({});
    // const {} = useValidateMovieInput({});
    const { divRef } = useRef(null);

    // USing a similar apporach like in MovieFOrm, call out to get the response from the api from here, .. and use CHallengeContainers notes ...
    //? so first it will call the one line in MovieForm....  .. why am i not just using the one in MovieForm?? and imporrt it here???..  nah I dont have it architexted that way sadly.. learning lesson

    const {
        gamePrompt: challengePrompt,
        setGamePrompt: setChallengePrompt,
        currentActorBridge,
        setDataLoading,
        handleUniqueCheck
    } = useGameContext();

    const [formState, setFormState] = useState({
        movieInput: '',
    });

    const {
        data: responseData,
        isLoading,
        error: isQueryError,
        refetch,
        isFetching
    } = useValidateMovieInput(formState.movieInput, currentActorBridge);

    useEffect(() => {
        if (isFetching) {
            setDataLoading(true);
        }
        if (!isFetching) {
            setDataLoading(false);
        }
    }, [isFetching]);

    useEffect(() => {
        const userMovieGuess = formState.movieInput;
        if (userMovieGuess !== '') {
            const uniqueMovie = handleUniqueCheck(userMovieGuess);
            if (uniqueMovie === false) {
                handleWrongMovie('notUnique');
                return;
            } else {
                handleSubmissionResult(responseData).catch((error) => {
                    console.error(error);
                    handleWrongMovie('error');
                });
            }
        }
    }, [responseData]);
    // data in this case is the result of the query that is triggered by the form submission, therefore this effect will only run when the query triggers


    async function handleSubmissionResult(responseData) {
        try {
            let evaluationResult;
            let movieEvaluationObject = responseData;
            // console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
            evaluationResult = movieEvaluationObject?.validateMovieInput?.isInMovie;

            // if 
            alert(`handleSubmissionResult ${JSON.stringify(movieEvaluationObject)}`);


            // *** Start here if fromm API-changes ***
            let previousActorCharacterName = movieEvaluationObject?.validateMovieInput?.character || 'unknown';
            let officialMovieTitle = movieEvaluationObject?.validateMovieInput?.officialTitle || 'unknown';

            // so gonna use below logic but jhandleled differenetly llike becasue this is a challenge

            // TODO come back adn modulate this way better and not be as repetitive witht movie form copoennent?? yea just lcean everything up before add ing any new featyreas??

            // if (evaluationResult === false) {
            //     if (challengePrompt.show === true) {
            //         setChallengePrompt({
            //             ...challengePrompt,
            //             text: 'Movie is valid but not with this actor'
            //         });
            //         // alert('you already tried this one, try again');
            //     }
            //     handleWrongMovie('notFound');
            // } else if (evaluationResult === true) {
            //     // add the movie to the global list
            //     const addResponse = await addMovieToGlobal(formState.movieInput, previousActorCharacterName, officialMovieTitle);
            //     // TODO: MODULATE THis function better
            //     if (addResponse === true) {
            //         // add the cast of the movie to the actorOptions of the currentMovie(in the global list):
            //         // TODO: ** CHANGE THIS TO USE THE getCastList QUERY
            //         const buildResponse = await buildCastOptions(movieEvaluationObject.validateMovieInput.cast);
            //         if (buildResponse === true) handleRefs();
            //     } else {
            //         // throw new Error('something went wrong attempting to add the movie to the global list');
            //         handleWrongMovie('something went wrong attempting to add the movie to the global list');
            //     }
            // } else {
            //     // throw new Error(`something went wrong; evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
            //     handleWrongMovie(`something went wrong; evaluationResult was not the expected Boolean. Instead I recieved ${evaluationResult}`);
            // }
        } catch (error) {
            throw new Error(error);
        }
    };

    // const [challengeInput, setChallengeInput] = useState({
    //     id: '',
    //     officialTitle: '',
    //     originalInput: JSON.stringify({
    //         title: wrongMovieInput,
    //         actor: '',
    //     }),
    // });

    // const [validationInput, setValidationInput] = useState({
    //     id: '',
    //     officialTitle: '',
    //     originalInput: JSON.stringify({
    //         title: wrongMovieInput,
    //         actor: '',
    //     }),
    // });


    return (
        <>
            {isQueryError && <p>error fetching validation query</p>}
            <div ref={divRef}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            <h5>{challengePrompt.text}:</h5>
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <FloatingLabel controlId="floatingInput" label={`Movie with ${currentActorBridge} in it`}>
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    refetch();
                                }}
                                disabled={formState.movieInput === ''}
                            >
                                Submit
                            </Button>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            <small>Hint: maybe adjust your spelling or punctuation.</small>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default ChallengeForm;