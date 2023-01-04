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

// TODO remove from options, the last currentActorBridge, SO THAT is doesnt show as an option to the user. bc that would mess things up

// TODO eventually merge in ActorContext and just hold actorA and B in here, all in one context
// import { useActorContext } from './ActorContext.jsx';
//! not until readyToBridge is true is the actorB btn enabled and any "checking" is done
// TODO eventually we send the final movieList array to the createTree backend route

// TODO include the characterName in the actorSelection in the movie object in the movieList array SO THAT it can be displayed in the end and/or throughout the game



const GameContext = createContext();


export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const [gameStarted, setGameStarted] = useState(false);
    const { actorA, actorB } = useActorContext();

    const [currentMovieTitle, setCurrentMovieTitle] = useState(''); // this is the movie title of current movie
    // the movieList to hold the whole tree
    const [movieList, setMovieList] = useState([]); // cant we just use this to keep track of the game
    const [readyToBridge, setReadyToBridge] = useState(false);

    const [currentActorOptions, setCurrentActorOptions] = useState([]);


    // ------------------
    const [readyToBuild, setReadyToBuild] = useState(movieList.length > 0); // only ready if there are movies in the list

    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    useEffect(() => {
        if (movieList.length > 0) {
            setReadyToBuild(true);
            return;
        }
    }, [movieList]); // only ready if there are movies in the list
    // ---------------------



    // set state of which form is being used
    const [formTypeMovie, setFormTypeMovie] = useState(true); // if false, then enable the actor form, if true, then enable the movie form


    // TODO: will use setReadyToBridge to enable the actorB btn once the button is triggered by user
    const handleGameStateChange = () => {
        // use this to change the game on and off
        // dont use this for when a game wins
        setGameStarted((prev) => !prev);
        setMovieList([]);
    };
    // function handleFirstClick(actor) {
    //     setCurrentActorBridge(actor);
    //     setReadyToInputFirst(true);
    //     return;
    // }

    useEffect(() => {
        console.table(movieList);
        console.log('currentMovieTitle', currentMovieTitle);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovieTitle, currentActorBridge]);

    useEffect(() => {
        // all the resets to happen when the game is over or starts over
        if (!gameStarted) {
            setCurrentMovieTitle('');
            setCurrentActorBridge(actorA);
            setReadyToBuild(false);
            setFormTypeMovie(true);
        }
    }, [gameStarted]);


    async function addMovieToGlobal(userMovieInput) {
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
                    characterName: '',
                },
            });
            setMovieList(localMovieList);
            setFormTypeMovie(false);
            return true; // return true if the movie was added
        } catch (error) {
            console.error(error);
            return false; // return false if the movie couldnt be added
        }
    }

    // TODO change the name of this function to like buildCastOptions or something
    async function buildCastOptions(userMovieGuess, movieEvaluationObject) {
        try {
            setCurrentMovieTitle(userMovieGuess);
            let actorList = movieEvaluationObject.data.validateMovieInput?.cast || [];
            console.log('actorList: ', actorList);
            setCurrentActorOptions(actorList);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    //TODO MODULATE , errror handeling
    const handleNewActorGuess = async (userActorInput, movie, characterName) => {
        try {
            console.log('userActorInput', userActorInput);
            // TODO use movieID instead of title to make this more reliable.. or just use the last element of the array since that will be the current round
            // let localMovieObj = movieList.find((movieObj) => movieObj.movieTitle == movie);
            let localMovieObj = movieList[movieList.length - 1];
            // remove the movie from movieList and then setMovieList to that new list SO THAT we can replace it at the end of this function
            setMovieList(movieList.filter((movieObj) => movieObj.movieTitle !== movie));

            localMovieObj.actorGuessed = true;
            localMovieObj.actorSelection.name = userActorInput;
            localMovieObj.actorSelection.id = uuid(); // TODO use the id of the actor from the api? or remove this bc we may not need it
            localMovieObj.actorSelection.characterName = characterName;

            setMovieList((prev) => {
                return [...prev, localMovieObj];
            });
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * @function handleActorSelection  - sets currentActorBridge to the userSelection and then calls handleNewActorGuess which update the global movie list based on the userSelection/actor/options
     */
    async function handleActorSelection(userSelection, characterName) {
        try {
            setCurrentActorBridge(userSelection);
            await handleNewActorGuess(userSelection, currentMovieTitle, characterName);
            setFormTypeMovie(true);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function handleFinalBridge() {
        try {
            // setCurrentActorBridge(actorB);
            // add movie to global list and actorB as its actor, add actorA to the front of the array.
            // then return the tree
            let finalTreeArray = [];


            return finalTreeArray;
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <GameContext.Provider value={{
            gameStarted,
            movieList,
            handleGameStateChange,
            addMovieToGlobal,
            handleNewActorGuess,
            readyToBridge,
            setReadyToBridge,
            currentActorBridge,
            setCurrentActorBridge,
            currentMovieTitle,
            setCurrentMovieTitle,
            // readyToInputFirst,
            // setReadyToInputFirst,
            // handleFirstClick,
            currentActorOptions,
            setCurrentActorOptions,
            handleActorSelection,
            buildCastOptions,
            readyToBuild,
            setReadyToBuild,
            formTypeMovie,
            setFormTypeMovie,
            actorA,
            actorB,
            handleFinalBridge
        }}>
            {children}
        </GameContext.Provider>
    );
}