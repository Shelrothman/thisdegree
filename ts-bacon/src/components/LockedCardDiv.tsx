import Card from 'react-bootstrap/Card';
import { BsArrowDown } from 'react-icons/bs';


function LockedCardDiv({ actor, movie }: any) {

    return (
        <div>
            <Card style={{
                backgroundColor: 'darkgreen',
                border: '1px solid darkblue',
            }}>
                <Card.Header>After Lock</Card.Header>
                <Card.Body>
                    <Card.Title>Info Saved</Card.Title>
                    <div>
                        <label htmlFor="actor">Actor:</label>
                        <input
                            type="text"
                            id="actor"
                            name="actor"
                            value={actor}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>
                        <input
                            type="text"
                            id="movie"
                            name="movie"
                            value={movie}
                            readOnly
                        />
                    </div>
                </Card.Body>
            </Card>
            <BsArrowDown
                style={{
                    backgroundColor: 'darkgreen',
                    color: 'darkblue',
                    border: '1px solid darkblue',
                    position: 'absolute',
                    zIndex: 9,
                }}
            />
        </div>
    );
}

export default LockedCardDiv;