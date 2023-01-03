import { useState } from 'react';

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
// import SplitButton from 'react-bootstrap/SplitButton';
import Button from 'react-bootstrap/Button';
import { useGameContext, useActorContext } from '../../../contexts';
// import SubmitBtn from '../../buttons/SubmitBtn';

// TODO: launcher needs to only be allowed to exit once the BOTH are selected, if only one is- don not let user closer it.. just can for now for ease of development

function MovieForm() {
    const { actorA } = useActorContext();
    const { currentActorBridge, readyToBuild, setCurrentActorBridge } = useGameContext();
    const [movieTitle, setMovieTitle] = useState(readyToBuild ? currentActorBridge : actorA);

    return (
        <>
            <InputGroup className="mb-3">
                {/* <Form.Label>Movie with currentActorBridge in it</Form.Label> */}
                <FloatingLabel controlId="floatingInput" label={`Movie with ${movieTitle} in it`}>
                    <Form.Control placeholder="enter movie name" type="text" className="form-controls" />
                </FloatingLabel>
                {/* <SubmitBtn handler={() => console.log('submit clicked')} /> */}
                <Button variant="outline-secondary" className="form-controls" id="submit-btn">Submit</Button>
            </InputGroup>
        </>
    );
}

export default MovieForm;