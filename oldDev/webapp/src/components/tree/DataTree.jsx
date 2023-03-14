import TreeNode from './TreeNode';

function DataTree({ treeData }) {

    return (
        <ul>
            {treeData.map(
                ({ id, movieTitle, previousActor, actorSelection, children }, index) => (
                    <TreeNode
                        key={id}
                        movieTitle={movieTitle}
                        previousActor={previousActor}
                        actorSelection={actorSelection}
                        level={index}
                        length={treeData.length}
                    >
                        {children && (
                            <DataTree
                                treeData={children}
                            />
                        )}
                    </TreeNode>
                ))}
        </ul>
    );
}

export default DataTree;
