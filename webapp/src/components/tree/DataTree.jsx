// import { useEffect } from "react";
// import { useState } from "react";
// import { BsArrow90DegRight, BsArrowDown, BsArrowDownRightSquareFill } from "react-icons/bs";
import { GiBroadheadArrow, GiRialtoBridge, GiCastle, GiBottomRight3DArrow } from "react-icons/gi";
// function - a modular function so that TreeNode is not so repetitive
import { TbCornerRightUpDouble, TbChevronsDownRight } from 'react-icons/tb'
// import { FcDownRight } from "react-icons/fc";
import { CgArrowTopRightR, CgArrowsExpandDownRight } from "react-icons/cg";

// TODO: modulate this thing and get rid of the repetitive stuff
function TreeNode({ id, movieTitle, previousActor, actorSelection, level, length, children }) {

    // *** lets try to do it with real data first ***

    return (
        <>
            <li style={{ paddingLeft: `${(level) * 20}px` }}>
                <span className='movie-li' id={`${level}-movie-li`}>
                    <GiRialtoBridge size={33} />&nbsp;
                    {movieTitle.toUpperCase()}
                </span>
            </li>
            <div style={{ paddingLeft: `${(level + .5) * 20}px` }} >
                <TbCornerRightUpDouble
                    className='bridge-li'
                    size={35}
                    style={{
                        transform: 'rotate(90deg)',
                        margin: '5px',
                        borderRadius: '18%',
                        backgroundColor: (level % 2 === 0) ? 'rgb(141, 66, 245)' : 'rgb(38, 140, 121)',
                    }}
                />
            </div>
            <li style={{ paddingLeft: `${(level + 1.5) * 20}px` }} className='actor-bridge-li' >
                <span className={(level % 2 === 0) ? 'actors-li-a' : 'actors-li-b'}>
                    <strong>{previousActor.name}</strong> ({previousActor.characterName})
                </span>
                {level === 0 && <GiCastle
                    className='castle-li'
                    size={35}
                    style={{borderRadius: '20%', padding: '1px' }}
                />}
                <br />
                <span style={{ paddingLeft: '50px' }} >
                    <GiRialtoBridge
                        size={45}
                        className='bridge-castle-li'
                        style={{
                            transform: 'rotate(90deg)',
                            marginTop: '5px',
                            marginBottom: '10px',
                            backgroundColor: 'rgb(69, 40, 3)',
                            borderRadius: '18%',
                        }}
                    />
                </span>
                <br />
                <span className={(level % 2 === 0) ? 'actors-li-b' : 'actors-li-a'}>
                    <strong>{actorSelection.name}</strong> ({actorSelection.characterName})
                </span>
                {level === (length - 1) && <GiCastle
                    className='castle-li'
                    size={35}
                    style={{borderRadius: '20%', padding: '1px' }}
                />}
            </li>
            <div style={{ paddingLeft: `${(level + 3.5) * 20}px` }}>
                {level !== (length - 1) && <CgArrowsExpandDownRight
                    className='arrow-li' size={28}
                    style={{
                        // transform: 'rotate(180deg)',
                        transform: 'rotate(90deg)',
                        marginBottom: '15x',
                        borderRadius: '18%',
                        backgroundColor: (level % 2 === 0) ? 'rgb(38, 140, 121)' : 'rgb(141, 66, 245)',
                    }}
                />}
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
                            length={treeData.length}
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
