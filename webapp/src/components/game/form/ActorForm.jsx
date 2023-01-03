

import { useGameContext } from '../../../contexts';
import Form from 'react-bootstrap/Form';

function ActorForm() {
    const { currentMovieTitle } = useGameContext();
    return (
        <>
        {/* check here for if there is a currentActorBridge to disable or not */}
            <Form.Group className="mb-3">
                <Form.Label>Select an Actor from {currentMovieTitle}</Form.Label>
                <Form.Select className="form-controls">
                    <option>Disabled select</option>
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default ActorForm;