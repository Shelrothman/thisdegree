import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

function GameAlert({text, visible, setVisible}) {
    // const [show, setShow] = useState(visible);


    if (visible) {
        return (
            <Alert variant="danger" 
            onClose={() => setVisible(false)} 
            dismissible>
                <Alert.Heading>
                    {text}
                </Alert.Heading>
                {/* <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p> */}
            </Alert>
        );
    } 
}

export default GameAlert;