import { useQuery, useMutation } from '@tanstack/react-query';
import { GraphQLClient } from "graphql-request";
// import { useNavigate } from 'react-router-dom';
import {
    AUTH_TOKEN,
    TREE_QUERY,
    SIGNUP_MUTATION,
    LOGIN_MUTATION
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

