import { useQuery, useMutation } from '@tanstack/react-query';
import { GraphQLClient } from "graphql-request";
import {
    AUTH_TOKEN,
    TREE_QUERY,
    SIGNUP_MUTATION,
    LOGIN_MUTATION,
    VALIDATE_MOVIE_QUERY,
} from '../utils/constants';


const API_URL = 'http://localhost:4000';
const token = localStorage.getItem(AUTH_TOKEN) || null;

const graphQLClient = new GraphQLClient(API_URL, {
    //???? THIS needs help  
    headers: {
        authorization: token ? `Bearer ${token}` : "",
    }, //! cant do this without being authenticated
    // * but do we protect the movie stiff? ..I think we should bc that way keep it user specific
    // caches: new InMemoryCache() // i think rq uses this by default
});

// function useLazyQuery(key, fn, options = {}) {
//     const query = useQuery(key, fn, {
//         ...options,
//         enabled: false
//     })

//     return [query.refetch, query]
// }

export function useTreeFeed() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['treeFeed'],
        queryFn: () => graphQLClient.request(TREE_QUERY),
    });
    return { data, isLoading, error };
}

export function useLogin(email, password) {
    const variables = { email, password };

    const { mutate, isLoading, error, data } = useMutation({
        mutationKey: ['login'],
        mutationFn: () => {
            return graphQLClient.request(LOGIN_MUTATION, variables);
        },
    });

    return { mutate, isLoading, error, data };
}
// * the returned token is what we can attach to subsequent requests to authenticate the user(i.e. indicate that a request is made on behalf of that user).
export function useSignup(email, password, name) {

    const variables = { email, password, name };

    const { mutate, isLoading, error, data } = useMutation({
        mutationKey: ['signup'],
        mutationFn: () => {
            return graphQLClient.request(SIGNUP_MUTATION, variables);
        }
    });

    return { mutate, isLoading, error, data };
}

export function useValidateMovieInput(movieInput, actorInput) {
    const variables = { movieInput, actorInput };
    // const enableQuery = movieInput.includes("$%$%") || false; // symbol to indicate that the query should be enabled

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['validateMovieInput', `${movieInput}-${actorInput}`],
        queryFn: () => {
            console.log("!!! Running query !!!");
            return graphQLClient.request(VALIDATE_MOVIE_QUERY, variables).then((data) => {
                console.log("$$ data $$");
                console.log(data);
                return data;
            });
        },
        enabled: false
        // ! this is important, lets the query to be called manually
        // ? we could also say enalbed: !!movieInput and it wont execute until we have a movieInput
        // however, my form updates the movieInput as its inputted, so it will always be true 
        // to avoid this, we can use the enabled: false and call the query manually with refetch
    });
    return { data, isLoading, error, refetch, isFetching }
}


// export function useValidateMovieInput(movieInput, actorInput) {
//     // console.log("!!! Running mutation !!!")
//     const variables = { movieInput, actorInput };

//     const { data, isLoading, error, mutate } = useMutation({
//         mutationKey: ['validateMovieInput', movieInput],
//         mutationFn: () => {
//             console.log("!!! Running query !!!");
//             return graphQLClient.request(VALIDATE_MOVIE_QUERY, variables);
//         },
//     });
//     return { data, isLoading, error, mutate }
// }

export function useTestRQ(userId) {
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['testRQ', userId],
        queryFn: () => {
            console.log("!! running test query");
            // return graphQLClient.request(TREE_QUERY);
            return fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`).then((res) => {
                return res.json()
            });
        },
        enabled: false
    });
    return { data, isLoading, error, refetch };
}