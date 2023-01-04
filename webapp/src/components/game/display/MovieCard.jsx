import Card from 'react-bootstrap/Card';

function MovieCard({ movie, actorName }) {
    return (
        <Card id="card-movie-container">

            <Card.Body id="card-movie-body">
                <Card.Text>
                    Movie with {actorName}:
                </Card.Text>
            </Card.Body>
            <Card.Header as="h5" id="card-movie-header">
                    <span className="movieTitle-card">
                        {movie}
                    </span>
            </Card.Header>
        </Card>
    );
}

export default MovieCard;