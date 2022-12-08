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
import { useEffect, useState } from 'react';


const readyToBridge = false;
//TODO put readyToBridge into game contxt

//! not until readyToBridge is true is the actorB btn enabled and any "checking" is done
function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
    const {
        gameStarted,
        movieList,
        handleGameStateChange, //TODO use this on the start over btn
        handleNewMovieGuess,
        handleNewActorGuess
    } = useGameContext();

    function handleOnClick() {
        const userMovieGuess = prompt('enter movie bridge: ');
        if (userMovieGuess) {
            handleNewMovieGuess(userMovieGuess);
            //? check if its a valid movie aka the actor is in it

            setCurrentMovie(userMovieGuess);
        } else {
            throw new Error('yo! pick somthing, you smarty pants!')
        }

    }

    //!! PU HERE!
    // check if an actor selection has been made and disable the movie button once it has


    function handleMovieClick() {
        // !!! IF
        // && movieList[0].actorGuess
        console.log('!', movieList[0].actorGuessed)
        if (movieList[0].actorGuess) {
            alert('you already guessed an actor for this movie');
            return;
        }
        // next prompt user to select an actor name from the list of actors in that movie
        const actorSelection = prompt('select actor name from list[pretend theres a list]: ');



        if (actorSelection) {
            handleNewActorGuess(actorSelection);
        } else {
            throw new Error('yo! pick an actor, you smarty pants!')
        }
    }

    useEffect(() => {
        console.log('---------');
        console.log('onMount-scoreboard');
        console.table('movieList: ', movieList);
        console.log('---------');
    }, []);

    useEffect(() => {
        console.log('---------');
        console.log('onChange-scoreboard');
        console.log('movieList: ');
        console.table(movieList);
        console.log('---------');
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
                            <h5>Current Movie:
                                {
                                    (currentMovie !== '') && (
                                        <button onClick={handleMovieClick}>
                                            {currentMovie}
                                        </button>
                                    )
                                }
                            </h5>
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
