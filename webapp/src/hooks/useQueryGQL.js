import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from "graphql-request";
import { AUTH_TOKEN } from '../utils/constants';

const API_URL = 'http://localhost:4000';

const token = localStorage.getItem(AUTH_TOKEN) || null;

const graphQLClient = new GraphQLClient(API_URL, {
    //???? THIS needs help  
    headers: {
        authorization: token ? `Bearer ${token}` : "",
    },
    // caches: new InMemoryCache() // i think rq uses this by default
}); 


const TREE_QUERY = gql`
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

export function useTreeFeed() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['treeFeed'],
        queryFn: () => graphQLClient.request(TREE_QUERY),
    });
    return { data, isLoading, error };
}

// export function useGetPost(postId) {
//     return useQuery(["get-post", postId], async () => {
//         const { getPost } = await graphQLClient.request(
//             gql`
//         query getPost($postId: ID!) {
//           getPost(_id: $postId) {
//             _id
//             content
//             description
//             title
//           }
//         }
//       `,
//             { postId }
//         );
//         return getPost;
//     });
// }