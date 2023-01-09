import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BsSkipBackwardCircleFill } from "react-icons/bs";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";
import { useGameContext } from "../../../contexts";

// if going back when in movie mode -> go back to the actor select options, remove the actor card

// (remove from global movieList)
// if going back in actor mode (after choosing to select an actor) -> goes back to the two options and remove last movie card 
//(remove from global movieList)

// TODO in modal, invalid input for this reason: ...
// then the challenge button

function FormContainer() {
    const {
        readyToBuild,
        formTypeMovie,
        removeMovieFromGlobal,
    } = useGameContext();

    const [showBackBtn, setShowBackBtn] = useState(readyToBuild);

    useEffect(() => {
        setShowBackBtn(readyToBuild);
    }, [readyToBuild]);

    async function handleBackClick() {
        if (formTypeMovie) {
            console.log('In formTypeMovie');
            // mode is only true when in the text-input mode movie mode
            const removeRes = await removeMovieFromGlobal();
            console.log('removeRes: ', removeRes);
        } else {
            console.log('not in formTypeMovie');
        }
    }

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