import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import ActorCard from './ActorCard';


function CardContainer({ movieTitle, movieType = true, actorName = '' }) {
    const justifyContent = movieType ? 'end' : 'start';
    return (
        <Container style={{
            display: 'flex',
            justifyContent: justifyContent,
        }}>
            {
                movieType ?
                    <MovieCard movie={movieTitle} />
                    : <ActorCard movie={movieTitle} actorName={actorName} />
            }
        </Container>
    );
}

export default CardContainer;