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
// import uuid from 'react-uuid';


function PlayBoard() {
    const { actorA, actorB } = useActorContext();
    const [currentMovie, setCurrentMovie] = useState('');
    // this state for the actor that is currently being used as bridge, aka the one that is selected from currentMovies list.
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    const [readyToInputFirst, setReadyToInputFirst] = useState(false);

    const [currentActorOptions, setCurrentActorOptions] = useState([]);

    // only want the input ref to be refed when it is in the current round.. once its above where we are we dont care about it anymore.. so therefore the LAST input should always be the inputRef.


    // ! thie bug right now IS deff something in the ui and not the logic in the other files bc i stepped through and comfirmed that.
    // TODO add better error handling in the c;ass and elsewheere so int wont take so much ime to track down next time
    //! yea on save the return of the next select happens but not wuithpuot me asaving this file... SOOOO that means i am like not returning somewhere orn siomnething like that ************************************************************************************



    const {
        gameStarted,
        movieList,
        readyToBridge,
        handleNewMovieGuess,
        handleNewActorGuess
    } = useGameContext();
    const inputRef = useRef(null);
    const selectItemsRef = useRef(null);

    function getMap() {
        if (!selectItemsRef.current) {
            // Initialize the Map on first usage.
            selectItemsRef.current = new Map();
        }
        console.log('selectItemsRef.current', selectItemsRef.current)
        return selectItemsRef.current;
    }

    useEffect(() => {
        console.table(movieList);
    }, [movieList]);

    function handleOnClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
        return;
    }

    async function handleSubmit() {
        const userMovieGuess = inputRef.current.value;
        if (userMovieGuess) {
            const movieEvaluation = await handleNewMovieGuess(currentActorBridge, userMovieGuess);
            console.log('movieEvaluation', movieEvaluation)
            if (!movieEvaluation.verified) {
                handleInvalidMovieGuess();
            }
            //* dont let the movie get chosen IF its not a vlaid movie with the actor in i9t
            setCurrentMovie(userMovieGuess);
            setCurrentActorOptions(movieEvaluation.actorList);
            return;
        } else {
            throw new Error('yo! pick somthing, you smarty pants!');
        }
    }

    function handleInvalidMovieGuess() {
        console.log('invalid movie selection');
        inputRef.current.value = `INVALID MOVIE`;
        // TODO: tell the user its wrong in a different way then above.. this is just a hack for now
        setTimeout(() => {
            inputRef.current.value = '';
        }, 1000);
        return;
    }

    const actorOptions = currentActorOptions?.map((actor, i) => {
        return (
            <option key={i} value={actor.name}>{actor.name}</option>
        )
    });

    //TODO modulate and make more dynamic
    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <h4>Movie Bridge: {movie.movieTitle}</h4>
                <select
                    aria-label="actor selection"
                    id={`select-actor-${i}`}
                    // ref={selectRef} 
                    //// onChange={(e) => handleActorSelection(e.target.value)}
                    onChange={handleActorSelection}
                    //! something is off here.. like currentActorBridge is not being set to the value of the select.. so it wont render until the second time a change it.. or if i save this file.
                    disabled={movie.actorGuessed}
                    ref={(node) => {
                        const map = getMap();
                        if (node) {
                            map.set(movie.id, node); 
                        } else {
                            map.delete(movie.id);
                        }
                    }}
                >
                    <option value='select'>Select an actor from {movie.movieTitle}</option>
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="Joe Pesci">Three</option> */}
                    {actorOptions}
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
                        <input ref={inputRef} id='movie-input-ref' />
                        <button onClick={handleSubmit}>Submit</button>
                    </>
                )}
            </div>
        )
    })


    async function handleActorSelection() {
        const map = getMap();
    // const node = map.get(currentMovie.id); ?????
        // const node = map.get(currentMovie.id);
        // we want to get the value of the select that is in the current movie.. the last element of the movieListArray is the current movie
        // const userSelection = node.value;
        let currentMovie = movieList[movieList.length - 1];
        console.log('currentMovie: ', currentMovie)
        
        const node = map.get(currentMovie.id);
        console.log('node: ', node.value);



        const userSelection = node.value;
        console.log('userSelection onChange: ', userSelection);
        setCurrentActorBridge(userSelection);
        let res = await handleNewActorGuess(userSelection, currentMovie);
        return res;
    }

    //TODO modulate and make more dynamic

    return (
        <>
            <div>
                Actor A: {actorA}<br />Actor B: {actorB}
            </div>
            {gameStarted && (
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
            )}
        </>
    );
}

export default PlayBoard;