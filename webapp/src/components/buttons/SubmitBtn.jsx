import Button from 'react-bootstrap/Button';
import { BiCameraMovie } from 'react-icons/bi';

function SubmitBtn({ handler }) {
    return (
        <Button onClick={handler} className="degreeBtn">
            <BiCameraMovie size={25} />
            Submit
        </Button>
    );
}

export default SubmitBtn;