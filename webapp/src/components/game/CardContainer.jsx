import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import ActorCard from './ActorCard';
import { useGameContext } from '../../contexts';

function CardContainer({ movieType = true, actorName = '' }) {
    const { currentMovieTitle, currentActorBridge } = useGameContext();
    const [movieTitle, setMovieTitle ]  = useState(currentMovieTitle); 
    // duhhhh this is where u gpt put in state, the context to keep it modular innn here which is the point of this branch and  seeding out the context like my pic.
    const [actorBridge, setActorBridge] = useState(currentActorBridge);


    const justifyContent = movieType ? 'end' : 'start';
    return (
        <Container style={{
            display: 'flex',
            justifyContent: justifyContent,
        }}>
            {
                movieType ?
                    <MovieCard movie={movieTitle} />
                    : <ActorCard movie={movieTitle} actorName={actorBridge} />
            }
        </Container>
    );
}

export default CardContainer;