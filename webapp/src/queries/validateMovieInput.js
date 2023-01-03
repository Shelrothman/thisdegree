import { gql } from "@apollo/client";

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