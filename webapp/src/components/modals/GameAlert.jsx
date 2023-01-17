import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function GameAlert({
    text,
    visible,
    setVisible,
    end = false,
    subtext,
    // variant = undefined,
    // variant = 'blue',
    // subtext = text
}) {
    const handleClose = () => setVisible(false);

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

                    {subtext && <Modal.Body>{subtext}</Modal.Body>}
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