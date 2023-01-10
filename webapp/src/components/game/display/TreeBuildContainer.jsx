import { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import uuid from 'react-uuid';

import { useGameContext } from "../../../contexts";
import ActorCard from "./ActorCard";
import MovieCard from "./MovieCard";


function TreeBuildContainer() {
    const {
        currentMovieTitle,
        currentActorBridge,
        readyToBuild,
        formTypeMovie,
        gameChange,
        actorA,
        movieList
    } = useGameContext();

    // const [bridgeCards, setBridgeCards] = useState([]);
    const [actorName, setActorName] = useState(readyToBuild ? currentActorBridge : actorA);
    // const [movieName, setMovieName] = useState(currentMovieTitle);

    const [localMovieList, setLocalMovieList] = useState(movieList);



    
    //? useMemo in here?
    // useEffect(() => {
    //     if (readyToBuild) {
    //         setBridgeCards((prevBridgeCards) => {
    //             return [...prevBridgeCards,
    //             <MovieCard key={uuid()} movie={movieName} actorName={actorName} />,];
    //         });
    //     }
    // }, [movieName]);
    // // ? should these useEffects be refactored?

    useEffect(() => {
        if (readyToBuild) {
            setActorName(currentActorBridge);
        }
        else setActorName(actorA);
    }, [currentActorBridge]);

    //* i thihnk i should be mapping the movieLost like o did way back before refactor... like map it and then set the bridgeCards to that so THAT we can filter it out when we need to


    // }, [gameChange]);

    useEffect(() => {
        setLocalMovieList(movieList);
    }, [currentMovieTitle]);
    return (
        <Container id="tree-build-container" fluid>
            <Row>
                {localMovieList.map((movie) => {
                    return (
                        <MovieCard key={uuid()} lastActor={!readyToBuild ? actorA : movie.previousActor.name} movie={movie.movieTitle} actorName={movie.actorSelection.name} />
                    )
                })}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;