import { gql } from "graphql-request";

export const AUTH_TOKEN = 'auth-token';

export const CREATE_TREE_MUTATION = gql`
mutation PostMutation(
    $treeDeclaration: String!
) {
    addTree(treeDeclaration: $treeDeclaration) {
        id
        postedBy {
            id
            name
        }
        treeDeclaration
    }
}`;

export const TREE_QUERY = gql`
{
treeFeed {
    trees {
        id
        treeDeclaration
        postedBy {
            id
            name
            email
        }
    }
        count
    }
}`;

export const VALIDATE_MOVIE_QUERY = gql`
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

export const SIGNUP_MUTATION = gql`
mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
) {
    signup(
        email: $email
        password: $password
        name: $name
    ) {
        token
    }
}`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation(
    $email: String!
    $password: String!
) {
    login(email: $email, password: $password) {
        token
    }
}`;