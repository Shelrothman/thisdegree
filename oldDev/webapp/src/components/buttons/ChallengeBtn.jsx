import Button from 'react-bootstrap/Button';
// import { BiCameraMovie } from 'react-icons/bi';
import { GiMailedFist } from 'react-icons/gi';

function ChallengeBtn({ handler }) {
    return (
        <Button onClick={handler} className="degreeBtn">
            <GiMailedFist size={25} />
            Challenge
        </Button>
    );
}

export default ChallengeBtn;