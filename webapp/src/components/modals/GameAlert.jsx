import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function GameAlert({
    text,
    visible,
    setVisible,
    end = false,
    subtext = text
}) {
    const handleClose = () => setVisible(false);

    // console.log('end: ', end);

    if (visible) {
        return (
            <>
                <Modal
                    show={visible}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton={!end}>
                        <Modal.Title>{text}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {text}
                    </Modal.Body>
                    <Modal.Footer>
                        {!end && <Button variant="primary" onClick={handleClose}>
                            OK
                        </Button>}
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}

export default GameAlert;