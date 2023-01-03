
import Container from "react-bootstrap/Container";
import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";


//TODO: while movie is being entered by user, disable the actor form
// and while actor is being entered by user, disable the movie form
//? properties from context to affect that: movieTime, actorTime??

function FormContainer() {

    return (
        <Container id="main-form-container">
            <MovieForm />
            <ActorForm  />
        </Container>
    );
}

export default FormContainer;