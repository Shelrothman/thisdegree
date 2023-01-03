import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
// import SplitButton from 'react-bootstrap/SplitButton';
import Button from 'react-bootstrap/Button';

// import SubmitBtn from '../../buttons/SubmitBtn';



function MovieForm() {
    return (
        <>
            <InputGroup className="mb-3">
                {/* <Form.Label>Movie with currentActorBridge in it</Form.Label> */}
                <FloatingLabel controlId="floatingInput" label="Movie with currentActorBridge in it">
                    <Form.Control placeholder="enter movie name" type="text" className="form-controls" />
                </FloatingLabel>
                {/* <SubmitBtn handler={() => console.log('submit clicked')} /> */}
                <Button variant="outline-secondary" className="form-controls" id="submit-btn">Submit</Button>
            </InputGroup>
        </>
    );
}

export default MovieForm;