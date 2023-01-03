import Form from 'react-bootstrap/Form';


function ActorForm() {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Select an Actor from currentMovieTitle</Form.Label>
                <Form.Select className="form-controls">
                    <option>Disabled select</option>
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default ActorForm;