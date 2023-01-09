import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


/** two presented choices to user to display each time the mode changes */
function ActorModeDecide({ selectHandler, readyHandler, movieTitle }) {
    
    
    const goodItems = ['nice', 'woot', 'oh yea', 'wahoo', 'keep it up', 'way to go', 'you rock', 'you\'re awesome'];
    
    return (
        <>
            <Row className="nice-job">
                <h2>
                    {/* generate a random saying on each render */}
                    {goodItems[Math.floor(Math.random() * goodItems.length)]}!
                </h2>
            </Row>
            <br />
            <Row className="g-2">
                <Col md={5}>
                    <Button className="degreeBtn" onClick={selectHandler}>
                        Select next Actor From {movieTitle.toUpperCase()} --&gt;
                    </Button>
                </Col>
                <Col md={2}>
                    OR
                </Col>
                <Col md={5}>
                    <Button className="degreeBtn" onClick={readyHandler}>
                        I'm Ready To Bridge --&gt;
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default ActorModeDecide;