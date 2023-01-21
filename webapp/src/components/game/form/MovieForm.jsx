import { useState, useEffect, useRef } from 'react';
// import { useLazyQuery } from '@apollo/client';

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../../contexts';

import Spinner from '../../../utils/Spinner';

// import VALIDATE_MOVIE_QUERY from '../../../queries/validateMovieInput';
import { useValidateMovieInput } from '../../../hooks/useGQLclient';


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
    const [loading, setLoading] = useState(false);
    // const [gueryParams, setQueryParams] = useState({
    //     movieInput: '',
    //     actorInput: '',
    // });

    // const { inputRef } = useRef(null);

    // const [testMovie, setTestMovie] = useState('Forrest Gump');
    const [filter, setFilter] = useState('');

    const [fetchMovieData, setFetchMovieData] = useState({});

    useEffect(() => {
        // if (readyToBuild) setActorName(currentActorBridge);
        // else setActorName(actorA);
        setActorName(currentActorBridge);
        // currentActorBridge is only set when the user selects an actor, we want it back to ActorA only when readyToBuild is false bc that means the game is like starting over
    }, [currentActorBridge]);


    // !! DURING DEV ONLY HARD CODING THIS>> .. return to change (obviously)
    const [formState, setFormState] = useState({
        movieInput: '',
        // movieInput: 'Forrest Gump',
    });

    // const { data, isInitialLoading } = useValidateMovieInput(formState.movieInput, actorName);


    const { data, isInitialLoading, refetch } = useValidateMovieInput(filter, actorName);

    useEffect(() => {
        if (isInitialLoading) setLoading(true);
        else setLoading(false);
        if (data) {
            console.log('data: ', data);
            setFetchMovieData(data);
        }
    }, [isInitialLoading, data]);

    useEffect(() => {
        setFetchMovieData(data);
    }, [filter]);

    // trigger reload of the data when the filter changes
    useEffect(() => {
        if (data) {
            console.log('data: ', data);
            setFetchMovieData(data);
        }
    }, [filter]);


    //TODO purify this function, it is a mess...
    async function handleSubmit() {
        try {
            // mutate();
            const userMovieGuess = formState.movieInput;
            // const userMovieGuess = inputRef.current.value;
            if (userMovieGuess) {
                // setFormState({ movieInput: '' }); // so we can re disable the fetch
                let evaluationResult;
                // check for repeat
                const uniqueMovie = handleUniqueCheck(userMovieGuess);
                if (uniqueMovie === false) {
                    handleWrongMovie('notUnique');
                } else {
                    setFilter(userMovieGuess);

                    // wait for the data to come back first:
                    // await new Promise((resolve) => setTimeout(resolve, 1000)); this not workdjfjksdfhjsdhjfhsds

                    // okay 
                    // it is now like the data is coming back and not until we click.. 
                    // just need to see its only capturing the data after running the setFilter so we need to useEffect >> to set the data to the state
                    //!!! very close!!! just i am missing a return or something like that like reacty

                    //... feels like ive been here before tho.. do i even know anything about React or am i an idiot
                    // there is a big overarching concept... i think i am missing it.
                    // a();
                    // let result = await refetch();
                    // if (result) {
                    // console.log('result: ', result); // debyg
                    // let movieEvaluationObject = fetchMovieData;
                    // } else return; if its this hard core maybe its somethuing sup-ers imler

                    // const refetchResult = await refetch();

                    // yea u cant like mid function, just wait for a useEffect to happen and contuinue without ya know being explecitk

                    ///// omg WHATTTTTT%
                    // const refetchResult = new Promise((resolve) => refetch().then((result) => resolve(result.status === 'success' ? result : null)));
                    let refetchResult;
                    refetch().then(async (result) => {
                        refetchResult = result;
                        // return refetchResult;

                        console.log('refetchResult: ', refetchResult);

                        // if (refetchResult.status === 'success') {

                        let movieEvaluationObject = refetchResult?.data?.validateMovieInput;

                        console.log('movieEvaluationObject: ', movieEvaluationObject); // debyg
                        evaluationResult = movieEvaluationObject?.isInMovie;
                        let previousActorCharacterName = movieEvaluationObject?.character || 'unknown';


                        if (evaluationResult === false) {
                            handleWrongMovie('notFound');
                            setFilter('');
                        } else if (evaluationResult === true) {
                            setFilter('');
                            // add the movie to the global list
                            const addResponse = await addMovieToGlobal(userMovieGuess, previousActorCharacterName);
                            console.log('!!!', addResponse); // debyg
                            
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
                        // } else {
                        //     console.error('unsuccesful refetch');
                        // }
                    })
                }
            } else {
                setFilter('');
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
                                    })
                                    // console.log('change')
                                }
                            // what is my alternative to this?
                            // i want to be able to have the user type in the input
                            // and then when they are done, they click the button
                            // and then the query is sent
                            // but the query is sent as soon as the user types

                            // onChange={() => console.log('change')}
                            // problem here is that it sends the request before the user is done typing
                            // but if i remove it... it wont be mutable
                            // tried usings its own state... nah bc it like alwaays relies..
                            // safer plan.. remove this onChange.. and just have it be a button
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