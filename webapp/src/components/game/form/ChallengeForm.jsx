/**
 * @summary ChallengeForm component 
*/
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useGameContext } from '../../../contexts';


function ChallengeForm() {

    const {
        gamePrompt: challengePrompt,
        setGamePrompt: setChallengePrompt,
    } = useGameContext();

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                        {challengePrompt.text}
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ChallengeForm;