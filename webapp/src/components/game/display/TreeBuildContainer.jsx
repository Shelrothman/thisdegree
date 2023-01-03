import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Card from 'react-bootstrap/Card';
import ActorCard from "./ActorCard";
import MovieCard from "./MovieCard";

// nice bc they stay in order even when vp changes

function TreeBuildContainer() {
    return (
        <Container id="tree-build-container">
            <Row>
                
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <MovieCard movie="The Matrix" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                {/* <MovieCard movie="The Matrix" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <MovieCard movie="The Matrix" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" />
                <ActorCard movie="The Matrix" actorName="Keanu Reeves" /> */}
            </Row>
        </Container>
    );
}

export default TreeBuildContainer;