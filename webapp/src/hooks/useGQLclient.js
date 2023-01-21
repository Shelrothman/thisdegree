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

function useLazyQuery(key, fn, options = {}) {
    const query = useQuery(key, fn, {
        ...options,
        enabled: false
    })

    return [query.refetch, query]
}

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

// i can just make a useSetup that like is always enabled so that it can save the title but not fetch it...

// export function useSetup(movieInput) {
//     let readyVal;
//     const { data, isLoading, error } = useQuery({
//         queryKey: ['setup'],
//         queryFn: () => console.log(" running setup query"),
//     });
//     if (data) {
//         readyVal = data.treeFeed.find((movie) => movie.title === movieInput);
//     return { data, isLoading, error };
// }

export function useValidateMovieInput(movieInput, actorInput) {
    // console.log("!!! Running mutation !!!")
    const variables = { movieInput, actorInput };

    const { data, isInitialLoading, refetch } = useQuery({
        queryKey: ['validateMovieInput', movieInput],
        queryFn: () => {
            console.log("!!! Running query !!!");
            return graphQLClient.request(VALIDATE_MOVIE_QUERY, variables);
        },
        enabled: !!movieInput, // disable the query if filter is empty
        // ! this is important, lets the query to be called manually
        // enabled: false
        // why is it still running all the time when i change the input..   
    });
    return { data, isInitialLoading, refetch };
}