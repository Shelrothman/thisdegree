import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../../contexts';
// TODO change to display the character Name somewhere in the tree or soemthign cool

import ActorModeDecide from './ActorModeDecide';
import ActorFormRow from './ActorFormRow';
import { useValidateMovieInput } from '../../../hooks/useGQLclient';
import Spinner from '../../../utils/Spinner';



function ActorForm() {
    const {
        formTypeMovie,
        currentMovieTitle,
        currentActorOptions,
        handleActorSelection,
        actorB,
        handleGameStateChange,
        handleFinalBridge,
        setDecideMode,
        decideMode,
        setShowAlert,
        setShowConfirm,
        setConfirmText,
        setConfirmModal,
    } = useGameContext();
    const [movieName, setMovieName] = useState(currentMovieTitle);
    const [formState, setFormState] = useState({
        actorInput: '',
    });
    const [showRow, setShowRow] = useState(!decideMode);
    const navigate = useNavigate();

    useEffect(() => {
        setShowRow(!decideMode);
        // console.log('decideMode: ', decideMode);
    }, [decideMode]);

    useEffect(() => {
        setShowRow(false);
        setMovieName(currentMovieTitle);
        // reset the form to the default state each round
    }, [currentMovieTitle]);


    // TODO: filter out any actors that have already been selected in global list as well as ActorA and ActorB
    const actorOptions = currentActorOptions?.map((actor) => {
        return <option key={actor.id} value={actor.name}>{actor.name}</option>
    });


    const {
        data,
        isLoading,
        error: isQueryError,
        refetch,
        isFetching
    } = useValidateMovieInput(movieName, actorB);



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
                callback: () => refetch().then((res) => {
                    // console.log('res: ', res); // debug
                    handleFinalResults(res.data);
                }),
            })
            return;
        } catch (error) {
            console.error(error);
        }
    }



    async function handleFinalResults(data) {
        try {
            console.log('in handleFinalResults()');
            // console.log('data: ', data); // debug
            setShowConfirm(false);
            setConfirmText('default');
            setConfirmModal({ show: false, text: 'default' });
            let evaluationResult = data.validateMovieInput;
            // console.log('evaluationResult: ', evaluationResult); // debug
            if (evaluationResult.isInMovie === true) {
                console.log('true isInMovie!')
                let finalTree = await handleFinalBridge(evaluationResult.character);
                //* handling any congratulatory messages over in createTree component
                navigate('/createTree', { state: { tree: JSON.stringify(finalTree) } });
                return;
            } else {
                console.log('Failed final bridge!');
                setShowAlert({
                    show: true,
                    text: 'Fail! Try Again',
                    end: true,
                    subtext: `${actorB.toUpperCase()} is *not* in the cast of ${currentMovieTitle.toUpperCase()}`
                });
                setTimeout(() => {
                    handleGameStateChange();
                    // reset the game after giving user enough time to read the alert and feel the shame
                }, 4600);
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };




    // // TODO move all confirm stuff to context
    // TODO show spinner underneath for while final bridge "checkas" the last input for actorB and movieTitle
    // TODO this function is a mess and needs work.
    return (
        <>
            {isFetching ? <Spinner /> : <></>}
            {formTypeMovie === false && (
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
    );
}

export default ActorForm;