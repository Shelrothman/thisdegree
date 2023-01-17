import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BsSkipBackwardCircleFill } from "react-icons/bs";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";
import { useGameContext } from "../../../contexts";
import GameAlert from "../../modals/GameAlert";

// TODO display the challenge button after user ssees the reason for invalid



function FormContainer() {
    const {
        readyToBuild,
        removeMovieObjFromGlobal,
        setDecideMode,
        decideMode,
        formTypeMovie,
        showAlert,
        setShowAlert,
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
            let userChoice = confirm('Are you sure you want to undo the last round?');
            if (!userChoice) return;
            const removeRes = await removeMovieObjFromGlobal();
            if (removeRes) {
                // we are going back to the beginning of a new round 
                console.log('removed movie from global');
            }
            return;
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Container id="main-form-container">
                <GameAlert
                    text={showAlert?.text}
                    visible={showAlert?.show}
                    setVisible={() => setShowAlert()}
                    end={showAlert?.end}
                    subtext={showAlert?.subtext}
                />
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