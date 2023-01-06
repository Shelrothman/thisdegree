import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";


function Space({ two =  true, one = false}) {
    return (
        <>
            {two && <>&emsp;&emsp;&emsp;&emsp;</>}
            {!two && <>&emsp;&emsp;</>}
            {one && <>&emsp;</>}
        </>
    )
}

function TreeNode({ id, movieTitle, previousActor, actorSelection, level, children }) {
    

// todo: when hover over the movie node, highlight its actors nodes with it in same color
// good for me to know how this gets fone for future toruble shooting
// highlight one actor node, the other actor node with same name and different character name gets highlighted with it with like a shadow or something.
// !! YO PU here... get this rendering way better looking but its getting there!!
    return (
        <li style={{ paddingLeft: `${level * 30}px` }}>
            {/* &emsp;&emsp; */}
            {/* {level > 0 && <Space />} */}
            {/* {level > 0 && <Space one={true} />} */}
            {level > 0 && <AiOutlineArrowRight size={25} />}
            {movieTitle.toUpperCase()} 
            <br />
            {level > 0 && <Space two={true} />}
            <AiOutlineArrowDown size={25} />
            <br />
            {level > 0 && <Space two={true} />}
            &emsp;<AiOutlineArrowRight size={25} />
            {previousActor.name} ({previousActor.characterName}) 
            <br />
            {level > 0 && <Space two={true} />}
            &emsp;&emsp;<AiOutlineArrowDown size={25} />
            <br />
            {level > 0 && <Space two={true} />}
            &emsp;&emsp;{actorSelection.name} ({actorSelection.characterName})
            <br />
            {level > 0 && <Space two={true} />}
            {/* {level > 0 && <Space />} */}
            &emsp;&emsp;<AiOutlineArrowDown size={25} />
            <br />
            {/* &emsp;&emsp;&emsp;<AiOutlineArrowRight size={25} /> {children} */}
            {/* <br /> */}
            {/* &emsp;&emsp;&emsp;<AiOutlineArrowRight size={25} /> */}
            {children}
        </li>
    );
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
