import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function GameConfirm({
    text,
    visible,
    setVisible,
    actorB,
    handleCancelClick,
    handleConfirmClick,
}) {


    const MESSAGE = {
        undo: 'Are you sure you want to undo?',
        startOver: 'Are you sure you want to start over?',
        final: `Are you ready to attempt to bridge ${actorB}?`,
        default: ''
    };


    return (
        <div>
            <Card
                style={{ display: visible ? 'block' : 'none' }}
                className='game-alert'
            >
                <Card.Header>
                    {/* {text} */}
                    Confirm
                </Card.Header>

                <Card.Body>
                    <Card.Title>
                        {MESSAGE[text] || 'something went wrong'}
                        {/* <Modal.Footer> */}
                    </Card.Title>

                    {/* <form onSubmit={handleSubmit}> */}


                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleConfirmClick}>
                        OK
                    </Button>
                    {/* </form> */}
                    {/* </Modal.Footer> */}
                </Card.Body>
            </Card>
        </div>
    );
}

export default GameConfirm;