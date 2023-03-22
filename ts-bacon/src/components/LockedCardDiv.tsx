import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { BsArrowDownCircle, BsThreeDotsVertical } from 'react-icons/bs';
// import ExitCard from './ExitCard';
import Close from './Close';

function LockedCardDiv({ actor, movie, round }: {
    actor: string,
    movie: string,
    round: number
}) {
    const inputProps = (x: string) => {
        return {
            readOnly: true,
            type: 'text',
            name: x,
            className: `${x}-input-locked`,
        }
    };

    // console.log(round);

    return (
        <div>
            <Card className="locked-card">
                <Card.Header style={{ position: "relative" }} id={`locked-header-${round}`}>
                    <strong>Round {round}:</strong>
                    <Close round={round} />
                </Card.Header>
                <Card.Body>
                    <div>
                        <label htmlFor="actor">Actor:</label>{' '}
                        <input {...inputProps('actor')} value={actor} />
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>{' '}
                        <input {...inputProps('movie')} value={movie} />
                    </div>
                    <BsArrowDownCircle size='1.2rem' style={{ paddingTop: '0.3rem' }} />
                </Card.Body>
            </Card>
            <BsThreeDotsVertical className='three-dots' />
        </div>
    );
}

export default LockedCardDiv;