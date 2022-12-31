import Card from 'react-bootstrap/Card';
// import { useGameContext } from '../../contexts';



function ActorCard({ movie, actorName }) {
    return (
        <Card id="card-actor-container">
            <Card.Header as="h5" id="card-actor-header">
                Actor in
                <span className="movieTitle-card">
                    {movie}
                </span>
            </Card.Header>
            <Card.Body id="card-actor-body">
                <Card.Text>
                    {actorName}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ActorCard;