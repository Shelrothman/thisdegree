import { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
// import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

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
        handleCancelClick,
        confirmModal,
        setConfirmModal,
    } = useGameContext();
    const [movieName, setMovieName] = useState(currentMovieTitle);
    const [formState, setFormState] = useState({
        actorInput: '',
    });
    const [showRow, setShowRow] = useState(!decideMode);
    // const [showConfirm, setShowConfirm] = useState(false); // for the visual 

    // const [readyToBridge, setReadyToBridge] = useState(false);

    useEffect(() => {
        setShowRow(!decideMode);
        // console.log('decideMode: ', decideMode);
    }, [decideMode]);

    // useEffect(() => {
    //     setShowConfirm(confirmMode);
    // }, [confirmMode]);

    // useEffect(() => {
    //     if (readyToBridge) {
    //         handleReadyClick().then(() => {
    //             console.log('yea we in this effect');
    //         });
    //     } else {
    //         console.log('not ready to bridge');
    //     }
    // }, [readyToBridge]);

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
            setShowConfirm(true);
            setConfirmModal({
                show: true,
                text: 'final',
                callback: () => main(),
            })
            ///!!! SOo close but just this one callback i cant do async with it,,,
            // but it works so well everywhere else... WHAT DO PEOPLE DO WHEN THEY WANT TO USE an async function inside useState>??? 
            //**  ugh i need to rethink the logic AGAIN.....
            // maybe react-query would be beter than apollo since (ader to use) I can use it outside of components so i Can set it up in the context and then call to it from the context and set it in here
            // set it here to true so that it will display the confirm form.
            return;
        } catch (error) {
            console.error(error);
        }
    }

    function main() {
        handleReadyClick().then(() => {
            console.log('yea we in this effect');
        }); //////////////
    }

    async function testFinalInput() {
        try {
            // // TODO: need to incorporate context and update state with the final movie and actor
            const movieValue = movieList[movieList.length - 1].movieTitle;
            const actorValue = actorB;
            const { data } = await fetchData({
                variables: {
                    movieInput: movieValue,
                    actorInput: actorValue,
                },
            });
            evaluationResult = data?.validateMovieInput?.isInMovie || false;
            characterName = evaluationResult === true ? data.validateMovieInput.character : 'unknown';
            // fetchDataPromise(movieValue, actorValue).then(({data}) => {
            //     console.log('data: ', data); // this isnt getting called bc the promise is not resolving
            //     // in order for it to resolve, the data needs to be returned from the server
            //     evaluationResult = data?.validateMovieInput?.isInMovie || false;
            //     characterName = evaluationResult === true ? data.validateMovieInput.character : 'unknown';
            // });
            return { evaluationResult, characterName };
        } catch (error) {
            console.error(error);
        }
    }

    // function fetchDataPromise(movieValue, actorValue) {
    //     return new Promise((resolve, reject) => {
    //         fetchData({
    //             variables: {
    //                 movieInput: movieValue,
    //                 actorInput: actorValue,
    //             },
    //         }).then((response) => {
    //             if (response) {
    //                 resolve(response);
    //             } else {
    //                 reject(Error("No data in response"));
    //             }
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }

    async function handleReadyClick() {
        try {
            console.log('we got here cutie');
            // why does this not go any further than here?
            // bc u cant do an async in set state for the callback.
            let testResponse;
            setShowConfirm(false);
            // setConfirmText('default');
            // setConfirmModal({ show: false, text: 'default' });
            testResponse = await testFinalInput();
            if (testResponse.evaluationResult === true) {
                console.log('And here??')

                // alert('You did it!');
                let finalTree = handleFinalBridge(testResponse.characterName);
                //* handling any congratulatory messages over in createTree component
                navigate('/createTree', { state: { tree: JSON.stringify(finalTree) } });
                return;
            } else {
                // alert('Fail! Try Again');

                console.log('And here??!!!!');

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