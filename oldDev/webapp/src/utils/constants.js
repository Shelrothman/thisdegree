import { gql } from "graphql-request";

export const AUTH_TOKEN = 'auth-token';

export const CREATE_TREE_MUTATION = gql`
mutation PostTreeMutation(
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
        officialTitle
        cast {
            character
            id
            name
        }
    }
}`;

export const CHALLENGE_VALIDATION_QUERY = gql`
query challengeMovieValidation($id: ID!, $officialTitle: String, $originalInput: String!, $reason: String!)
{
    challengeMovieValidation(id: $id, officialTitle: $officialTitle, originalInput: $originalInput, reason: $reason) {
        id
        originalValidation {
            id
            officialTitle
            originalInput
        }
        results
        otherOptions {
            title
        }
        continuationToken {
            page
            total_pages
            total_results
        }
    }
}`;

// if i wanted to implement this with a challengeItem object, using GQLclient it would look like this:
//
// export function useChallengeValidation(challengeItem) {
//     const variables = { challengeItem };
//     const { data, isLoading, error, refetch, isFetching } = useQuery({
//         queryKey: ['challengeValidation', `${challengeItem.id}`],
//         queryFn: () => {
//             console.log("!!! Running query !!!");
//             return graphQLClient.request(CHALLENGE_VALIDATION_QUERY, variables)
//                 .then((data) => {

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
