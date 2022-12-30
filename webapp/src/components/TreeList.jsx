import { useQuery, gql } from '@apollo/client';
import Tree from './Tree';
import Spinner from '../utils/Spinner';


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


function TreeList() {

    const { loading, data, error } = useQuery(TREE_QUERY);

    return (
        <div>
            {loading && <Spinner />}
            {data?.treeFeed.trees.map((tree) => (
                <Tree key={tree.id} tree={tree} />
            ))}
            {error && <div>Error loading trees</div>}
        </div>
    );
}

export default TreeList;