import { useQuery, gql } from '@apollo/client';
import Tree from './Tree';

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

    const { data } = useQuery(TREE_QUERY);

    return (
        <div>
            {data?.treeFeed.trees.map((tree) => (
                <Tree key={tree.id} tree={tree} />
            ))}
        </div>
    );
}

export default TreeList;