/**
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
    useEffect
} from 'react';
import { useActorContext } from './ActorContext.jsx';
// import GameRound from '../models/GameRound';
import uuid from 'react-uuid';

    // TODO remove from options, the currentActorBridge


// TODO eventually merge in ActorContext and just hold actorA and B in here, all in one context
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
    const { actorA, actorB } = useActorContext();
    const [readyToInputFirst, setReadyToInputFirst] = useState(false);
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    const [currentMovieTitle, setCurrentMovieTitle] = useState(''); // this is the movie title of current movie
    // the movieList to hold the whole tree
    const [movieList, setMovieList] = useState([]); // cant we just use this to keep track of the game
    const [readyToBridge, setReadyToBridge] = useState(false);

    const [currentActorOptions, setCurrentActorOptions] = useState([]);


    // TODO: will use setReadyToBridge to enable the actorB btn once the button is triggered by user
    const handleGameStateChange = () => {
        // use this to change the game on and off
        // dont use this for when a game wins
        setGameStarted((prev) => !prev);
        setMovieList([]);
    };
    function handleFirstClick(actor) {
        setCurrentActorBridge(actor);
        setReadyToInputFirst(true);
        return;
    }

    useEffect(() => {
        console.table(movieList);
        console.log('currentMovieTitle', currentMovieTitle);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovieTitle, currentActorBridge]);

    useEffect(() => {
        if (!gameStarted) {
            setReadyToInputFirst(false);
            setCurrentMovieTitle('');
            setCurrentActorBridge(actorA);
        }
    }, [gameStarted]);

    // TODO: MODULARIZE THIS FUNCTION ,,,
    async function handleNewMovieGuess(userMovieInput) {
        try {
            //TODO if movieList is === 0, then we are on the first round else then use the last element in movieList to create the new gameRound \
            let localMovieList = movieList || [];
            // add the movie guess to the end of array 
            localMovieList.push({
                // TODO previousActor: userActor, this to hold the actor that was used in the previous round to create the userMovieInput
                movieTitle: userMovieInput,
                id: uuid(),
                actorGuessed: false,
                actorSelection: {
                    name: '',
                    id: '',
                },
            });
            setMovieList(localMovieList);
            return;
        } catch (error) {
            console.error(error);
        }
    }


    async function handleValidMovieGuess(userMovieGuess, movieEvaluationObject) {
        try {
            // submitRef.current.style.display = 'none';
            // console.log('submitRef.current: ', submitRef.current)
            // inputRef.current.disabled = true;
            setCurrentMovieTitle(userMovieGuess);
            let actorList = movieEvaluationObject.data.validateMovieInput?.cast || [];
            console.log('actorList: ', actorList);
            setCurrentActorOptions(actorList);
            return;
        } catch (error) {
            console.error(error);
        }
    }



    //TODO MODULATE , errror handeling
    const handleNewActorGuess = async (userActorInput, movie) => {
        try {
            // TODO use movieID instead of title to make this more reliable.. or just use the last element of the array since that will be the current round
            // let localMovieObj = movieList.find((movieObj) => movieObj.movieTitle == movie);
            let localMovieObj = movieList[movieList.length - 1];
            // remove the movie from movieList and then setMovieList to that new list SO THAT we can replace it at the end of this function
            setMovieList(movieList.filter((movieObj) => movieObj.movieTitle !== movie));
            localMovieObj.actorGuessed = true;
            localMovieObj.actorSelection.name = userActorInput;
            localMovieObj.actorSelection.id = uuid();

            setMovieList((prev) => {
                return [...prev, localMovieObj];
            });
        } catch (error) {
            console.error(error)
        }
    }

    async function handleActorSelection(userSelection) {
        try {
            setCurrentActorBridge(userSelection);
            await handleNewActorGuess(userSelection, currentMovieTitle);
            return;
        } catch (error) {
            console.error(error);
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
            currentActorBridge,
            setCurrentActorBridge,
            currentMovieTitle,
            setCurrentMovieTitle,
            readyToInputFirst,
            setReadyToInputFirst,
            handleFirstClick,
            currentActorOptions,
            setCurrentActorOptions,
            handleActorSelection,
            handleValidMovieGuess,
        }}>
            {children}
        </GameContext.Provider>
    );
}