/**
 * in here we want to keep track of the current game
 * what states are we going to need?
 * gameStarted: boolean (true if the game has started, false if it hasn't || its over)
 * movieList: array (list of movies {}s holding movie title and which actor used from it)
 *   - we want this for the display at the end the node tree thang
 * TODO: eventually use redux for this once it gets bigger
 */
import { useState, useContext, createContext } from 'react';
// import { useActorContext } from './ActorContext.jsx';

const GameContext = createContext();

export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [movieList, setMovieList] = useState([]);


    const handleGameChange = () => {
        // use this to change the game on and off
        // dont use this for when a game wins
        setGameStarted((prev) => !prev);
        if (!gameStarted) {
            // if the game is starting/restarting, then set the movie list to an empty array
            //* movieList locally (not the global list OBviously)
            setMovieList([]);
        }
    };

    // !!! PICK UP HERE
    const handleNewGuess = (movie) => {
        // add the movie guess to first element of array and then add the movie on ihn the setMovieList to that array
        // when handle the next guess.. then will first need to make copy of currrent movieList and then add to that copy the next Guess
        let localMovieList = [
            { movieTitle: movie, actorGuess: '',  }
        ];

    }



    return (
        <GameContext.Provider value={{ gameStarted, movieList, handleGameChange }}>
            {children}
        </GameContext.Provider>
    );
}