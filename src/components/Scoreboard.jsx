/**
 * sample version of a running scoreboard that will be present on the screen through.. one page app.. 
 * so it will dynamically change based on the user's selections
 * and based on what they do in the game
 * GREAT time to practice context API
 * 
 * ! once game is started.. turn the actorS into btns..
 * ActorB is readOnly. (it turns to mutable once user selects they are ready to connect the bridge)
 * actorA is clickable => prompt user to enter a movie title
 * then prompt user to enter an actor name (that must be in the movie)
 * !  NO DISPLAY just logic!!!
 * check if correct :: if not.. then start over
 * if correct.. then insert a bridge and then another card below with that new actors name
 * repeat until they get to the end
 */
import { useActorContext, useGameContext } from '../contexts';
import { useEffect } from 'react';



const readyToBridge = false;
//TODO put readyToBridge into game contxt

function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const {
        gameStarted,
        movieList,
        handleGameStateChange,
        handleNewGuess
    } = useGameContext();

    function handleOnClick() {
        const userMovieGuess = prompt('enter movie bridge: ');
        if (userMovieGuess) {
            handleNewGuess(userMovieGuess);
        } else {
            throw new Error('yo pick somthing, you smarty pants!')
        }
    }

    useEffect(() => {
        console.log('---------');
        console.log('onMount-scoreboard');
        console.log('movieList: ', movieList);
    }, []);

    useEffect(() => {
        console.log('---------');
        console.log('onChange-scoreboard');
        console.log('movieList: ');
        console.table(movieList);
    }, [movieList]);

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
                        <div>
                            <pre style={{
                                width: '15%',
                                backgroundColor: 'blue'
                            }}>

                            </pre>
                        </div>
                    </>
                )
            }

        </>
    );
}

export default PlayBoard;
