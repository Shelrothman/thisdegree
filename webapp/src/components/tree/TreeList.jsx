import Tree from './Tree';
import Spinner from '../../utils/Spinner';

import { useTreeFeed} from '../../hooks/useQueryGQL';

// const endpoint = 'http://localhost:4000';
// const graphQLClient = new GraphQLClient(endpoint, {
//     headers: {
//         authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTZlZGJiMC1iMDg2LTQyMDgtOTYwYi0yOTBhYmJjZjkzMTQiLCJpYXQiOjE2NzE2NDE4MDN9.z3P8HRQM1oORsoFZn7BVFFtI8g6qWNXSecYLQQuypYc',
//     },
// })
// const TREE_QUERY = gql`
// {
// treeFeed {
//     trees {
//         id
//         treeDeclaration
//         postedBy {
//             id
//             name
//             email
//         }
//     }
//         count
//     }
// }`;


function TreeList() {
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['treeFeed'],
    //     queryFn: () => graphQLClient.request(TREE_QUERY),
    // });

    const { data, isLoading, error } = useTreeFeed();

    return (
        <div>
            {isLoading && <Spinner />}
            {data?.treeFeed.trees.map((tree) => (
                <Tree key={tree.id} tree={tree} />
            ))}
            {error && <div>Error loading trees</div>}
        </div>
    );
}

export default TreeList;