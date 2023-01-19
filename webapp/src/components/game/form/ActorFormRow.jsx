import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function ActorFormRow(props) {
    const {
        movieName,
        actorOptions,
        formState,
        setFormState,
        handleSubmit,
    } = props;

    return (
        <Row className="g-0">
            <Col md={9}>
                <FloatingLabel
                    controlId="floatingSelectGrid"
                    label={`Select an Actor from ${movieName}`}
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
                        <option>. . .</option>
                        {actorOptions}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col md={3}>
                <Button
                    className="form-controls submit-btn"
                    onClick={handleSubmit}
                >
                    Submit Actor
                </Button>
            </Col>
        </Row>
    );
}

export default ActorFormRow;