import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Spinner from '../../../utils/Spinner';
import VALIDATE_MOVIE_QUERY from '../../../queries/validateMovieInput';
import ActorModeDecide from './ActorModeDecide';
import { useGameContext } from '../../../contexts';
// TODO change to display the character Name somewhere in the tree or soemthign cool

function ActorForm() {
    const {
        formTypeMovie,
        currentMovieTitle,
        currentActorOptions,
        handleActorSelection,
        setReadyToBridge,
        movieList,
        actorB,
        handleGameStateChange,
        handleFinalBridge,
    } = useGameContext();

    const [formState, setFormState] = useState({
        actorInput: '',
    });

    const [loadingState, setLoadingState] = useState(false);

    // const { rowRef } = useRef(null);

    const [showRow, setShowRow] = useState(false);

    useEffect(() => {
        setShowRow(false);
        // reset the form to the default state
    }, [currentMovieTitle]);

    const navigate = useNavigate();

    // TODO: filter out any actors that have already been selected in global list as well as ActorA and ActorB
    const actorOptions = currentActorOptions?.map((actor) => {
        return (
            <option key={actor.id} value={actor.name}>{actor.name}</option>
        )
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
            const actorSelection = formState.actorInput;
            console.log('actorSelection: ', actorSelection);
            if (actorSelection) {
                if (actorSelection !== 'select') {
                    const characterName = currentActorOptions?.find((actor) =>
                        actor.name === actorSelection)
                        ?.character
                        || 'unknown';
                    // console.log('characterName: ', characterName);
                    const selectResponse = await handleActorSelection(actorSelection, characterName);
                    if (selectResponse === true) {
                        setFormState({ actorInput: '' });
                        return;
                    } else {
                        throw new Error('Something went wrong in handleActorSelection()');
                    }
                } else {
                    alert('Please select an actor');
                }
            } else {
                throw new Error('Something went wrong ready actor from formState');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleSelectChoice() {
        // rowRef.current.style.display = 'none';
        setShowRow(true);
        return;
    }


    // TODO: use modules instead of alerts/confirms for display to look better
    async function handleReadyChoice() {
        try {
            setShowRow(false);
            let userConfirm = confirm(`Are you ready to attempt to bridge ${actorB}?`);
            if (userConfirm) {
                setReadyToBridge(true);
                const testResponse = await testFinalInput();
                if (testResponse.evaluationResult === true) {
                    // alert('You did it!');
                    let finalTree = await handleFinalBridge(testResponse.characterName);
                    //!!! PU HERE!!!! is this all we wanna do after game is won in this componetn?
                    navigate('/createTree', { state: { tree: JSON.stringify(finalTree) } }); // we read from this state by using the useLocation hook
                    return;
                } else {
                    alert('Fail! Try Again');
                    handleGameStateChange();
                    // reset the game
                    return;
                }
            } else {
                // then the user is not ready to bridge, so return to game w/o changing state
                return;
            }
        } catch (error) {
            console.error(error);
        }
        // work in here to get the final round checked
    }

    async function testFinalInput() {
        try {
            const movieValue = movieList[movieList.length - 1].movieTitle;
            const actorValue = actorB;
            const { data } = await fetchData({
                variables: {
                    movieInput: movieValue,
                    actorInput: actorValue,
                },
            });
            console.log('data: ', data);
            let evaluationResult = data?.validateMovieInput?.isInMovie || false;
            let characterName = evaluationResult === true ? data.validateMovieInput.character : 'unknown';
            return { evaluationResult, characterName };

        } catch (error) {
            console.error(error);
        }
    }


    // TODO: signify when its in loading state
    // TODO come bacl and make it look nicer?

    return (
        <>
            {formTypeMovie === false && (
                <>
                    {!showRow ? (
                        <ActorModeDecide
                            selectHandler={handleSelectChoice}
                            readyHandler={handleReadyChoice}
                        />
                    ) : (
                        <Row className="g-0">
                            {/* <Form.Label>Select an Actor from {currentMovieTitle}</Form.Label> */}
                            <Col>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label={`Select an Actor from ${currentMovieTitle}`}
                                >
                                    <Form.Select
                                        className="form-controls"
                                        value={formState.actorInput}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                actorInput: e.target.value
                                            })}
                                    >
                                        <option value="select">. . .</option>
                                        {actorOptions}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <Button
                                    className="form-controls submit-btn"
                                    onClick={handleSubmit}
                                >
                                    Submit Actor
                                </Button>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </>
    );
}

export default ActorForm;