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
import {
    useState,
    useContext,
    createContext,
    // useEffect
} from 'react';
import { useActorContext } from './ActorContext.jsx';
import GameRound from '../models/GameRound.js';

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
    // const [newRound, setNewRound] = useState(false);
    const { actorA } = useActorContext();

    const [readyToBridge, setReadyToBridge] = useState(false);
    // TODO: will use setReadyToBridge to enable the actorB btn once the button is triggered by user



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


    async function handleNewMovieGuess(userActor, userMovieInput) {
        try {
            let gameRound = new GameRound(userActor, userMovieInput);
            gameRound = gameRound.init();
            let valid = await gameRound.verifyMovie();
            console.log('gameRound', gameRound);
            if (!valid) { // get out of here, pick a new movie!
                return { verified: false };
            }
            let localMovieList = movieList || [];
            // add the movie guess to the end of array 
            localMovieList.push({
                movieTitle: userMovieInput,
                actorGuessed: false,
                actorSelection: ''
            });
            setMovieList(localMovieList);
            return {
                verified: true,
                actorList: gameRound.actorList
            };
        } catch (error) {
            console.error(error);
        }


    }


    // TODO needs more constraining
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
            handleNewActorGuess,
            readyToBridge,
        }}>
            {children}
        </GameContext.Provider>
    );
}