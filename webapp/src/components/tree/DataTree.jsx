import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { BsArrow90DegRight } from "react-icons/bs";



function TreeNode({ id, movieTitle, previousActor, actorSelection, level, children }) {
    return (
        <>
            <li style={{ paddingLeft: `${(level) * 20}px` }}>
                {/* {level > 0 && <BsArrow90DegRight size={25} style={{ transform: 'rotate(180deg)' }} />} */}
                {movieTitle.toUpperCase()}
                {/* {level > 0 && <br />} */}
            </li>
            <div style={{ paddingLeft: `${(level + .5) * 20}px` }} >
                <BsArrow90DegRight size={25} style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
            </div>
            <li style={{ paddingLeft: `${(level + 1.5) * 20}px` }}>
                {previousActor.name} ({previousActor.characterName})
                <br /> 
                <span style={{ paddingLeft: '50px' }}>
                    +
                </span> 
                <br />
                {actorSelection.name} ({actorSelection.characterName})
            </li>
            <div style={{ paddingLeft: `${(level + 3.5) * 20}px` }}>
                <AiOutlineArrowDown size={25} />
            </div>
        </>
    )
}


function DataTree({ treeData }) {
    // useState for the level to increase dynamically
    // const [level, setLevel] = useState(0);

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
                        >
                            {/* If this node has children, recursively render them as well, indenting them one level farther in */}
                            {children && (
                                <DataTree
                                    treeData={children}
                                />
                            )}
                        </TreeNode>
                    )
                )}
        </ul>
    );
}

export default DataTree;
