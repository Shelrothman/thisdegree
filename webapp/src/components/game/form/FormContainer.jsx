import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";
import { useGameContext } from "../../../contexts";

// if going back when in movie mode -> go back to the actor select options, remove the actor card
// (remove from global movieList)
// if going back in actor mode (after choosing to select an actor) -> goes back to the two options and remove last movie card 
//(remove from global movieList)


function FormContainer() {
    const {
        readyToBuild,
    } = useGameContext();

    const [showBackBtn, setShowBackBtn] = useState(readyToBuild);

    useEffect(() => {
        setShowBackBtn(readyToBuild);
    }, [readyToBuild]);


    function handleBackClick() {
        console.log(event.target)
    }

    return (
        <Container id="main-form-container">
            <MovieForm />
            <ActorForm />
            <div className="mt-2">
                <button
                    style={{ opacity: showBackBtn ? 1 : 0 }}
                    onClick={handleBackClick}
                >
                    &gt;-- Back
                </button>
            </div>
        </Container>
    );
}

export default FormContainer;