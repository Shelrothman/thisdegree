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
    // this state for the actor that is currently being used as bridge, aka the one that is selected from currentMovies list.
    const [currentActorBridge, setCurrentActorBridge] = useState('');

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
            //TODO check if its a valid movie aka the actor is in it?
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
            setCurrentMovie(userMovieGuess);
        } else {
            throw new Error('yo! pick somthing, you smarty pants!');
        }
    }

    // selecting an actor right now is just replacing the actorSelection in the first movie instead of adding it to the next movie.actorSelection in the list which is what we want
    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <h4>Movie Bridge: {movie.movieTitle}</h4>
                <select
                    aria-label="actor selection"
                    id="select-actor"
                    onChange={(e) => handleActorSelection(e.target.value)}
                >
                    <option value='select'>Select an actor from {movie.movieTitle}</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <br />
                {movie.actorGuessed && (
                    <button onClick={handleOnClick}>
                        {movie.movieTitle}'s Actor: {currentActorBridge}
                    </button>
                )}
            </div>
        )
    })


    function handleActorSelection(userSelection) {
        console.log('userSelection onChange: ', userSelection);

        handleNewActorGuess(userSelection, currentMovie);
        setCurrentActorBridge(userSelection);
    }


    function handleMovieClick() {
        // ! maybe now i shoyld start to work on displaying this at least simply so that dont confuse myself and waste time
        // console.log('!', movieList[0].actorGuessed) // debug
        if (movieList[0].actorGuessed) {
            alert('you already guessed an actor for this movie');
            // return;
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
                        </div>
                        <div>
                            <button onClick={handleOnClick}>
                                {actorA}
                            </button>
                        </div>
                        {/* TODO: obvs clean this the fuck up... return it cleaner in its own function and stuff but for now just do... this should dynamically work like infinitely */}
                        {buildBridgeNodes}

                        <div>
                            ...............
                        </div>
                        <div>
                            .....................
                            <br />
                            .....................
                            <br />
                            .....................
                            <br />
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

export default PlayBoard;
