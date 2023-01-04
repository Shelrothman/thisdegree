import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


/** two presented choices to user to display each time the mode changes */
function ActorModeDecide({ selectHandler, readyHandler }) {
    return (
        <>
            <Row className="text-center">nice!</Row>
            <Row className="g-2">
                <Col>
                    <Button size="lg" className="form-controls" onClick={selectHandler}>
                        Select next Actor From Movie --`&gt;`
                    </Button>
                </Col>
                <Col>
                    OR
                </Col>
                <Col>
                    <Button size="lg" className="form-controls" onClick={readyHandler}>
                        I'm Ready To Bridge --`&gt;`
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default ActorModeDecide;