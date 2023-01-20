import Spinner from 'react-bootstrap/Spinner';

// TODO make this look nicer

function BasicExample() {
    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
        }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default BasicExample;