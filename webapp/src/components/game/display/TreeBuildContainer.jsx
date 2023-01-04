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

    useEffect(() => {
        if (readyToBuild) setActorName(currentActorBridge);
        else setActorName(actorA);
        // currentActorBridge back to ActorA only when readyToBuild is false bc the game is starting over
    }, [currentActorBridge, readyToBuild]);

    //? useMemo in here?
    useEffect(() => {
        if (currentMovieTitle) {
            setBridgeCards((prevBridgeCards) => {
                return [...prevBridgeCards,
                <MovieCard key={uuid()} movie={currentMovieTitle} actorName={actorName} />,];
            });
        }
    }, [currentMovieTitle]);

    useEffect(() => {
        if (currentMovieTitle) {
            setBridgeCards((prevBridgeCards) => {
                return [...prevBridgeCards,
                <ActorCard key={uuid()} movie={currentMovieTitle} actorName={currentActorBridge} />,];
            });
        }
    }, [currentActorBridge]);


    return (
        <Container id="tree-build-container" fluid>
            <Row>
                {bridgeCards}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;