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
        removeMovieObjFromGlobal,
    } = useGameContext();

    const [showBackBtn, setShowBackBtn] = useState(readyToBuild);

    useEffect(() => {
        setShowBackBtn(readyToBuild);
    }, [readyToBuild]);

    async function handleBackClick() {
        try {
            const removeRes = await removeMovieObjFromGlobal();
            if (removeRes) {
                // setShowBackBtn(false);
                console.log('removed movie from global');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // async function handleBackClick() {
    // if (formTypeMovie) {
    // console.log('In formTypeMovie');
    // mode is only true when in the text-input mode movie mode
    // const removeRes = await removeMovieObjFromGlobal();
    // if (removeRes) {
    //     // setShowBackBtn(false);
    //     console.log('removed movie from global');
    // }
    //!!! RETURN HERE!!! GET THIS WORKING... rethink some backend stuff...
    //! rethink where we really want to have the button be showing as an option... maybe not everywhere but just at one spot and make it a force to have to go back all the way to the last round,, yea like no matter where the back is clicked at, we remove the last item from the movieList array and the user can either enter the same movie and then a new actor.. or a brand new movie and a new actor.... 
    // so the button should only be visible when in movieMode and the only back direction to take it is to the last movieInput.....so the form wont change bc the mode wont change but the movieList will. and just whole at a time.
    // perhaps the button could be visible still at any point BUT no matter wjhat.. it always takes them back to the beginning of a fresh Round.. i.e. to the movie Input place.
    // } else {
    // console.log('not in formTypeMovie');
    // const removeRes = await removeMovieObjFromGlobal();
    // if (removeRes) {
    //     // setShowBackBtn(false);
    //     console.log('removed movie from global');
    // }
    // }
    // }

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