import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BsSkipBackwardCircleFill } from "react-icons/bs";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";
import { useGameContext } from "../../../contexts";

// TODO display the challenge button after user ssees the reason for invalid



function FormContainer() {
    const {
        readyToBuild,
        setDecideMode,
        decideMode,
        formTypeMovie,
        showAlert,
        setShowAlert,
        handleUndoLastRound,
        setConfirmModal,
    } = useGameContext();


    const [showBackBtn, setShowBackBtn] = useState(readyToBuild);

    useEffect(() => {
        setShowBackBtn(readyToBuild);
    }, [readyToBuild]);


    async function handleBackClick() {
        try {
            // first see if need to just go back to decideMode
            if (!decideMode && !formTypeMovie) {
                // just go back to decide mode (that controls the actorForms showRow)
                setDecideMode(true);
                return;
            }
            setConfirmModal({
                show: true,
                text: 'undo',
                callback: () => { handleUndoLastRound() }
            })
            return;
        } catch (error) {
            console.error(error);
        }
    }

    // // TODO remove cruft... remove ecvess confirms bc we only need the onein Launcher

    return (
        <>
            <Container id="main-form-container">
                <MovieForm />
                <ActorForm />
            </Container>
            <div className="float-start mt-3">
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Go back to previous step</Tooltip>}>
                    <button
                        className='degreeBtn btn'
                        style={{ opacity: showBackBtn ? 1 : 0 }}
                        onClick={handleBackClick}
                    >
                        <BsSkipBackwardCircleFill size={25} />
                        &nbsp;
                    </button>
                </OverlayTrigger>
            </div>
        </>
    );
}

export default FormContainer;