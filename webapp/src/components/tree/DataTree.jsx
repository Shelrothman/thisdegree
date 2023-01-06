import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";


function TreeNode({ id, movieTitle, previousActor, actorSelection, level, children }) {
    // setLevel(prevLevel => prevLevel + 1);
    // const nextLevel = level + 1;
    // setLevel(nextLevel);
    // const [level, setLevel] = useState(0);

// make level increase on each <li> node

    

// todo: when hover over the movie node, highlight its actors nodes with it in same color
// good for me to know how this gets fone for future toruble shooting
// highlight one actor node, the other actor node with same name and different character name gets highlighted with it with like a shadow or something.

    return (
        <li style={{ paddingLeft: `${level * 10}px` }}>
            
            {movieTitle.toUpperCase()} 
            <br />
            <AiOutlineArrowDown size={25} />
            <br />
            &emsp;{previousActor.name} ({previousActor.characterName}) 
            <br />
            &emsp;<AiOutlineArrowDown size={25} />
            <br />
            &emsp;{actorSelection.name} ({actorSelection.characterName})
            <br />
            &emsp;<AiOutlineArrowDown size={25} />
            {children}
        </li>
    );
}


function DataTree({ treeData }) {
    // useState for the level to increase dynamically
    const [level, setLevel] = useState(0);

    return (
        <ul>
            {treeData
                // filter out any nodes that don't have a movieTitle property (FOR NOW__ MAYBE WE CHANGE)
                .filter(({ movieTitle }) => movieTitle)
                .map(
                    ({ id, movieTitle, previousActor, actorSelection, children }, index) => (
                        <TreeNode
                            key={id}
                            movieTitle={movieTitle}
                            previousActor={previousActor}
                            actorSelection={actorSelection}
                            level={index}
                            // level={index > 0 ? setLevel(prevLevel => prevLevel + 1) : level}
                        >
                            {/* If this node has children, recursively render them as well, indenting them one level farther in */}
                            {children && (
                                <DataTree
                                    treeData={children}
                                // level={setLevel(prevLevel => prevLevel + 1)}
                                />
                            )}
                        </TreeNode>
                    )
                )}
        </ul>
    );
}

export default DataTree;
