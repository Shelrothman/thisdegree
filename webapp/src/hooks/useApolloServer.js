import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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

const useApolloValidate = () => {

    const [formState, setFormState] = useState({
        movieInput: '',
        actorInput: '',
    });

    const [validateMovieInput, { loading, error, data }] = useQuery(VALIDATE_MOVIE_QUERY, {
        variables: { 
            movieInput: formState.movieInput, 
            actorInput: formState.actorInput
        },
    });

    return {
        formState,
        setFormState,
        validateMovieInput,
        loading,
        error,
        data,
    };
};

export default useApolloValidate;