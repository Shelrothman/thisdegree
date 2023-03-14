import Tree from './Tree';
import Spinner from '../../utils/Spinner';

import { useTreeFeed} from '../../hooks/useGQLclient';

function TreeList() {

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