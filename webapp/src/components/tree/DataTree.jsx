
import ActorBridgeSpan from './ActorBridgeSpan';
import DiagonalArrow from '../icons/DiagonalArrow';
import CornerRight from "../icons/CornerRight";
import RoyalBridge from "../icons/RoyalBridge";
import Castle from "../icons/Castle";

// TODO: modulate this thing and get rid of the repetitive stuff
// TODO eventually each movie and actor element to be clickable or something for info photos links etc

function TreeNode({ id, movieTitle, previousActor, actorSelection, level, length, children }) {


    return (
        <>
            <li style={{ paddingLeft: `${(level) * 20}px` }} className='movie-li'>
                <span className='movie-span' id={`${level}-movie-li`}>
                    <RoyalBridge />
                    &nbsp;
                    {movieTitle.toUpperCase()}
                </span>
            </li>
            <div style={{ paddingLeft: `${(level + .5) * 20}px` }} >
                <CornerRight level={level} />
            </div>
            <li style={{ paddingLeft: `${(level + 1.5) * 20}px` }} className='actor-bridge-li' >
                <ActorBridgeSpan identifier={(level % 2 === 0) ? 'a' : 'b' } actor={previousActor} />
                {level === 0 && <Castle list />}
                <br />
                <span style={{ paddingLeft: '50px' }} >
                    <RoyalBridge vertical />
                </span>
                <br />
                <ActorBridgeSpan identifier={(level % 2 === 0) ? 'b' : 'a' } actor={actorSelection} />
                {level === (length - 1) && <Castle list />}
            </li>
            <div style={{ paddingLeft: `${(level + 3.5) * 20}px` }}>
                {level !== (length - 1) && <DiagonalArrow level={level} />}
            </div>
            {children}
        </>
    )
}


function DataTree({ treeData }) {

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
