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
import { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { useActorContext, useGameContext } from '../contexts';


function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
    // this state for the actor that is currently being used as bridge, aka the one that is selected from currentMovies list.
    const [currentActorBridge, setCurrentActorBridge] = useState('');
    const [readyToInputFirst, setReadyToInputFirst] = useState(false);

    const {
        gameStarted,
        movieList,
        readyToBridge,
        handleNewMovieGuess,
        handleNewActorGuess
    } = useGameContext();
    const inputRef = useRef(null);

    useEffect(() => {
        console.table(movieList);
    }, [movieList]);

    function handleOnClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
    }

    function handleSubmit() {
        const userMovieGuess = inputRef.current.value;
        if (userMovieGuess) {
            handleNewMovieGuess(userMovieGuess);
            //TODO check if its a valid movie aka the actor is in it?... this should happen in GameRound
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
            setCurrentMovie(userMovieGuess);
        } else {
            throw new Error('yo! pick somthing, you smarty pants!');
        }
    }

//TODO modulate and make more dynamic
    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <h4>Movie Bridge: {movie.movieTitle}</h4>
                <select
                    aria-label="actor selection"
                    id="select-actor"
                    onChange={(e) => handleActorSelection(e.target.value)}
                    disabled={movie.actorGuessed}
                >
                    <option value='select'>Select an actor from {movie.movieTitle}</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                {movie.actorGuessed && (
                    <Card id="card-actor-container">
                        <Card.Header as="h5" id="card-actor-header">
                            {movie.movieTitle}'s Actor:
                        </Card.Header>
                        <Card.Body id="card-actor-body">
                            <Card.Text>
                                {movie.actorSelection}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
                <br />
                {(movie.actorSelection !== '') && (
                    <>
                        <label htmlFor="movie-bridge">Movie with {movie.actorSelection} in it: </label>
                        <input ref={inputRef} />
                        <button onClick={handleSubmit}>Submit</button>
                    </>
                )}
            </div>
        )
    })


    function handleActorSelection(userSelection) {
        // * there is a little bug right now where if u choose the same value as the last one then it wont return until like a render BUT this wont matter once we use data bc it will be a diff value ALWAYS. bc we will use ids and shiz
        console.log('userSelection onChange: ', userSelection);
        handleNewActorGuess(userSelection, currentMovie);
        setCurrentActorBridge(userSelection);
        return;
    }


//TODO modulate and make more dynamic

    return (
        <>
            <div>
                Actor A: {actorA}<br />Actor B: {actorB}
            </div>
            {
                gameStarted && (
                    <>
                        <div>
                            <h1>Game Started</h1>
                        </div>
                        <div>
                            <button onClick={() => handleOnClick(actorA)}>
                                {actorA}
                            </button> <br />
                            {readyToInputFirst && (
                                <>
                                    <label htmlFor="movie-bridge">Movie with {actorA} in it: </label>
                                    <input ref={inputRef} />
                                    <button onClick={handleSubmit}>Submit</button>
                                </>
                            )}
                        </div>
                        {buildBridgeNodes}
                        <div>
                            ...............
                            <br />
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
