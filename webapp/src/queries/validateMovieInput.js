
import { gql } from "@apollo/client";

// ! pretty sure you can delete this whole file and this whole folder


const VALIDATE_MOVIE_QUERY = gql`
query validateMovieInput($movieInput: String!, $actorInput: String!) 
{
    validateMovieInput(title: $movieInput, actor: $actorInput) {
        id
        isInMovie
        character
        cast {
            character
            id
            name
        }
    }
}`;

export default VALIDATE_MOVIE_QUERY;