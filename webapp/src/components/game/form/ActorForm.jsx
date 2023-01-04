import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useGameContext } from '../../../contexts';
// import Spinner from '../../../utils/Spinner';
// TODO change to have the character Name somewhere in the tree or soemthign cool

function ActorForm() {
    const {
        formTypeMovie,
        currentMovieTitle,
        currentActorOptions,
        handleActorSelection,
    } = useGameContext();

    const [formState, setFormState] = useState({
        // movieInput: '',
        actorInput: '',
    });
    const actorOptions = currentActorOptions?.map((actor) => {
        return (
            <option key={actor.id} value={actor.name}>{actor.name}</option>
        )
    });

    async function handleSubmit() {
        try {
            const actorSelection = formState.actorInput;
            if (actorSelection) {
                if (actorSelection !== 'select') {
                    const selectResponse = await handleActorSelection(actorSelection);
                    if (selectResponse === true) {
                        setFormState({ actorInput: '' });
                        return;
                    } else {
                        throw new Error('Something went wrong in handleActorSelection()');
                    }
                } else {
                    alert('Please select an actor');
                }
            } else {
                throw new Error('Something went wrong ready actor from formState');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // TODO come bacl and make it look nicer?

    return (
        <>
            {formTypeMovie === false && (
                <Row className="g-0">
                    {/* <Form.Label>Select an Actor from {currentMovieTitle}</Form.Label> */}
                    <Col>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label={`Select an Actor from ${currentMovieTitle}`}
                        >
                            <Form.Select
                                className="form-controls"
                                value={formState.actorInput}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        actorInput: e.target.value
                                    })}
                            >
                                <option value="select">. . .</option>
                                {actorOptions}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Button
                            className="form-controls submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit Actor
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ActorForm;