import { useQuery, gql } from '@apollo/client';
import Tree from './Tree';
import Spinner from './Spinner';


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
        </div>
    );
}

export default TreeList;