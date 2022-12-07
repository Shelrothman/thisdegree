/**
 * sample version of a running scoreboard that will be present on the screen through.. one page app.. 
 * so it will dynamically change based on the user's selections
 * and based on what they do in the game
 * GREAT time to practice context API
 * 
 * ! once game is started.. turn the actorS into cards..
 * ActorB is readOnly. (it turns to mutable once user selects they are ready to connect the bridge)
 * actorA is clickable => prompt user to enter a movie title
 * then prompt user to enter an actor name (that must be in the movie)
 * !  NO DISPLAY just logic!!!
 * check if correct :: if not.. then start over
 * if correct.. then insert a bridge and then another card below with that new actors name
 * repeat until they get to the end
 */
import { useActorContext, useGameContext } from '../contexts';

const readyToBridge = false;
//TODO put readyToBridge into game contxt

function Scoreboard() {
    const { actorA, actorB } = useActorContext();
    const { gameStarted } = useGameContext();

    function handleOnClick() {
        
    }

    return (
        <>
            <div>
                Actor A: {actorA}
                <br />
                Actor B: {actorB}
            </div>
            {
                gameStarted && (
                    <>
                        <div>
                            <h1>Game Started</h1>
                        </div>
                        <div>
                            <button 
                            onClick={handleOnClick}
                            >
                                {actorA}
                            </button>
                            {'  '}
                            <button disabled={!readyToBridge}>
                                {actorB}
                            </button>
                        </div>
                    </>
                )
            }

        </>
    );
}

export default Scoreboard;
