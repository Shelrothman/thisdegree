import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// static shiz
const MESSAGE = {
    notUnique: 'movie has already been used',
    notFound: 'actor is not found in movie evaluation',
    empty: 'movie input was empty',
    default: ''
}

function GameAlert({
    text,
    visible,
    setVisible,
    end = false,
    subtext,
}) {
    const handleClose = () => setVisible({ show: false });

    // console.log('end: ', end);

    if (visible) {
        return (
            <div>
                <Modal
                    show={visible}
                    onHide={handleClose}
                    backdrop='static'
                    keyboard={false}
                    centered
                    className='game-alert'
                >
                    <Modal.Header closeButton={!end}>
                        <Modal.Title>{text}</Modal.Title>
                    </Modal.Header>

                    {subtext && <Modal.Body>
                        {MESSAGE[subtext] || subtext}
                    </Modal.Body>}
                    <Modal.Footer>
                        {!end && <Button variant="primary" onClick={handleClose}>
                            OK
                        </Button>}
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default GameAlert;