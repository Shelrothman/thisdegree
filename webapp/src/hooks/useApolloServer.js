import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CAST_QUERY = gql`
query getCastList($movieInput: String!) 
{
    getCastList(title: $movieInput) {
        id
        name
        character
    }
}`;

const VALIDATE_MOVIE_QUERY = gql`
query validateMovieInput($movieInput: String!, $actorInput: String!) 
{
    validateMovieInput(title: $movieInput, actor: $actorInput) {
        id
        isInMovie
        character
    }
}`;

export const useApolloGetCast = (movieInput) => {
    const { loading, data, error } = useQuery(GET_CAST_QUERY, {
        variables: {
            movieInput
        },
    });
    //? getCastList is a function that can be called to refetch the data
    return { loading, data, error };
}

export const useApolloValidateMovie = (movieInput, actorInput) => {

    // const [formState, setFormState] = useState({
    //     movieInput: '',
    //     actorInput: ''
    // });

    const { loading, data, error } = useQuery(VALIDATE_MOVIE_QUERY, {
        variables: {
            movieInput,
            actorInput
        },
    });
    return { loading, data, error };
}
