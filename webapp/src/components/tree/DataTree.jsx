import { useState } from "react";

const TreeNode = ({ movieTitle, previousActor, actorSelection, level }) => (
    <li style={{ paddingLeft: `${level * 20}px` }}>
        {movieTitle} - {previousActor.name} ({previousActor.characterName}) --&gt;{" "}
        {actorSelection.name} ({actorSelection.characterName})
        <ul>
            {/* The children nodes of this tree node will be added here */}
        </ul>
    </li>
);

const DataTree = ({ treeData, level = 0 }) => (
    <ul>
        {treeData
        // filter out any nodes that dont have a movieTitle property
        .filter(({ movieTitle }) => movieTitle)
        .map(
            ({
                id,
                movieTitle,
                previousActor,
                actorSelection,
                children
            }) => (
                <TreeNode
                    key={id}
                    movieTitle={movieTitle}
                    previousActor={previousActor}
                    actorSelection={actorSelection}
                    level={level}
                >
                    {/* If this node has children, recursively render them as well, indenting them one level farther in */}
                    {children && (
                        <DataTree
                            treeData={children}
                            level={prevLevel => prevLevel + 1}
                        />
                    )}
                </TreeNode>
            )
        )}
    </ul>
);

export default DataTree;
