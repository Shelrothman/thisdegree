import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import ActorCard from './ActorCard';


function CardContainer({ movie, movieType = true }) {
    const justifyContent = movieType ? 'end' : 'start';
    
    return (
        <Container style={{
            display: 'flex',
            justifyContent: justifyContent,
        }}>
            {
                movieType ?
                    <MovieCard movie={movie} />
                    : <ActorCard movie={movie} />
            }
        </Container>
    );
}

export default CardContainer;