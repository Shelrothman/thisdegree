import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsArrowDownCircle, BsThreeDotsVertical } from 'react-icons/bs';
import { useGameContext } from '../contexts/GameContext';

function LockedCardDiv({ actor, movie, round }: any) {
    const { globalFormState } = useGameContext() as any;

    const inputProps = {
        readOnly: true,
        type: 'text',
        // name: 'actor',
    };


    return (
        <div>
            <Card style={{
                backgroundColor: 'darkgreen',
                border: '1px solid darkblue',
            }}>
                <Card.Header style={{ position: "relative" }}>
                    Round {round}:
                    <Button className="close-btn" aria-label="Close">
                        &times;
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div>
                        <label htmlFor="actor">Actor:</label>{' '}
                        <input
                            type="text"
                            className="actor-input-locked"
                            name="actor"
                            value={actor}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>{' '}
                        <input
                            type="text"
                            className="movie-input-locked"
                            name="movie"
                            value={movie}
                            readOnly
                        />
                    </div>
                    <BsArrowDownCircle size='1.2rem' style={{ paddingTop: '0.3rem' }} />
                </Card.Body>
            </Card>
            <BsThreeDotsVertical
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