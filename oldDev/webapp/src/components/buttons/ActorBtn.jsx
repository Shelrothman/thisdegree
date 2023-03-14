// import { RiMovie2Fill } from 'react-icons/ri';
import { BiCameraMovie } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';

function ActorBtn({ text, handler, disabled }) {
    return (
        <div>
            <Button
                className="degreeBtn"
                onClick={() => handler(text)}
                disabled={disabled}
            >
                <BiCameraMovie size={25} />
                {' '}{text}
            </Button>
        </div>
    )
}


export default ActorBtn;