import { RiMovie2Fill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';

function MovieBtn({ text, handler, disabled }) {
    return (
        <div>
            <Button
                className="degreeBtn"
                onClick={() => handler(text)}
                disabled={disabled}
            >
                <RiMovie2Fill size={25} />
                {text}
            </Button>
        </div>
    )
}


export default MovieBtn;