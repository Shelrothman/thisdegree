import Spinner from 'react-bootstrap/Spinner';

// TODO make this look nicer

function BasicExample() {
    return (
        <div style={{
            position: 'absolute', 
            left: '25%', 
            right: '25%',
            top: '50%',
        }}>
            <Spinner animation="border" role="status" style={{
                width: "20rem", height: "20rem",
            }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default BasicExample;