import { useState, useEffect } from "react";
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
        actorA
    } = useGameContext();

    const [bridgeCards, setBridgeCards] = useState([]);
    const [actorName, setActorName] = useState(readyToBuild ? currentActorBridge : actorA);
    const [movieName, setMovieName] = useState(currentMovieTitle);


    useEffect(() => {
        if (readyToBuild) setActorName(currentActorBridge);
        else setActorName(actorA);
        // currentActorBridge back to ActorA only when readyToBuild is false bc the game is starting over
    }, [currentActorBridge, readyToBuild]);

    useEffect(() => {
        setMovieName(currentMovieTitle);
    }, [currentMovieTitle]);


    //!!!! RETURN HERE !!!~~~~!!!!!!!!!!!!!!!!!!!!!!!
    // the form and its text is UPDATING based on going back / undo
    // BUT the bridgeCards are not updating... they just keep rendering and rendering...
    //? useMemo in here?
    useEffect(() => {
        if (readyToBuild) {
            setBridgeCards((prevBridgeCards) => {
                return [...prevBridgeCards,
                <MovieCard key={uuid()} movie={movieName} actorName={actorName} />,];
            });
        }
    }, [movieName]);
    // ? should these useEffects be refactored?
    useEffect(() => {
        if (readyToBuild) {
            setBridgeCards((prevBridgeCards) => {
                return [...prevBridgeCards,
                <ActorCard key={uuid()} movie={movieName} actorName={actorName} />,];
            });
        }
    }, [actorName]);


    return (
        <Container id="tree-build-container" fluid>
            <Row>
                {bridgeCards}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;