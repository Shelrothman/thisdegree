import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import uuid from 'react-uuid';

// import Col from "react-bootstrap/Col";
// import Card from 'react-bootstrap/Card';
import { useGameContext } from "../../../contexts";
import ActorCard from "./ActorCard";
import MovieCard from "./MovieCard";

// nice bc they stay in order even when vp changes

function TreeBuildContainer() {
    const {
        currentMovieTitle,
        currentActorBridge,
        readyToBuild,
        actorA
    } = useGameContext();


    const [bridgeCards, setBridgeCards] = useState([]);
    const [ actorName, setActorName ] = useState(readyToBuild ? currentActorBridge : actorA);

    useEffect(() => {
        if (readyToBuild) setActorName(currentActorBridge);
        else setActorName(actorA);
        // currentActorBridge back to ActorA only when readyToBuild is false bc the game is starting over
    }, [currentActorBridge, readyToBuild]);


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


    // useEffect(() => {
    //     if (currentMovieTitle) {
    //         setMovieCards((prevMovieCards) => {
    //             return [...prevMovieCards, <MovieCard key={uuid()} movie={currentMovieTitle} />];
    //         });
    //     }

    // }, [currentMovieTitle, currentActorBridge]);

    // useEffect(() => {
    //     if (currentActorBridge) {
    //         setActorCards((prevActorCards) => {
    //             return [...prevActorCards, <ActorCard key={uuid()} movie={currentMovieTitle} actorName={currentActorBridge} />];
    //         });
    //     }
    // }, [currentActorBridge]);

    // !!!! YOU ARE VERY CLOSE TO FIGURING THIS OUT -- PU HERE
    // return right here and just see what it does right now and  just need tit to be like the every other shi
    // make it so that a new ActorCard is created every time a new actor is selected
    // and a new MovieCard is created every time a new movie is selected
    // when the new ones come in, the old ones stay in place


    return (
        <Container id="tree-build-container" fluid>
            <Row>
                {bridgeCards}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;