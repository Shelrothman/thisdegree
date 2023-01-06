import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { BsArrow90DegRight } from "react-icons/bs";


// function TreeNode({ id, movieTitle, previousActor, actorSelection, level, children }) {


//     // todo: when hover over the movie node, highlight its actors nodes with it in same color
//     // good for me to know how this gets fone for future toruble shooting.. i am building it it yay
//     // highlight one actor node, the other actor node with same name and different character name gets highlighted with it with like a shadow or something.
//     // !! YO PU here... get this rendering way better looking but its getting there!!
//     return (
//         <li style={{ paddingLeft: `${level * 30}px` }}>
//             {[...Array(level > 0 ? level + (level * 2) + level : level )].map((e, i) => <span className="spacing" key={i}>&emsp;</span>)}
//             {movieTitle.toUpperCase()}
//             <br />
//             {[...Array(level > 0 ? level + (level * 2) : level + 1)].map((e, i) => <span className="spacing" key={i}>&emsp;</span>)}
//             <BsArrow90DegRight size={25} style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
//             <br />
//             {[...Array(level > 0 ? level + (level + 5) : level + 2)].map((e, i) => <span className="spacing" key={i}>&emsp;</span>)}
//             {previousActor.name} ({previousActor.characterName})
//             <br />
//             <br />
//             {[...Array(level > 0 ? level + (level + 5) : level + 2)].map((e, i) => <span className="spacing" key={i}>&emsp;</span>)}
//             {actorSelection.name} ({actorSelection.characterName})
//             <br />
//             {[...Array(level > 0 ? level + (level + 7) : level + 3)].map((e, i) => <span className="spacing" key={i}>&emsp;</span>)}
//             <BsArrow90DegRight size={25} style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
//             <br />
//             {children}
//         </li>
//     );
// }


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
            <li style={{ paddingLeft: `${(level + 1) * 30}px` }}>
                {previousActor.name} ({previousActor.characterName})
                <br /> 
                <span style={{ paddingLeft: '50px' }}>
                    +
                </span> 
                <br />
                {actorSelection.name} ({actorSelection.characterName})
            </li>
            <div style={{ paddingLeft: `${(level + 2) * 30}px` }}>
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
