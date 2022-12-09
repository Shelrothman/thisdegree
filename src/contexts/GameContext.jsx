/**
 *         setMovieList((prev) => {
            return [...prev, localMovieObj];
        });
 * in here we want to keep track of the current game
 * what states are we going to need?
 * gameStarted: boolean (true if the game has started, false if it hasn't || its over)
 * movieList: array (list of movies {}s holding movie title and which actor used from it)
 *   - we want this for the display at the end the node tree thang
 * TODO: eventually use redux for this once it gets bigger
 */
import { useState, useContext, createContext } from 'react';
// import { useActorContext } from './ActorContext.jsx';
//! not until readyToBridge is true is the actorB btn enabled and any "checking" is done

const GameContext = createContext();

const GUESS_STATES = {
    guessed: 'guessed',
    notGuessed: 'not guessed'
};

export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [movieList, setMovieList] = useState([]);


    const handleGameStateChange = () => {
        // use this to change the game on and off
        // dont use this for when a game wins
        setGameStarted((prev) => !prev);
        if (!gameStarted) {
            // if the game is starting/restarting, then set the movie list to an empty array
            //* movieList locally (not the global list OBviously)
            setMovieList([]);
        }
    };



    const handleNewMovieGuess = (userMovieInput) => {
        // add the movie guess to first element of array and then add the movie on ihn the setMovieList to that array
        let localMovieList = movieList || [];

        localMovieList.push({ movieTitle: userMovieInput, actorGuessed: false, actorSelection: '' });
        return setMovieList(localMovieList);
    }


    //* wait we want them to be able to recieve a list of the actors inthat particular movie... and then they get to select from that list to put it on the card.. if they reselect thats okay it will jsut change the button dyanmically


    // TODO needs constraining
    const handleNewActorGuess = (userActorInput, movie) => {
        let localMovieList = movieList;

        localMovieList.forEach((movieObj) => {
            if (movieObj.movieTitle === movie) {
                movieObj.actorGuessed = true;
                movieObj.actorSelection = userActorInput;
            }
        });
        // console.log("localMovieList", localMovieList); // debug
        return setMovieList(localMovieList);
    }



    return (
        <GameContext.Provider value={{
            gameStarted,
            movieList,
            handleGameStateChange,
            handleNewMovieGuess,
            handleNewActorGuess
        }}>
            {children}
        </GameContext.Provider>
    );
}