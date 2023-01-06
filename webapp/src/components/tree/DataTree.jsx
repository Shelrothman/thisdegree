// import { useEffect } from "react";
// import { useState } from "react";
import { BsArrow90DegRight, BsArrowDown } from "react-icons/bs";


// function - a modular function so that TreeNode is not so repetitive


function TreeNode({ id, movieTitle, previousActor, actorSelection, level, children }) {
    return (
        <>
            <li style={{ paddingLeft: `${(level) * 20}px` }}>
                <span className='movie-li' id={`${level}-movie-li`}>
                    {movieTitle.toUpperCase()}
                </span>
            </li>
            <div style={{ paddingLeft: `${(level + .5) * 20}px` }} >
                <BsArrow90DegRight size={25} style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
            </div>
            <li style={{ paddingLeft: `${(level + 1.5) * 20}px` }} >
                <span className={(level % 2 === 0) ? 'actors-li-a' : 'actors-li-b' }>
                    {previousActor.name} ({previousActor.characterName})
                    <br />
                </span>
                <span style={{ paddingLeft: '50px' }}>+</span>
                <br />
                <span className={(level % 2 === 0) ? 'actors-li-b' : 'actors-li-a' }>
                    {actorSelection.name} ({actorSelection.characterName})
                </span>
            </li>
            <div style={{ paddingLeft: `${(level + 3.5) * 20}px` }}>
                <BsArrowDown size={30} />
            </div>
            {children}
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
                //TODO maybe just remove the logic that adds them over in GameContext
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
