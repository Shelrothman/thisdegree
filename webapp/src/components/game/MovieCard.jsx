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
                <h4>
                    <span className="movieTitle-card">
                        {movie.movieTitle}
                    </span>
                </h4>
            </Card.Header>
        </Card>
    );
}

export default MovieCard;