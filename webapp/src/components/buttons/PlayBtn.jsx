import { BiMoviePlay } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';

function PlayBtn({ text, handler, style }) {
    return (
        <div>
            <Button
                style={style}
                className="degreeBtn"
                onClick={handler}
            >
                <BiMoviePlay size={25} />
                {text}
            </Button>
        </div>
    )
}


export default PlayBtn;