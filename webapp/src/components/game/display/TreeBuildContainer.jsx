import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import uuid from 'react-uuid';

import { useGameContext } from "../../../contexts";
import MovieCard from "./MovieCard";


function TreeBuildContainer() {
    const {
        currentMovieTitle,
        readyToBuild,
        actorA,
        movieList
    } = useGameContext();


    const [localMovieList, setLocalMovieList] = useState(movieList);


    useEffect(() => {
        setLocalMovieList(movieList);
        // this way a new card renders at top of each round (upon new movie input)
        // when a movie is removed from the global movieList, this useEffect will trigger and set the localMovieList to the new movieList
    }, [currentMovieTitle]);
    // only want it to trigger when a new movie title is set. this way we reduce the number of times it is triggered to just the top of a round


    return (
        <Container id="tree-build-container" fluid>
            <Row>
                {localMovieList.map((movie) => {
                    return (
                        <MovieCard
                            key={uuid()}
                            lastActor={movie.previousActor.name}
                            movie={movie.movieTitle}
                            actorName={movie.actorSelection.name}
                        />
                    )
                })}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;