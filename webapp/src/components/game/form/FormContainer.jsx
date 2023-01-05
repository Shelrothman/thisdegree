import Container from "react-bootstrap/Container";
import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";



function FormContainer() {

    return (
        <Container id="main-form-container">
            <MovieForm />
            <ActorForm  />
        </Container>
    );
}

export default FormContainer;