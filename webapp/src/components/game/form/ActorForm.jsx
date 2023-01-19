import { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import Spinner from '../../../utils/Spinner';
import VALIDATE_MOVIE_QUERY from '../../../queries/validateMovieInput';
import ActorModeDecide from './ActorModeDecide';
import { useGameContext } from '../../../contexts';
// TODO change to display the character Name somewhere in the tree or soemthign cool

// import GameAlert from '../../modals/GameAlert';
import GameConfirm from '../../modals/GameConfirm';
import ActorFormRow from './ActorFormRow';

function ActorForm() {
    const {
        formTypeMovie,
        currentMovieTitle,
        currentActorOptions,
        handleActorSelection,
        // setReadyToBridge,
        movieList,
        actorB,
        handleGameStateChange,
        handleFinalBridge,
        setDecideMode,
        decideMode,
        setShowAlert,
        showConfirm,
        setShowConfirm,
        confirmText,
        setConfirmText,
    } = useGameContext();
    const [movieName, setMovieName] = useState(currentMovieTitle);
    const [formState, setFormState] = useState({
        actorInput: '',
    });
    const [showRow, setShowRow] = useState(!decideMode);
    // const [showConfirm, setShowConfirm] = useState(false); // for the visual 


    useEffect(() => {
        setShowRow(!decideMode);
        // console.log('decideMode: ', decideMode);
    }, [decideMode]);

    // useEffect(() => {
    //     setShowConfirm(confirmMode);
    // }, [confirmMode]);

    useEffect(() => {
        setShowRow(false);
        setMovieName(currentMovieTitle);
        // reset the form to the default state each round
    }, [currentMovieTitle]);

    const navigate = useNavigate();

    // TODO: filter out any actors that have already been selected in global list as well as ActorA and ActorB
    const actorOptions = currentActorOptions?.map((actor) => {
        return <option key={actor.id} value={actor.name}>{actor.name}</option>
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
                setShowAlert({ show: true, text: 'Please select an actor' });
                // throw new Error('Something went wrong in handleSubmit()');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleSelectChoice() {
        setDecideMode(false); // track when in decideMode in Form (only true when in ActorModeDecide)
        setShowRow(true);
        return;
    }



    async function handleReadyChoice() {
        try {
            setShowRow(false);
            // set it here to true so that it will display the confirm form.
            setShowConfirm(true);
            setConfirmText('final');
            return;
        } catch (error) {
            console.error(error);
        }
    }

    async function testFinalInput() {
        try {
            // TODO: need to incorporate context and update state with the final movie and actor
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

    async function handleReadyClick() {
        try {
            setShowConfirm(false);
            setConfirmText('default');
            const testResponse = await testFinalInput();
            if (testResponse.evaluationResult === true) {
                // alert('You did it!');
                let finalTree = await handleFinalBridge(testResponse.characterName);
                //* handling any congratulatory messages over in createTree component
                navigate('/createTree', { state: { tree: JSON.stringify(finalTree) } });
                return;
            } else {
                // alert('Fail! Try Again');
                setShowAlert({ show: true, text: 'Fail! Try Again', end: true });
                setTimeout(() => {
                    handleGameStateChange();
                    // reset the game after giving user enough time to read the alert
                }, 4600);
                return;
            }
        } catch (error) {
            console.error(error);
        }


    };

    function handleCancelClick() {
        setShowConfirm(false);
        setConfirmText('default');
        return;
    };



    // TODO move all confirm stuff to context
    // TODO show spinner underneath for while final bridge "checkas" the last input for actorB and movieTitle
    // TODO this function is a mess and needs work.
    return (
        <>
            {formTypeMovie === false && (
                <>
                    {showConfirm ? (
                        <GameConfirm
                            text={confirmText}
                            actorB={actorB}
                            handleCancelClick={handleCancelClick}
                            handleConfirmClick={handleReadyClick}
                        />
                    ) : (
                        <>
                            {!showRow ? (
                                <ActorModeDecide
                                    selectHandler={handleSelectChoice}
                                    readyHandler={handleReadyChoice}
                                    movieTitle={movieName}
                                />
                            ) : (
                                <ActorFormRow
                                    movieName={movieName}
                                    actorOptions={actorOptions}
                                    formState={formState}
                                    setFormState={setFormState}
                                    handleSubmit={handleSubmit}
                                // loading={loading}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default ActorForm;