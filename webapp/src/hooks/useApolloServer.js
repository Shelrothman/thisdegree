import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';




const useApolloServer = (movieInput) => {

    const GET_CAST_QUERY = gql`
query getCastList($movieInput: String!) 
{
    getCastList(title: $movieInput) {
        id
        name
        character
    }
}`;

    const { loading, data, error } = useQuery(GET_CAST_QUERY, {
        variables: { 
            movieInput 
        },
    });

    // useEffect(() => {
    //     getCast();
    // }, []); // this is the same as componentDidMount

    return { loading, data, error };


}

export default useApolloServer;