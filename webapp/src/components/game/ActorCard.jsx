import Card from 'react-bootstrap/Card';

function ActorCard({movie}) {
    return (
    <Card id="card-actor-container">
        <Card.Header as="h5" id="card-actor-header">
            {movie.movieTitle}'s Actor:
        </Card.Header>
        <Card.Body id="card-actor-body">
            <Card.Text>
                {movie.actorSelection}
            </Card.Text>
        </Card.Body>
    </Card>
    );
}

export default ActorCard;