import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
// import { useActorContext } from '../../contexts';
// import { useGameContext } from '../../contexts';


function GameConfirm({
    text,
    visible,
    setVisible,
    subtext,
    actorB,
    setConfirmed,
    confirmed,
}) {

    // const { setShowConfirm } = useGameContext();

    

    const handleClose = () => setVisible({ show: false });


    const handleConfirmClick = () => setConfirmed(true);

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
                        {MESSAGE[subtext] || 'something went wrong'}
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