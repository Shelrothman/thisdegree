import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import ActorCard from './ActorCard';
import { useGameContext } from '../../contexts';

function CardContainer({ movieType = true, actorName = '', movieName }) {
    const { currentMovieTitle, currentActorBridge } = useGameContext();
    const [movieTitle, setMovieTitle] = useState(currentMovieTitle);
    //!!!! uhoh this is , when i hit save it changes all the cards at once..
    //* nvm it doesnt really seem to be happening rn\
    //* yea so when i save the Context File, it changes all the cards at once, 
    // duhhhh this is where u gpt put in state, the context to keep it modular innn here which is the point of this branch and  seeding out the context like my pic.--- ! it just doesnt work rn bc it renders through the mapping of the movieList... oh so mabe i should change that? 
    const [actorBridge, setActorBridge] = useState(currentActorBridge);


    const justifyContent = movieType ? 'end' : 'start';

    return (
        <Container style={{
            display: 'flex',
            justifyContent: justifyContent,
        }}>
            {
                movieType ?
                    <MovieCard movie={movieName} />
                    : <ActorCard movie={movieName} actorName={actorName} />
            }
        </Container>
    );
}

export default CardContainer;