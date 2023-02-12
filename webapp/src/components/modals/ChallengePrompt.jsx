// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ChallengeForm from '../game/form/ChallengeForm';


function ChallengePrompt({
    text,
    visible,
    // setVisible,
    // actorB,
    // handleCancelClick,
    // handleConfirmClick,
}) {


    return (
        <div>
            <Card
                style={{ display: visible ? 'block' : 'none' }}
                className='game-confirm'
            >
                <Card.Header>
                    {/* {text} */}
                    Challenge Mode
                </Card.Header>

                <Card.Body>
                    <Card.Title>
                        {/* {MESSAGE[text] || text} */}
                        A logical Title
                        {/* <Modal.Footer> */}
                    </Card.Title>
                    <ChallengeForm />
                </Card.Body>
            </Card>
        </div>
    );
}

export default ChallengePrompt;