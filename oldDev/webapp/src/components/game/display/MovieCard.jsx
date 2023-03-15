import Card from 'react-bootstrap/Card';

function MovieCard({ actorName, lastActor, officialMovieTitle }) {
    return (
        <Card id="card-movie-container">

            <Card.Header as="h5" id="card-movie-header">
                Movie with&nbsp;
                <span className='actorName-card'>
                    {lastActor}
                </span>:&nbsp;
                <span className="movieTitle-card">
                    {officialMovieTitle}
                </span>
            </Card.Header>
            <Card.Body id="card-movie-body">
                Actor in&nbsp;
                <span className="movieTitle-card">
                    {officialMovieTitle}
                </span>:
                &nbsp;
                <span className='actorName-card'>
                    {actorName}
                </span>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;