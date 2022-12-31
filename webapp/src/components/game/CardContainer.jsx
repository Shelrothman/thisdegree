import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import ActorCard from './ActorCard';

import { useGameContext } from '../../contexts';


function CardContainer({ movieType = true, actorName = '' }) {
    const { movieList } = useGameContext();
    const [movieTitle, setMovieTitle ]  = useState(movieList[movieList.length - 1].movieTitle)


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