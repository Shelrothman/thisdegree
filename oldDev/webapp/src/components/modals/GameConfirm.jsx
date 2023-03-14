import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { VscDebugRestart } from 'react-icons/vsc';
import { GiFinishLine } from 'react-icons/gi';
import { BsBackspace } from 'react-icons/bs';
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

    function showConfirmIcon() {
        switch (text) {
            case 'undo':
                return <BsBackspace size={25} />;
            case 'startOver':
                return <VscDebugRestart size={25} />;
            case 'final':
                return <GiFinishLine size={25} />;
            default:
                return '';
        }
    }

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
                        {MESSAGE[text] || text}
                        {/* <Modal.Footer> */}
                    </Card.Title>
                    {/* <form onSubmit={handleSubmit}> */}
                    <Button onClick={handleConfirmClick} className="degreeBtn" >
                        <strong>Yes</strong>{' '}{showConfirmIcon()}
                    </Button>
                    {' '}
                    <Button onClick={handleCancelClick} variant="secondary">
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