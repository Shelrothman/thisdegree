import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import ChallengeContainer from '../game/ChallengeContainer';
import { CiBatteryEmpty } from 'react-icons/ci';
import { MdOutlineWrongLocation } from 'react-icons/md';
import { TbRepeatOff } from 'react-icons/tb';
// static shiz
const MESSAGE = {
    notUnique: 'movie has already been used',
    notFound: 'actor is not found in movie evaluation',
    empty: 'movie input was empty',
    // * empty technically wont happen bc the submit btn is disabled when empt input  but that cud change in the future so we leave this.
    default: ''
}

const NO_STRING = 'notFound';


function GameAlert({
    text,
    visible,
    setVisible,
    end = false,
    subtext,
}) {
    const handleClose = () => setVisible({ show: false });

    // console.log('end: ', end);
    console.log('inside GameAlert!!');

    function showConfirmIcon() {
        switch (subtext) {
            case 'notUnique':
                return <TbRepeatOff size={25} />;
            case 'notFound':
                return <MdOutlineWrongLocation size={25} />;
            case 'empty':
                return <CiBatteryEmpty size={25} />;
            default:
                return '';
        }
    }

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
                        {/* {subtext === NO_STRING && <ChallengeContainer />} */}
                        {end === false && <Button variant="primary" onClick={handleClose}>
                            ok{' '}{showConfirmIcon()}
                        </Button>}
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default GameAlert;