/**
 * in here we keep track of the current game
 * TODO: eventually use redux for this once it gets bigger?
 * TODO: use MEMO to prevent re-rendering of components -- do more research on this
 * ? Optimizing with memo is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, memo is unnecessary. Keep in mind that memo is completely useless if the props passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often need useMemo and useCallback together with memo.
 */


import {
    useState,
    useContext,
    createContext,
    useEffect,
    // ? memo
} from 'react';
import { useActorContext } from './ActorContext.jsx';
import uuid from 'react-uuid';


//? TODO eventually merge in ActorContext and just hold actorA and B in here, all in one context
//... still figuring this out...

// TODO: not allow the user to select the same actor twice
// TODO: not allow the user to select the same movie twice


const GameContext = createContext();


export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const [gameStarted, setGameStarted] = useState(false);
    const { actorA, actorB } = useActorContext();
    // this is the movie title of current movie
    const [currentMovieTitle, setCurrentMovieTitle] = useState('');
    // the movieList to hold the whole tree
    const [movieList, setMovieList] = useState([]);
    const [readyToBridge, setReadyToBridge] = useState(false);
    const [currentActorOptions, setCurrentActorOptions] = useState([]);
    // only ready if there are movies in the list
    const [readyToBuild, setReadyToBuild] = useState(movieList.length > 0);
    // if false, then enable the actor form, if true, then enable the movie form
    const [formTypeMovie, setFormTypeMovie] = useState(true);
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);

    const [previousActorBridge, setPreviousActorBridge] = useState('');
    const [previousMovieTitle, setPreviousMovieTitle] = useState('');

    // useEffect(() => {
    //     console.log('readyToBuild effect', readyToBuild);
    // }, [readyToBuild]);

    useEffect(() => {
        if (actorA) {
            setCurrentActorBridge(actorA);
        }
    }, [actorA]);

    useEffect(() => {
        console.table(movieList);
        console.log('currentMovieTitle', currentMovieTitle);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovieTitle, currentActorBridge]);

    useEffect(() => {
        console.log('previousMovieTitle in effect', previousMovieTitle);
    }, [previousMovieTitle]);

    useEffect(() => {
        console.log('previousActorBridge in effect', previousActorBridge);
    }, [previousActorBridge]); // this is not getting called bc the previous actor bridge is not changing  0000 yea its like being set with the same thing currentActorBridge is set to... okauy


    const handleGameStateChange = () => {
        // use this to change the game on and off, dont use this for when a game wins (only when looses)
        setGameStarted(false);
        setReadyToBuild(false);
        // setGameStarted((prev) => !prev);
        setMovieList([]);
        // all the resets to happen when the game is over or starts over
        setCurrentMovieTitle('');
        setCurrentActorBridge(actorA);
        setFormTypeMovie(true);

        setPreviousActorBridge('');
        setPreviousMovieTitle('');
    };

    async function addMovieToGlobal(userMovieInput, previousActorCharacterName) {
        try {
            // if movieList has anything in it, first grab the last movie title and set it as the previous movie title
            if (currentMovieTitle !== '') {
                setPreviousMovieTitle(currentMovieTitle);
                // setPreviousActorBridge(movieList[movieList.length - 1].actorSelection.name);
            }


            setCurrentMovieTitle(userMovieInput);
            // set readyToBuild on the first time only: 
            if (!readyToBuild) setReadyToBuild(true);
            let localMovieList = movieList || [];
            // add the movie guess to the end of array 
            localMovieList.push({
                id: uuid(),
                movieTitle: userMovieInput,
                previousActor: {
                    name: currentActorBridge,
                    characterName: previousActorCharacterName
                },
                actorGuessed: false,
                actorSelection: {
                    id: '',
                    name: '',
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

    async function removeMovieFromGlobal() {
        try {
            let localMovieList = movieList; // no way it will be empty bc the removal option wouldnt be there

            // set currentMovie Title to the title from the last movie (2nd to last in list)
            setCurrentMovieTitle(localMovieList[localMovieList.length - 2].movieTitle);
            // * hold up this wont work when the list is smaller than 2... maybe instead the index before it...

            // remove that movie from the list and setMovieList to it
            setMovieList(localMovieList.pop()); // this is no good either bc it makes a new card appear..

            setFormTypeMovie(true);
            return true; // return true if the movie was removed
        } catch (error) {
            console.error(error);
            return false; // return false if the movie couldnt be removed
        }
    }

    async function buildCastOptions(movieEvaluationObject) {
        try {
            // setCurrentMovieTitle(userMovieGuess); //! moved this into above function
            let actorList = movieEvaluationObject.data.validateMovieInput?.cast || [];
            // console.log('actorList: ', actorList); // debug

            //* Filter out the actors that are already in the game
            let currentActorsInGame = [actorA.toLowerCase(), ...movieList.map((movie) => movie.actorSelection.name.toLowerCase())];
            console.log('currentActorsInGame: ', currentActorsInGame); // debug                        
            let actorOptions = actorList.filter((actor) => !currentActorsInGame.includes(actor.name.toLowerCase()));
            // console.log('actorOptions: ', actorOptions); // debug

            setCurrentActorOptions(actorOptions);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const handleNewActorGuess = async (userActorInput, movie, characterName) => {
        try {
            console.log('userActorInput', userActorInput);
            // TODO use movieID instead of title to make this more reliable
            // if movieList has anything in it, first grab the last actorName and set it as the previous actorBridge
            if (currentActorBridge !== '') {
                setPreviousActorBridge(currentActorBridge);
            }



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

            // if movieList has anything in it, first grab the last actorName and set it as the previous actorBridge
            // if (movieList.length > 0) {
            //     console.log('we in hur?')
            //     setPreviousActorBridge(movieList[movieList.length - 1].actorSelection.name);
            // } 

            setCurrentActorBridge(userSelection);
            await handleNewActorGuess(userSelection, currentMovieTitle, characterName);
            setFormTypeMovie(true);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function handleFinalBridge(characterName) {
        try {
            let finalTreeArray = [];
            let res = await handleActorSelection(actorB, characterName);
            if (res) {
                finalTreeArray = movieList;
            }
            // unshift the actorA to beginning of the array
            // finalTreeArray.unshift({
            //     startingActor: actorA,
            //     id: uuid(),
            // }); //! may end up not needing either of these
            // // push the actorB to the end of the array
            // finalTreeArray.push({
            //     endingActor: actorB,
            //     id: uuid(),
            // });
            console.log('finalTreeArray', finalTreeArray)
            return finalTreeArray;
        } catch (error) {
            console.error(error);
        }
    }

    function handleUniqueCheck(movieInput) {
        // check if the movie is already in the list
        // let currentMoviesInGame = movieList.map((movie) => movie.movieTitle);
        if (movieList.length === 0) {
            return true;
        }
        let unique = movieList.every((movie) => movie.movieTitle.toLowerCase() !== movieInput.toLowerCase());
        return unique;
    }


    return (
        <GameContext.Provider value={{
            gameStarted,
            setGameStarted,
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
            currentActorOptions,
            setCurrentActorOptions,
            handleActorSelection,
            handleUniqueCheck,
            buildCastOptions,
            readyToBuild,
            setReadyToBuild,
            formTypeMovie,
            setFormTypeMovie,
            actorA,
            actorB,
            handleFinalBridge,
            removeMovieFromGlobal,
        }}>
            {children}
        </GameContext.Provider>
    );
}