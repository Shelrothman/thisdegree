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
// import { useActorContext } from './ActorContext.jsx';
import GameRound from '../models/GameRound.js';

// import { useActorContext } from './ActorContext.jsx';
//! not until readyToBridge is true is the actorB btn enabled and any "checking" is done

// TODO eventually we send the final movieList array to the createTree backend route

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
    // const { actorA } = useActorContext();

    const [readyToBridge, setReadyToBridge] = useState(false);
    // TODO: will use setReadyToBridge to enable the actorB btn once the button is triggered by user



    const handleGameStateChange = () => {
        // use this to change the game on and off
        // dont use this for when a game wins
        setGameStarted((prev) => !prev);
        setMovieList([]);
        // if (!gameStarted) {
        //     // if the game is starting/restarting, then set the movie list to an empty array
        //     setMovieList([]);
        // }
    };

    // TODO: MODULARIZE THIS FUNCTION ,,,
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
                id: gameRound.movieUUID,
                actorGuessed: false,
                actorSelection: '',
                currentRound: gameRound,
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


    //TODO MODULATE , errror handeling
    const handleNewActorGuess = async (userActorInput, movie) => {

        try {

            // TODO use movieID instead of title to make this more reliable
            let localMovieObj = movieList.find((movieObj) => movieObj.movieTitle == movie);

            // remove the movie from movieList and then setMovieList to that new list SO THAT we can replace it at the end of this function
            setMovieList(movieList.filter((movieObj) => movieObj.movieTitle !== movie));

            let gameRound = await localMovieObj.currentRound.setActorFromSelection(userActorInput);
            console.log('gameRound', gameRound);

            // so next we can run complete() bc we have the last piece
            // TODO Add more conditionals here
            let nextRound = await gameRound.complete(); // this should return a new gameRound object
            console.log('nextRound', nextRound);
            localMovieObj.actorGuessed = true;
            localMovieObj.actorSelection = userActorInput;
            localMovieObj.currentRound = gameRound;
            localMovieObj.nextRound = nextRound;

            setMovieList((prev) => {
                return [...prev, localMovieObj];
            });
        } catch (error) {
            console.error(error)
        }

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