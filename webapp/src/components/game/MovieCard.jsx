import Card from 'react-bootstrap/Card';

function MovieCard({ movie }) {
    return (
        <Card id="card-movie-container">

            <Card.Body id="card-movie-body">
                <Card.Text>
                    Movie Bridge:

                </Card.Text>
            </Card.Body>
            <Card.Header as="h5" id="card-movie-header">
                    <span className="movieTitle-card">
                        {movie.movieTitle}
                    </span>
            </Card.Header>
        </Card>
    );
}

export default MovieCard;