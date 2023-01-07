
import ActorBridgeSpan from './ActorBridgeSpan';
import DiagonalArrow from '../icons/DiagonalArrow';
import CornerRight from "../icons/CornerRight";
import RoyalBridge from "../icons/RoyalBridge";
import Castle from "../icons/Castle";

// TODO: modulate this thing and get rid of the repetitive stuff
// TODO eventually each movie and actor element to be clickable or something for info photos links etc

function TreeNode({ id, movieTitle, previousActor, actorSelection, level, length, children }) {
    const even = level % 2 === 0;
    const lastNode = level === (length - 1);
    const firstNode = level === 0;

    return (
        <>
            <li style={{ paddingLeft: `${(level) * 20}px` }} className='movie-li'>
                <span className='movie-span' id={`${level}-movie-li`}>
                    <RoyalBridge />&nbsp;{movieTitle.toUpperCase()}
                </span>
            </li>
            <div style={{ paddingLeft: `${(level + .5) * 20}px` }} >
                <CornerRight level={level} />
            </div>
            <li style={{ paddingLeft: `${(level + 1.5) * 20}px` }} className='actor-bridge-li' >
                <ActorBridgeSpan identifier={even ? 'a' : 'b'} actor={previousActor} />
                {firstNode && <Castle list />}
                <br />
                <span style={{ paddingLeft: '50px' }} >
                    <RoyalBridge vertical />
                </span>
                <br />
                <ActorBridgeSpan identifier={even ? 'b' : 'a'} actor={actorSelection} />
                {lastNode && <Castle list />}
            </li>
            <div style={{ paddingLeft: `${(level + 3.5) * 20}px` }}>
                {!lastNode && <DiagonalArrow level={level} />}
            </div>
            {children}
        </>
    )
}

export default TreeNode;