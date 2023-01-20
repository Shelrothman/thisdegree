import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function GameConfirm({
    text,
    // visible,
    // setVisible,
    actorB,
    handleCancelClick,
    handleConfirmClick,
}) {


    const MESSAGE = {
        undo: 'Are you sure you want to undo the last round?',
        startOver: 'Are you sure you want to start over?',
        final: `Are you ready to attempt to bridge ${actorB}?`,
        default: ''
    };

    console.log('handler: ', handleConfirmClick);

    return (
        <div>
            <Card
                // style={{ display: visible ? 'block' : 'none' }}
                className='game-confirm'
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
                    <Button onClick={handleConfirmClick}>
                        OK
                    </Button>
                    <Button onClick={handleCancelClick}>
                        Cancel
                    </Button>
                    {/* </form> */}
                    {/* </Modal.Footer> */}
                </Card.Body>
            </Card>
        </div>
    );
}

export default GameConfirm;