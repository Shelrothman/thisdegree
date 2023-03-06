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
// import MovieForm from './MovieForm';
import uuid from 'react-uuid';
// TODO come back adn modulate this way better and not be as repetitive witht movie form copoennent?? yea just lcean everything up before add ing any new featyreas??
function ChallengeForm() {

    const [attemptMade, setAttemptMade] = useState(false);

    const {
        gamePrompt: challengePrompt,
        setGamePrompt: setChallengePrompt,
        currentActorBridge,
        setDataLoading,
        handleUniqueCheck,
        wrongMovieInput,
    } = useGameContext();

    const [formState, setFormState] = useState({
        movieInput: '',
    });

    const [challengeInput, setChallengeInput] = useState({
        id: '',
        officialTitle: '',
        originalInput: '',
        reason: '',
    });

    // const {
    //     data: responseData,
    //     isLoading,
    //     error: isQueryError,
    //     refetch,
    //     isFetching
    // } = useValidateMovieInput(formState.movieInput, currentActorBridge);

    const {
        data: responseData,
        isLoading,
        error: isQueryError,
        refetch,
        isFetching
    } = useChallengeValidation(
        uuid(),
        formState.movieInput,
        'it shouldnt matter what this says',
        'notfound',
        currentActorBridge
    );

    // const {
    //     data: challengeResponseData,
    //     isLoading: challengeIsLoading,
    //     error: challengeQueryError,
    //     refetch: challengeRefetch,
    //     isFetching: challengeIsFetching
    // } = useChallengeValidation(challengeInput.id, challengeInput.officialTitle, challengeInput.originalInput, challengeInput.reason, currentActorBridge);

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

    // !!! changing to just send thte challenge from the beginnign.. you overdid this/ overcomplicated it
    // PU Here.. hoping u can figure out where i left off.. just switch this to use the challenge thing starting at the top future shelby love u
    async function handleSubmissionResult(responseData) {
        try {
            let isInMovie;
            let movieEvaluationObject = responseData;
            // console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
            isInMovie = movieEvaluationObject?.challengeMovieValidation?.isInMovie;

            // alert(`handleSubmissionResult ${JSON.stringify(movieEvaluationObject)}`);
            // *** Start here if fromm API-changes ***
            let previousActorCharacterName = movieEvaluationObject?.validateMovieInput?.character || 'unknown';
            let officialMovieTitle = movieEvaluationObject?.validateMovieInput?.officialTitle || 'unknown';

            // continue on... SOooooooo close
            if (isInMovie === false) {
                if (movieEvaluationObject.validateMovieInput.officialTitle === 'MOVIE_DOES_NOT_EXIST') {
                    // set prompt to no movies found in Global Movie DB that match `${formInput.movieInput}`
                    setChallengePrompt({
                        ...challengePrompt,
                        text: `No movies found in Global Movie DB that match ${formState.movieInput}`,
                    });
                    // then just exit bc they only get one shot in challenge.. 
                    // but they could always go back again lol
                    // give them time to read the shiz
                    setTimeout(() => {
                        setChallengePrompt({
                            ...challengePrompt,
                            show: false,
                        });
                    }, 3000);
                } else { // else then it is a Real movie but not with the actor in it... so send the challengeValidation query so that we can get the alternative lists
                    setChallengePrompt({
                        ...challengePrompt,
                        text: `The movie ${formState.movieInput} is valid, but it does not have ${currentActorBridge} in it`,
                    });
                    // trigger the challenge validation query:
                    setChallengeInput({
                        id: movieEvaluationObject.validateMovieInput.id,
                        officialTitle: movieEvaluationObject.validateMovieInput.officialTitle,
                        originalInput: JSON.stringify({
                            title: formState.movieInput,
                            actor: currentActorBridge,
                        }),
                        reason: 'actorUnfound',
                    });
                    // challengeRefetch();
                    // display the 'sending challenge'
                    // const challengeInput = {
                    // send the challenge query
                    // display the 'sending challenge'
                    // depending on the response: either: invlaid movie or not in movie...
                    // if invalid: display the otpions for that
                    // else, display the list of other movies they cud have chosen
                }


            } else if (isInMovie === true) {

                // if reason is 



            }
        } catch (error) {
            throw new Error(error);
        }
    };


    return (
        <>
            {isQueryError && <p>error fetching validation query</p>}
            <>
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
                        {/* todo: bacl to game button */}
                    </Form.Group>
                </Form>
            </>
        </>
    );
}

export default ChallengeForm;